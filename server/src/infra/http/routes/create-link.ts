import { createLink } from "@/app/functions/create-link";
import { db } from "@/infra/db";
import { schema } from "@/infra/db/schemas";
import { isRight } from "@/infra/shared/either";
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
                    201: z.null().describe("Short link created"),
                    409: z
                        .object({ message: z.string() })
                        .describe("Short link already exists"),
                },
            },
        },

        async (request, reply) => {
            const data = request.body;

            const result = await createLink(data);

            if (isRight(result)) {
                return reply.status(201).send(null);
            }

            const error = result.left;

            switch(error.constructor.name) {
                case "ShortLinkAlreadyExistsError" :
                    return reply.status(409).send({ message: error.message });
                break;
            }
        }
    );
}