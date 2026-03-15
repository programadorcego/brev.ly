import { fetchLinks } from "@/app/functions/fetch-links";
import { unwrapEither } from "@/infra/shared/either";
import { FastifyPluginAsyncZod } from "fastify-type-provider-zod";
import { z } from "zod";

export const fetchLinksRoute: FastifyPluginAsyncZod = async server => {
    server.get(
        "/links",
        {
            schema: {
                summary: "Fetch Links",
                tags: ["links"],
                querystring: z.object({
                    searchQuery: z.string().optional(),
                    sortBy: z.enum(["createdAt"]).optional(),
                    sortDirection: z.enum(["asc", "desc"]).optional(),
                    page: z.coerce.number().optional().default(1),
                    pageSize: z.coerce.number().optional().default(20),
                }),
                response: {
                    200: z.object({
                        links: z.array(
                            z.object({
                                id: z.string(),
                                originalLink: z.string().url(),
                                shortLink: z.string(),
                                hits: z.number().nullable(),
                                createdAt: z.date(),
                            }),
                        ),
                        total: z.number(),
                    }),
                },
            },
        },
        async (request, reply) => {
            const { page, pageSize, searchQuery, sortBy, sortDirection } = request.query;

            const results = await fetchLinks({
                searchQuery,
                sortBy,
                sortDirection,
                page,
                pageSize
            });

            const { links, total } = unwrapEither(results);

            return reply.status(200).send({ total, links });
        }
    );
};