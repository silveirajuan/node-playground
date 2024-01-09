import { fastify } from 'fastify'
import { PostgresDatabase } from './database/postgres-database.js'

const app = fastify()
const database = new PostgresDatabase()

app.get('/books', async () => {
  const books = await database.list()

  return {
    books,
  }
})

app.post('/books', async (request, response) => {
  const { title, description, pageAmount } = request.body

  await database.create({
    title,
    description,
    pageAmount
  })

  return response.status(201).send()
})

app.put('/books/:id', async (request, response) => {
  const { id } = request.params
  const { title, description, pageAmount } = request.body

  await database.update(id, {
    title, 
    description, 
    pageAmount,
  })

  return response.status(204).send()
})

app.delete('/books/:id', async (request, response) => {
  const { id } = request.params

  await database.delete(id)

  return response.status(204).send()
})

app
  .listen({
    host: '0.0.0.0',
    port: process.env.PORT || 4000,
  })
  .then(() => {
    console.log('🎉 HTTP Server is running!')
  })
