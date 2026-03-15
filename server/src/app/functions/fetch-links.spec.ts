import { makeLink } from "@/test/factories/make-link";
import { describe, expect, it } from "vitest";
import { fetchLinks } from "./fetch-links";
import { isRight, unwrapEither } from "@/infra/shared/either";
import { db } from "@/infra/db";
import { sql } from "drizzle-orm";
import { randomUUID } from "node:crypto";
import dayjs from "dayjs";

describe("Fetch links", () => {
    it("should be able to list all the URLs", async () => {
        const linkPattern = randomUUID();

        const link1 = await makeLink({ originalLink: `https://google.com/${linkPattern}` });
        const link2 = await makeLink({ originalLink: `https://facebook.com/${linkPattern}` });
        const link3 = await makeLink({ originalLink: `https://youtube.com/${linkPattern}` });
        const link4 = await makeLink({ originalLink: `https://instagram.com/${linkPattern}` });
        const link5 = await makeLink({ originalLink: `https://rocketseat.com.br/${linkPattern}` });

        const sut = await fetchLinks({ searchQuery: linkPattern });

        expect(isRight(sut)).toBe(true);
        expect(unwrapEither(sut).total).toEqual(5);
        expect(unwrapEither(sut).links).toEqual([
            expect.objectContaining({ id: link5.id }),
            expect.objectContaining({ id: link4.id }),
            expect.objectContaining({ id: link3.id }),
            expect.objectContaining({ id: link2.id }),
            expect.objectContaining({ id: link1.id }),
        ]);
    });

    it("should be able to get paginated links", async () => {
        const linkPattern = randomUUID();

        const link1 = await makeLink({ originalLink: `https://google.com/${linkPattern}` });
        const link2 = await makeLink({ originalLink: `https://facebook.com/${linkPattern}` });
        const link3 = await makeLink({ originalLink: `https://youtube.com/${linkPattern}` });
        const link4 = await makeLink({ originalLink: `https://instagram.com/${linkPattern}` });
        const link5 = await makeLink({ originalLink: `https://rocketseat.com.br/${linkPattern}` });

        let sut = await fetchLinks({
            searchQuery: linkPattern,
            page: 1,
            pageSize: 3,
        });

        expect(isRight(sut)).toBe(true);
        expect(unwrapEither(sut).total).toEqual(5);
        expect(unwrapEither(sut).links).toEqual([
            expect.objectContaining({ id: link5.id }),
            expect.objectContaining({ id: link4.id }),
            expect.objectContaining({ id: link3.id }),
        ]);

        sut = await fetchLinks({
            searchQuery: linkPattern,
            page: 2,
            pageSize: 3,
        });

        expect(isRight(sut)).toBe(true);
        expect(unwrapEither(sut).total).toEqual(5);
        expect(unwrapEither(sut).links).toEqual([
            expect.objectContaining({ id: link2.id }),
            expect.objectContaining({ id: link1.id }),
        ]);
    });

    it("should be able to get sorted links", async () => {
const linkPattern = randomUUID();

        const link1 = await makeLink({
            originalLink: `https://google.com/${linkPattern}`,
            createdAt: new Date(),
        });

        const link2 = await makeLink({
            originalLink: `https://facebook.com/${linkPattern}`,
            createdAt: dayjs().subtract(1, "day").toDate(),
        });

        const link3 = await makeLink({
            originalLink: `https://youtube.com/${linkPattern}`,
            createdAt: dayjs().subtract(2, "day").toDate(),
        });

        const link4 = await makeLink({
            originalLink: `https://instagram.com/${linkPattern}`,
            createdAt: dayjs().subtract(3, "day").toDate(),
        });

        const link5 = await makeLink({
            originalLink: `https://rocketseat.com.br/${linkPattern}`,
            createdAt: dayjs().subtract(4, "day").toDate(),
        });

        let sut = await fetchLinks({
            searchQuery: linkPattern,
            sortBy: "createdAt",
            sortDirection: "desc"
        });

        expect(isRight(sut)).toBe(true);
        expect(unwrapEither(sut).total).toEqual(5);
        expect(unwrapEither(sut).links).toEqual([
            expect.objectContaining({ id: link1.id }),
            expect.objectContaining({ id: link2.id }),
            expect.objectContaining({ id: link3.id }),
            expect.objectContaining({ id: link4.id }),
            expect.objectContaining({ id: link5.id }),
        ]);

        sut = await fetchLinks({
            searchQuery: linkPattern,
            sortBy: "createdAt",
            sortDirection: "asc",
        });

        expect(isRight(sut)).toBe(true);
        expect(unwrapEither(sut).total).toEqual(5);
        expect(unwrapEither(sut).links).toEqual([
            expect.objectContaining({ id: link5.id }),
            expect.objectContaining({ id: link4.id }),
            expect.objectContaining({ id: link3.id }),
            expect.objectContaining({ id: link2.id }),
            expect.objectContaining({ id: link1.id }),
        ]);
    });
});