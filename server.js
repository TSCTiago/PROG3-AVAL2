const express = require('express')

const endpoints = require('./endpoints')

const app = express()

app.use(express.static('./html'))
app.use(express.json())
app.use(express.urlencoded({ extended: true }))

app.post('/populate_select', endpoints.populateSelect)
app.post('/search_data_candidate', endpoints.searchCandidate)
app.post('/search_data_candidate_by_cargo', endpoints.searchCandidateByCargo)
app.post('/search_data_candidate_by_municipio', endpoints.searchCandidateByMunicipio)
app.post('/geral_result', endpoints.generalResult)


app.listen(8080, function () {
    console.log('Server listenning localhost:8080')
})
