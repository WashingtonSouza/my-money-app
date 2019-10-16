const port = 3003,
    bodyParser = require('body-parser'),
    express = require('express'),
    server = express(),
    allowCors = require('./cors'),
    queryParser = require('express-query-int')

server.use(bodyParser.urlencoded({ extended: true }))
server.use(bodyParser.json())
server.use(allowCors)
server.use(queryParser())

server.listen(port, function() {
    console.log(`BACKEND is running on port ${port}`)
})

module.exports = server