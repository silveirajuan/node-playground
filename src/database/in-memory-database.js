import { randomUUID } from 'node:crypto'

export class InMemoryDatabase {
  #books = new Map()

  async list() {
    const booksMapToArray = Array.from(
      this.#books.entries()
    ).map(book => {
      const [bookId, bookInfo] = book

      return {
        id: bookId,
        ...bookInfo,
      }
    })

    return booksMapToArray
  }

  async create({ title, description, pageAmount }) {
    const bookId = randomUUID()

    const createdBook = this.#books.set(bookId, {
      title,
      description,
      pageAmount,
    })

    return createdBook
  }

  async update(id, data) {
    const { title, description, pageAmount } = data

    const updatedBook = this.#books.set(id, {
      title,
      description,
      pageAmount,
    })

    return updatedBook
  }

  async delete(id) {
    this.#books.delete(id)
  }
}