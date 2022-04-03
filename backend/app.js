require('dotenv').config()
const express = require('express')
const mongoose = require('mongoose')
const jsend = require('jsend')

const app = express()
const routes = require('./routes')

mongoose.connect(process.env.MONGO_URI, {
  useNewUrlParser: true,
  useUnifiedTopology: true
})

app.use(express.json())
app.use(jsend.middleware)
app.use('/api', routes)

app.listen(process.env.PORT, () => console.log('Server running!'))
