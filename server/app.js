process.env.NODE_TLS_REJECT_UNAUTHORIZED = "0"
const express = require('express')
const app = express()
const apiHandler = require('./apiHandler.js')
const bodyParser = require('body-parser')

app.use(bodyParser.json())

app.get('/', (req, res) => {
  apiHandler.getData()
})

app.listen(3000, () => console.log('listening on port 3000!'))