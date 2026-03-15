import fastify from "fastify";
import { fastifyCors } from "@fastify/cors";
import { env } from "@/env";
import { hasZodFastifySchemaValidationErrors, jsonSchemaTransform, serializerCompiler, validatorCompiler } from "fastify-type-provider-zod";
import fastifySwagger from "@fastify/swagger";
import { fastifySwaggerUi } from "@fastify/swagger-ui";
import { createLinkRoute } from "./routes/create-link";
import { fetchLinksRoute } from "./routes/fetch-links";
import { deleteLinkRoute } from "./routes/delete-link";
import { getLinkRoute } from "./routes/get-link";
import { increaseHitRoute } from "./routes/increase-hit";

const server = fastify();

server.setValidatorCompiler(validatorCompiler);
server.setSerializerCompiler(serializerCompiler);

server.setErrorHandler((error, request, reply) => {
    if (hasZodFastifySchemaValidationErrors(error)) {
        return reply.status(400).send({
            message: "Validation Error",
            issues: error.validation,
        });
    }

    console.error(error);

    return reply.status(500).send({
        message: "Internal Server Error",
    });
});

server.register(fastifyCors, {
    origin: "*",
});

server.register(fastifySwagger, {
    openapi: {
        info: {
            title: "Brev.ly Server",
            version: "1.0.0",
        },
    },
    transform: jsonSchemaTransform,
});

server.register(fastifySwaggerUi, {
    routePrefix: "/docs",
});

server.register(createLinkRoute);
server.register(fetchLinksRoute);
server.register(deleteLinkRoute);
server.register(getLinkRoute);
server.register(increaseHitRoute);

server.listen({ port: env.PORT, host: "0.0.0.0" }).then(() => {
    console.log("HTTP Server running!");
});