import { bigint, pgTable, text, timestamp } from "drizzle-orm/pg-core";
import { randomUUID } from "node:crypto";

export const links = pgTable("links", {
    id: text("id")
        .primaryKey()
        .$defaultFn(() => randomUUID()),
    originalLink: text("original_link").notNull(),
    shortLink: text("short_link").notNull().unique(),
    hits: bigint("hits", { mode: "number" }).default(0),
    createdAt: timestamp("created_at").defaultNow().notNull(),
});