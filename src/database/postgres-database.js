import { randomUUID } from 'node:crypto'

import { sql } from '../db.js'

export class PostgresDatabase {
  async list() {
    const books = await sql`SELECT * FROM books`

    return books
  }

  async create({ title, description, pageAmount }) {
    const bookId = randomUUID()

    const createdBook = await sql`
      INSERT INTO books VALUES (
        ${bookId},
        ${title},
        ${description},
        ${pageAmount}
      )
    `

    return createdBook
  }

  async update(id, data) {
    const { title, description, pageAmount } = data

    await sql`
      UPDATE books SET
        title = ${title},
        description = ${description},
        page_amount = ${pageAmount}
      WHERE
        id = ${id}
    `
  }

  async delete(id) {
    await sql`DELETE FROM books WHERE id = ${id}`
  }
}