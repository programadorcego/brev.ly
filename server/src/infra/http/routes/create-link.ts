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
                    shortLink: z.string(),
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
            return reply.status(201).send({ linkId: "123" })
        }
    );
}