import { db } from "@/infra/db";
import { schema } from "@/infra/db/schemas";
import { Either, makeRight } from "@/infra/shared/either";
import { count } from "drizzle-orm";
import { z } from "zod";

const fetchLinksSchema = z.object({
    page: z.number().optional().default(1),
    pageSize: z.number().optional().default(20),
});

type FetchLinksSchema = z.infer<typeof fetchLinksSchema>;

type FetchLinksResponse = {
    links: {
        id: string,
        originalLink: string,
        shortLink: string,
        hits: number | null,
        createdAt: Date,
    }[],
    total: number,
};

export async function fetchLinks(data: FetchLinksResponse): Promise<Either<never, FetchLinksResponse>> {
    const { page, pageSize } = fetchLinksSchema.parse(data);

    const [links, [{ total }]] = await Promise.all([
        db
            .select({
                id: schema.links.id,
                originalLink: schema.links.originalLink,
                shortLink: schema.links.shortLink,
                hits: schema.links.hits,
                createdAt: schema.links.createdAt,
            })
            .from(schema.links)
            .offset((page - 1) * pageSize)
            .limit(pageSize),
        
        db
            .select({ total: count(schema.links.id) })
            .from(schema.links),
    ]);

    return makeRight({ links, total });
}