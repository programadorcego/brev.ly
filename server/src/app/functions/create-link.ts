import { db } from "@/infra/db";
import { schema } from "@/infra/db/schemas";
import { Either, makeLeft, makeRight } from "@/infra/shared/either";
import { z } from "zod";
import { ShortLinkAlreadyExistsError } from "./errors/short-link-already-exists";
import { eq } from "drizzle-orm";

const createLinkSchema = z.object({
    originalLink: z.string().url(),
    shortLink: z.string().regex(/^[a-zA-Z0-9_\-]+$/),
});

type CreateLinkSchema = z.infer<typeof createLinkSchema>;

export async function createLink(data: CreateLinkSchema): Promise<Either<ShortLinkAlreadyExistsError, {
    id: string,
    originalLink: string,
    hits: number | null,
    createdAt: Date,
}>> {
    const { originalLink, shortLink } = createLinkSchema.parse(data);

    const existingLink = (await db
        .select({ id: schema.links.id })
        .from(schema.links)
        .where(eq(schema.links.shortLink, shortLink))
        .limit(1)).length > 0;

    if (existingLink) {
        return makeLeft(new ShortLinkAlreadyExistsError());
    }

    const [link] = await db
        .insert(schema.links)
        .values({
            originalLink,
            shortLink
        })
        .returning();

    return makeRight(link);
}