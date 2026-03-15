import { db } from "@/infra/db";
import { schema } from "@/infra/db/schemas";
import { Either, makeRight } from "@/infra/shared/either";
import { asc, count, desc, ilike } from "drizzle-orm";
import { z } from "zod";

const fetchLinksSchema = z.object({
    searchQuery: z.string().optional(),
    sortBy: z.enum(["createdAt"]).optional(),
    sortDirection: z.enum(["asc", "desc"]).optional(),
    page: z.number().optional().default(1),
    pageSize: z.number().optional().default(20),
});

type FetchLinksSchema = z.input<typeof fetchLinksSchema>;

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

export async function fetchLinks(data: FetchLinksSchema): Promise<Either<never, FetchLinksResponse>> {
    const { page, pageSize, searchQuery, sortBy, sortDirection } = fetchLinksSchema.parse(data);

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
            .where(searchQuery ? ilike(schema.links.originalLink, `%${searchQuery}%`) : undefined)
            .orderBy(fields => {
                if (sortBy && sortDirection === "asc") {
                    return asc(fields[sortBy]);
                }

                if (sortBy && sortDirection === "desc") {
                    return desc(fields[sortBy]);
                }

                return desc(fields["id"]);
            })
            .offset((page - 1) * pageSize)
            .limit(pageSize),
        
        db
            .select({ total: count(schema.links.id) })
            .from(schema.links)
            .where(searchQuery ? ilike(schema.links.originalLink, `%${searchQuery}%`) : undefined),
    ]);

    return makeRight({ links, total });
}