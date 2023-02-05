
// Load express module
const express = require('express')
// Load endpoints module
const endpoints = require('./endpoints')

// Create an express instance
const app = express()

// Middleware to serve static files
app.use(express.static('./html'))
app.use(express.json())
app.use(express.urlencoded({ extended: true }))



// Listen at 8080 port
app.listen(8080, function () {
    console.log('Server listenning localhost:8080')
})
