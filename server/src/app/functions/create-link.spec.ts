import { describe, expect, it } from "vitest";
import { createLink } from "./create-link";
import { isLeft, isRight } from "@/infra/shared/either";
import { db } from "@/infra/db";
import { schema } from "@/infra/db/schemas";
import { eq } from "drizzle-orm";
import { ShortLinkAlreadyExistsError } from "./errors/short-link-already-exists";
import { uuidv4 } from "uuidv7";
import { InvalidShortLinkFormatError } from "./errors/invalid-short-link-format";

describe("Create a short link", () => {
    it("should be able to create a link", async () => {
        const shortLink = uuidv4();
        const sut = await createLink({
            originalLink: "https://meusite.com.br",
            shortLink,
        });

        expect(isRight(sut)).toBe(true);

        const result = await db
            .select()
            .from(schema.links)
            .where(eq(schema.links.shortLink, shortLink));

        expect(result).toHaveLength(1);
    });

    it("should not be possible to create a link with an already existing shortened URL", async () => {
        const shortLink = uuidv4();
        await createLink({
            originalLink: "https://meusite.com.br",
            shortLink: shortLink,
        });

        const sut = await createLink({
            originalLink: "https://meusite.com.br",
            shortLink: shortLink,
        });

        expect(isLeft(sut)).toBe(true);
        expect(sut.left).toBeInstanceOf(ShortLinkAlreadyExistsError);
    });

    it("should not be possible to create a link with a malformed shortened URL", async () => {
        const sut = await createLink({
            originalLink: "https://meusite.com.br",
            shortLink: "link encurtado",
        });

        expect(isLeft(sut)).toBe(true);
        expect(sut.left).toBeInstanceOf(InvalidShortLinkFormatError);
    });
});