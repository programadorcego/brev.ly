import { db } from "@/infra/db";
import { schema } from "@/infra/db/schemas";
import type { FastifyPluginAsyncZod } from "fastify-type-provider-zod";
import { z } from "zod";

export const createLinkRoute: FastifyPluginAsyncZod = async server => {
    server.post(
        "/links",
        {
            schema: {
                summary: "Create a short link",
                body: z.object({
                    originalLink: z.string().url(),
                    shortLink: z.string().regex(/^[a-zA-Z0-9_\-]+$/),
                }),
                response: {
                    201: z.object({ linkId: z.string() }),
                    409: z
                        .object({ message: z.string() })
                        .describe("Short link already exists"),
                },
            },
        },

        async (request, reply) => {
            await db.insert(schema.links).values({
                originalLink: "https://google.com",
                shortLink: "abc123",
            });
            return reply.status(201).send({ linkId: "123" })
        }
    );
}