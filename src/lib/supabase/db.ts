import { drizzle } from "drizzle-orm/postgres-js"
import postgres from "postgres"
import * as dotenv from "dotenv"
import * as schema from "./schema"

dotenv.config({ path: ".env" })

if (!process.env.DATABASE_URL) throw new Error("Database url cannot be found")

const client = postgres(process.env.DATABASE_URL || "", { max: 1 })
const db = drizzle(client, { schema })

export default db
