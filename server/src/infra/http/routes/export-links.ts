import { exportLinks } from "@/app/functions/export-links";
import { unwrapEither } from "@/infra/shared/either";
import { FastifyPluginAsyncZod } from "fastify-type-provider-zod";
import { z } from "zod";

export const exportLinksRoute: FastifyPluginAsyncZod = async server => {
    server.post(
        "/links/export",
        {
            schema: {
                summary: "Export links",
                tags: ["links"],
                querystring: z.object({
                    searchQuery: z.string().optional(),
                }),
            },
        },

        async (request, replay) => {
            const { searchQuery } = request.query;

            const result = await exportLinks({ searchQuery });

            const { reportUrl } = unwrapEither(result);

            return replay.status(200).send({ reportUrl });
        }
    );
};