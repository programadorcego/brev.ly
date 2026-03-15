import { deleteLink } from "@/app/functions/delete-link";
import { db } from "@/infra/db";
import { schema } from "@/infra/db/schemas";
import { isRight } from "@/infra/shared/either";
import type { FastifyPluginAsyncZod } from "fastify-type-provider-zod";
import { z } from "zod";

export const deleteLinkRoute: FastifyPluginAsyncZod = async server => {
    server.delete(
        "/links/:shortLink",
        {
            schema: {
                summary: "Delete a short link",
                params: z.object({
                    shortLink: z.string(),
                }),
                response: {
                    204: z.null().describe("Short link deleted"),
                    404: z.object({ message: z.string() }),
                },
            },
        },

        async (request, reply) => {
            const { shortLink } = request.params;

            const result = await deleteLink({
                shortLink
            });

            if (isRight(result)) {
                return reply.status(204).send(null);
            }

            const error = result.left;

            switch(error.constructor.name) {
                case "ResourceNotFoundError" :
                    return reply.status(404).send({ message: error.message });
                break;
            }
        }
    );
}