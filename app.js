const express = require('express')
const cors = require('cors')
const app = express()
const allRoutes = require('./routes')
const errorHandler = require('./middlewares/errorHandler')

app.use(express.urlencoded({extended:true}))
app.use(express.json())
app.use(cors())
app.use(allRoutes)
app.use(errorHandler)

module.exports = app