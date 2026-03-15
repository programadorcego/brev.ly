import { makeLink } from "@/test/factories/make-link";
import { describe, expect, it } from "vitest";
import { isLeft, isRight, unwrapEither } from "@/infra/shared/either";
import { db } from "@/infra/db";
import { randomUUID } from "node:crypto";
import { ResourceNotFoundError } from "./errors/resource-not-found";
import { increaseHit } from "./increase-hit";

describe("Increase number of access", () => {
    it("should be able to increase the number of accesses to a link", async () => {
        const link = await makeLink({ originalLink: `https://google.com` });

        const sut = await increaseHit({ shortLink: link.shortLink });

        expect(isRight(sut)).toBe(true);
        expect(sut.right!.hits).toEqual(link.hits! + 1);
    });

    it("should not be able to increase the number of accesses to a non-existent shortened link", async () => {
        const shortLink = randomUUID();

        const sut = await increaseHit({ shortLink });

        expect(isLeft(sut)).toBe(true);
        expect(unwrapEither(sut)).toBeInstanceOf(ResourceNotFoundError);
    });
});