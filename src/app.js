const express = require('express')
const app = express()
const http = require('http')
const PORT = process.env.PORT || 8000
const cors = require('cors')

app.use(cors())
app.use(express.static('public'))

require('dotenv').config()

// create an HTTP server from the Express app and pass that server to the
// broadcast (socket.io) provider so socket.io is properly mounted on the
// same HTTP server that serves the express routes.
const server = http.createServer(app)
require('./service_providers/broadcast_service_provider')(server)
require('./service_providers/route_service_provider')(app, express)

server.listen(PORT, () => console.log(`Server Running on ${PORT}`))