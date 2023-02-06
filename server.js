
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

// Create endpoits
app.post('/populate_select', endpoints.populateSelect)
app.post('/search_data_candidate', endpoints.searchCandidate)
app.post('/search_data_candidate_by_cargo', endpoints.searchCandidateByCargo)
app.post('/search_data_candidate_by_municipio', endpoints.searchCandidateByMunicipio)
app.post('/geral_result', endpoints.generalResult)


// Listen at 8080 port
app.listen(8080, function () {
    console.log('Server listenning localhost:8080')
})
