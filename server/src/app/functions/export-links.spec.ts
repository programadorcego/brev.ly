import { describe, expect, it, vi } from "vitest";
import * as upload from "@/infra/storage/upload-file-to-storage";
import { randomUUID } from "node:crypto";
import { makeLink } from "@/test/factories/make-link";
import { exportLinks } from "./export-links";
import { isRight, unwrapEither } from "@/infra/shared/either";

describe("Export links", () => {
    it("should be able to export links", async () => {
        const uploadStub = vi
            .spyOn(upload, "uploadFileToStorage")
            .mockImplementationOnce(async () => {
                return {
                    key: `${randomUUID()}.csv`,
                    url: "http://example.com/file.csv",
                };
            });

        const linkPattern = randomUUID();

        const link1 = await makeLink({ originalLink: `https://google.com/${linkPattern}` });
        const link2 = await makeLink({ originalLink: `https://facebook.com/${linkPattern}` });
        const link3 = await makeLink({ originalLink: `https://youtube.com/${linkPattern}` });
        const link4 = await makeLink({ originalLink: `https://instagram.com/${linkPattern}` });
        const link5 = await makeLink({ originalLink: `https://rocketseat.com.br/${linkPattern}` });

        const sut = await exportLinks({
            searchQuery: linkPattern,
        });

        const generatedCSVStream = uploadStub.mock.calls[0][0].contentStream;
        const csvAsString = await new Promise<string>((resolve, reject) => {
            const chunks: Buffer[] = [];

            generatedCSVStream.on("data", (chunk: Buffer) => {
                chunks.push(chunk);
            });

            generatedCSVStream.on("end", () => {
                resolve(Buffer.concat(chunks).toString("utf-8"));
            });

            generatedCSVStream.on("error", err => {
                reject(err);
            });
        });

        const csvAsArray = csvAsString
            .trim()
            .split("\n")
            .map(row => row.split(","));

        expect(isRight(sut)).toBe(true);
        expect(unwrapEither(sut).reportUrl).toBe("http://example.com/file.csv");
        expect(csvAsArray).toEqual([
            ['ID', 'Original Link', 'Short Link', 'Access Count', 'Created at'],
            [link1.id, link1.originalLink, link1.shortLink, String(link1.hits), expect.any(String)],
            [link2.id, link2.originalLink, link2.shortLink, String(link2.hits), expect.any(String)],
            [link3.id, link3.originalLink, link3.shortLink, String(link3.hits), expect.any(String)],
            [link4.id, link4.originalLink, link4.shortLink, String(link4.hits), expect.any(String)],
            [link5.id, link5.originalLink, link5.shortLink, String(link5.hits), expect.any(String)],
        ]);
    });
});