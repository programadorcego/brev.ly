import { increaseHit } from "@/app/functions/increase-hit";
import { db } from "@/infra/db";
import { schema } from "@/infra/db/schemas";
import { isRight } from "@/infra/shared/either";
import type { FastifyPluginAsyncZod } from "fastify-type-provider-zod";
import { z } from "zod";

export const increaseHitRoute: FastifyPluginAsyncZod = async server => {
    server.patch(
        "/links/:shortLink",
        {
            schema: {
                summary: "Get original link",
                params: z.object({
                    shortLink: z.string(),
                }),
                response: {
                    200: z.object({
                        id: z.string(),
                        originalLink: z.string().url(),
                        shortLink: z.string(),
                        hits: z.number().nullable(),
                        createdAt: z.date(),
                    }),
                    404: z.object({ message: z.string() }),
                },
            },
        },

        async (request, reply) => {
            const { shortLink } = request.params;

            const result = await increaseHit({
                shortLink
            });

            if (isRight(result)) {
                return reply.status(200).send(result.right);
            }

            const error = result.left;

            switch (error.constructor.name) {
                case "ResourceNotFoundError":
                    return reply.status(404).send({ message: error.message });
                    break;
            }
        }
    );
}