import { z } from "zod/mini";
import { ResourceNotFoundError } from "./errors/resource-not-found";
import { db } from "@/infra/db";
import { schema } from "@/infra/db/schemas";
import { eq } from "drizzle-orm";
import { Either, makeLeft, makeRight } from "@/infra/shared/either";

const deleteLinkSchema = z.object({
    shortLink: z.string(),
});

type DeleteLinkSchema = z.input<typeof deleteLinkSchema>;

export async function deleteLink(data: DeleteLinkSchema): Promise<Either<ResourceNotFoundError, { id: string }>> {
    const { shortLink } = data;

    const link = (await db
        .select({ id: schema.links.id })
        .from(schema.links)
        .where(eq(schema.links.shortLink, shortLink))
        .limit(1))[0];
        
        if (!link) {
            return makeLeft(new ResourceNotFoundError());
        }

        await db
            .delete(schema.links)
            .where(eq(schema.links.shortLink, shortLink));
        

            return makeRight({ id: link.id });
}