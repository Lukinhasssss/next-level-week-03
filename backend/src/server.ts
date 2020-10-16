import express from 'express'
import path from 'path'
import cors from 'cors'

import 'express-async-errors'

import './database/connection'

import routes from './routes'
import errorHandler from './errors/handler'

const app = express()

app.use(cors())
app.use(express.json()) // Para o express conseguir entender JSON
app.use(routes)
app.use('/uploads', express.static(path.join(__dirname, '..', 'uploads')))
app.use(errorHandler)


const port = 3333
app.listen(port)


// Métodos HTTP = GET, POST, PUT, DELETE

// GET = Buscar uma informação (Lista, item)
// POST = Criar uma informação

// PUT = Editar uma informação
// DELETE = Deletar uma informação

// Parâmetro = Query, Route, Body

// Query Params: http://localhost:3333/users?search=lucas
// Route Params: http://localhost:3333/users/1 (Identificar um recurso)
// Body: http://localhost:3333/users