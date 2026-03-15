import { z } from "zod/mini";
import { ResourceNotFoundError } from "./errors/resource-not-found";
import { db } from "@/infra/db";
import { schema } from "@/infra/db/schemas";
import { eq, sql } from "drizzle-orm";
import { Either, makeLeft, makeRight } from "@/infra/shared/either";

const increaseHitSchema = z.object({
    shortLink: z.string(),
});

type IncreaseHitSchema = z.input<typeof increaseHitSchema>;

type IncreaseHitResponse = {
    id: string,
    originalLink: string,
    shortLink: string,
    hits: number | null,
    createdAt: Date,
};

export async function increaseHit(data: IncreaseHitSchema): Promise<Either<ResourceNotFoundError, IncreaseHitResponse>> {
    const { shortLink } = data;

    const link = (await db
        .select({
            id: schema.links.id,
            originalLink: schema.links.originalLink,
            shortLink: schema.links.shortLink,
            hits: schema.links.hits,
            createdAt: schema.links.createdAt,
        })
        .from(schema.links)
        .where(eq(schema.links.shortLink, shortLink))
        .limit(1))[0];

    if (!link) {
        return makeLeft(new ResourceNotFoundError());
    }

    await db
        .update(schema.links)
        .set({
            hits: sql`${link.hits} + 1`,
        });

    return makeRight({
        ...link,
        hits: link.hits! + 1,
    });
}