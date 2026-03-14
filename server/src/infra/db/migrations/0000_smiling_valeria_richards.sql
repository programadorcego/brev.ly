CREATE TABLE "links" (
	"id" text PRIMARY KEY NOT NULL,
	"original_link" text NOT NULL,
	"short_link" text NOT NULL,
	"hits" bigint DEFAULT 0,
	"created_at" timestamp DEFAULT now() NOT NULL,
	CONSTRAINT "links_short_link_unique" UNIQUE("short_link")
);
