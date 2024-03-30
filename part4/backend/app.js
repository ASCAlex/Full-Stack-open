const express = require('express')
require('express-async-errors')
const app = express()
const cors = require('cors')
const mongoose = require('mongoose')
const config = require('./utils/config')
const logger = require('./utils/logger')
const blogsRouter = require('./controllers/blogs')

mongoose.set('strictQuery', false)

logger.info('Connecting to MongoDB')

mongoose.connect(config.MONGODB_URI)

logger.info('Connected to MongoDB')

app.use(cors())
app.use(express.json())

app.use('/api/blogs', blogsRouter)

module.exports = app