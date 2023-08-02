// sets up the server and applies middleware functions to handle CORS and parse incoming request bodies, allowing the application to receive data from clients in JSON and URL-encoded formats.
const express = require('express')
const bodyParser = require('body-parser')
const app = express()
const port = 3000
const cors = require('cors')

app.use(cors())

app.use(bodyParser.urlencoded({
    extended: true
}))
// allowing data to be sent in JSON format.
app.use(bodyParser.json())

app.use('/api', require('./routes'))
// Start the server
app.listen(port, () => {
    console.log(`Example todo app on port http://localhost:${port}`)
})