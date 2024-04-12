import { drizzle } from "drizzle-orm/postgres-js"
import postgres from "postgres"
import { migrate } from "drizzle-orm/postgres-js/migrator"
import * as dotenv from "dotenv"
import * as schema from "../../../migrations/schema"

dotenv.config({ path: ".env" })

if (!process.env.DATABASE_URL) {
  console.log("🔴 Cannot find database url")
}

const client = postgres(process.env.DATABASE_URL as string, { max: 1 })
const db = drizzle(client, { schema })

const migrateDb = async () => {
  console.log("🟠 Migrating client")
  try {
    await migrate(db, { migrationsFolder: "migrations" })
    console.log("🟢 Successfully Migrated")
  } catch (error) {
    console.log("🔴 Error Migrating Client", error)
  }
}

migrateDb()

export default db
