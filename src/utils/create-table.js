import { sql } from '../db.js'

async function bootstrap() {
  await sql`
    DROP TABLE IF EXISTS books
  `

  await sql`
    CREATE TABLE books (
      id TEXT PRIMARY KEY,
      title VARCHAR(255) NOT NULL,
      description TEXT,
      page_amount INTEGER
    )
  `
}

bootstrap().then(() => process.exit(1))