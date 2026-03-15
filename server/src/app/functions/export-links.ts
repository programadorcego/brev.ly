import { db, pg } from "@/infra/db";
import { schema } from "@/infra/db/schemas";
import { Either, makeRight } from "@/infra/shared/either";
import { uploadFileToStorage } from "@/infra/storage/upload-file-to-storage";
import { stringify } from "csv-stringify";
import { ilike } from "drizzle-orm";
import { PassThrough, Transform } from "node:stream";
import { pipeline } from "node:stream/promises";
import { z } from "zod";

const exportLinksSchema = z.object({
    searchQuery: z.string().optional(),
});

type ExportLinksSchema = z.input<typeof exportLinksSchema>;

type ExportLinksResponse = {
    reportUrl: string
};

export async function exportLinks(data: ExportLinksSchema): Promise<Either<never, ExportLinksResponse>> {
    const { searchQuery } = exportLinksSchema.parse(data);

    const { sql, params } = db
        .select({
            id: schema.links.id,
            originalLink: schema.links.originalLink,
            shortLink: schema.links.shortLink,
            hits: schema.links.hits,
            createdAt: schema.links.createdAt,
        })
        .from(schema.links)
        .where(searchQuery ? ilike(schema.links.originalLink, `%${searchQuery}%`) : undefined).toSQL();

    const cursor = pg.unsafe(sql, params as string[]).cursor(2);

    const csv = stringify({
        delimiter: ",",
        header: true,
        columns: [
            { key: "id", header: "ID" },
            { key: "original_link", header: "Original Link" },
            { key: "short_link", header: "Short Link" },
            { key: "hits", header: "Access Count" },
            { key: "created_at", header: "Created at" },
        ],
    });

    const uploadToStorageStream = new PassThrough();

    const convertToCSVPipeline = pipeline(
        cursor,
        new Transform({
            objectMode: true,
            transform(chunks: unknown[], encoding, callback) {
                for (const chunk of chunks) {
                    this.push(chunk);
                }

                callback();
            },
        }),
        csv,
        uploadToStorageStream
    );

    const uploadToStorage = uploadFileToStorage({
        contentType: "text/csv",
        folder: "downloads",
        fileName: `${new Date().toISOString()}-uploads.csv`,
        contentStream: uploadToStorageStream,
    });

    const [{ url }] = await Promise.all([uploadToStorage, convertToCSVPipeline]);

    return makeRight({ reportUrl: url });
}