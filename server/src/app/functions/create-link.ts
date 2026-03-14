import { db } from "@/infra/db";
import { schema } from "@/infra/db/schemas";
import { z } from "zod";

const createLinkSchema = z.object({
    originalLink: z.string().url(),
    shortLink: z.string().regex(/^[a-zA-Z0-9_\-]+$/),
});

type CreateLinkSchema = z.infer<typeof createLinkSchema>;

export async function createLink(data: CreateLinkSchema) {
    const { originalLink, shortLink } = createLinkSchema.parse(data);

    await db.insert(schema.links).values({
        originalLink,
        shortLink
    });
}