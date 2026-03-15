import { makeLink } from "@/test/factories/make-link";
import { describe, expect, it } from "vitest";
import { isLeft, isRight, unwrapEither } from "@/infra/shared/either";
import { db } from "@/infra/db";
import { deleteLink } from "./delete-link";
import { randomUUID } from "node:crypto";
import { ResourceNotFoundError } from "./errors/resource-not-found";

describe("Delete Link", () => {
    it("should be able to delete link", async () => {
        const link = await makeLink({ originalLink: `https://google.com` });

        const sut = await deleteLink({ shortLink: link.shortLink });

        expect(isRight(sut)).toBe(true);
        expect(sut.right!.id).toEqual(link.id);
    });

    it("should not be able to delete a non-existent shortened link", async () => {
        const shortLink = randomUUID();

        const sut = await deleteLink({ shortLink });

        expect(isLeft(sut)).toBe(true);
        expect(unwrapEither(sut)).toBeInstanceOf(ResourceNotFoundError);
    });
});