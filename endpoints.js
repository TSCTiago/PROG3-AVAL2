const sqlite = require('./database')

function populateSelect(request, response) {
    let name = request.body.table

    const querys = {
        q1: `SELECT id, nome FROM candidato WHERE tipo=1 ORDER BY nome`,
        q2: `SELECT id, nome FROM cargo ORDER BY id`,
        q3: `SELECT id, nome FROM municipio ORDER BY nome`
    }
    let sql = ''

    if (name == 'candidato') {
        sql = querys.q1
    }
    else if (name == 'cargo') {
        sql = querys.q2

    }
    else if (name == 'municipio') {
        sql = querys.q3
    }

    sqlite.database.all(sql, (error, rows) => {
        if (error) {
            throw Error(error.message)
        }

        const data = rows.map((param) => {
            return {
                id: param.id,
                name: param.nome
            }
        })

        const jsonOptionsValues = JSON.stringify(data)
        response.send(jsonOptionsValues)
    }
    )

}

function searchCandidate(request, response) {
    const nome = request.body.name

    const sql = `SELECT cand_nome, cargo_nome, cand_votos, cand_status  FROM votos_cand_estado where cand_nome like '${nome}'`

    sqlite.database.each(sql, (error, row) => {
        if (error) {
            throw new Error(error.message);
        }
        const dataCandidate = JSON.stringify(row)

        response.send(dataCandidate)
    });


}

function searchCandidateByCargo(request, response) {
    const cargo = request.body.cargo
    const sql = `SELECT cand_nome, cargo_nome, cand_votos, cand_status FROM votos_cand_estado where cargo_nome like '${cargo}' ORDER BY cand_votos DESC`

    sqlite.database.all(sql, (error, rows) => {
        if (error) {
            throw Error(error.message)
        }

        const dataCandidateByCargo = JSON.stringify(rows)
        response.send(dataCandidateByCargo)
    }
    )

}


function searchCandidateByMunicipio(request, response) {
    const municipio = request.body.municipio
    const sql = `SELECT cand_nome, cargo_nome, cand_votos, cand_status FROM votos_cand_municipio where muni_nome like '${municipio}' ORDER BY cargo_id ASC, cand_votos DESC;`

    sqlite.database.all(sql, (error, rows) => {
        if (error) {
            throw Error(error.message)
        }

        const dataCandidateByMunicipio = JSON.stringify(rows)
        response.send(dataCandidateByMunicipio)
    }
    )
}

function geralResult(request, response) {

    const value = request.body.value
    let sql = ''
    const querys = {
        q1: `SELECT cand_nome, cargo_nome, cand_votos, cand_status FROM votos_cand_estado ORDER BY cargo_id ASC, cand_votos DESC;`,
        q2: `SELECT cand_nome, cargo_nome, cand_votos, cand_status FROM votos_cand_estado where cand_status=${value} ORDER BY cargo_id ASC, cand_votos DESC;`,
        q3: `SELECT cand_nome, cargo_nome, cand_votos, cand_status FROM votos_cand_estado where cand_status=0 OR cand_status=2 ORDER BY cargo_id ASC, cand_votos DESC;`
    }

    if (value == 0) {
        sql = querys.q1
    }
    else if (value == 1) {
        sql = querys.q2
    }
    else {
        sql = querys.q3
    }

    sqlite.database.all(sql, (error, rows) => {
        if (error) {
            throw Error(error.message)
        }
        const geralResult = JSON.stringify(rows)
        response.send(geralResult)
    }
    )


}

module.exports = {
    populateSelect,
    searchCandidate,
    searchCandidateByCargo,
    searchCandidateByMunicipio,
    geralResult
}
