import { makeLink } from "@/test/factories/make-link";
import { describe, expect, it } from "vitest";
import { isLeft, isRight, unwrapEither } from "@/infra/shared/either";
import { db } from "@/infra/db";
import { randomUUID } from "node:crypto";
import { ResourceNotFoundError } from "./errors/resource-not-found";
import { getLink } from "./get-link";

describe("Get Link", () => {
    it("should be able to get original link", async () => {
        const link = await makeLink({ originalLink: `https://google.com` });

        const sut = await getLink({ shortLink: link.shortLink });

        expect(isRight(sut)).toBe(true);
        expect(sut.right!.originalLink).toEqual(link.originalLink);
    });

    it("should not be able to get a non-existent shortened link", async () => {
        const shortLink = randomUUID();

        const sut = await getLink({ shortLink });

        expect(isLeft(sut)).toBe(true);
        expect(unwrapEither(sut)).toBeInstanceOf(ResourceNotFoundError);
    });
});