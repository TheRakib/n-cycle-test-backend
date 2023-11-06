import express from 'express'
import cors from 'cors'

import { admin } from './utils/firebase.js'
import { firebaseAuthMiddleware } from './middleware.js'
import { getUser, updateUser } from './user.js'



admin()
const app = express()

app.use(cors())
app.use(express.json())
app.use(express.urlencoded({ extended: true }))
app.use(firebaseAuthMiddleware)

app.get('/', (_, res) => res.send('Hi, the server is running!'))
app.get('/users/:id', getUser)
app.put('/users/:id', updateUser)

export default app