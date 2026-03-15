import { db } from "@/infra/db"
import { schema } from "@/infra/db/schemas"
import { InferInsertModel } from "drizzle-orm"
import { uuidv4 } from "uuidv7";

export async function makeLink(
    overrides?: Partial<InferInsertModel<typeof schema.links>>
) {
    const result = await db
        .insert(schema.links)
        .values({
            originalLink: "https://meusite.com.br",
            shortLink: uuidv4(),
            ...overrides,
        })
        .returning();
    
    return result[0];
}