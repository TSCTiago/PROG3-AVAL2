const sqlite = require('./db/database')

function populateSelect(request, response) {
    let name = request.body.table

    const querys = {
        q1: `SELECT
             id, nome 
             FROM candidato 
             WHERE tipo=1 
             ORDER BY nome`,

        q2: `SELECT
             id, nome 
             FROM cargo 
             ORDER BY id`,

        q3: `SELECT
             id, nome 
             FROM municipio 
             ORDER BY nome`
    }

    let sql = ''

    switch (name) {
        case 'candidato':
            sql = querys.q1;
            break;
        case 'cargo':
            sql = querys.q2;
            break;
        case 'municipio':
            sql = querys.q3;
            break;
        default:
            break;
    }

    databaseSearch(sql, response)


}

function searchCandidate(request, response) {
    const nome = request.body.name

    const sql = `SELECT 
                cand_nome, cargo_nome, cand_votos, cand_status 
                FROM votos_cand_estado
                WHERE cand_nome like '${nome}'`

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
    const sql = `SELECT 
                cand_nome, cargo_nome, cand_votos, cand_status 
                FROM votos_cand_estado 
                WHERE cargo_nome 
                LIKE '${cargo}' ORDER BY cand_votos DESC`

    databaseSearch(sql, response)

}


function searchCandidateByMunicipio(request, response) {
    const municipio = request.body.municipio
    const sql = `SELECT 
                cand_nome, cargo_nome, cand_votos, cand_status 
                FROM votos_cand_municipio 
                WHERE muni_nome 
                LIKE '${municipio}' 
                ORDER BY cargo_id ASC, cand_votos DESC;`

    databaseSearch(sql, response)
}

function generalResult(request, response) {

    const value = request.body.value

    const querys = {
        q1: `SELECT 
            cand_nome, cargo_nome, cand_votos, cand_status 
            FROM votos_cand_estado 
            ORDER BY cargo_id ASC, cand_votos DESC;`,

        q2: `SELECT 
            cand_nome, cargo_nome, cand_votos, cand_status 
            FROM votos_cand_estado 
            WHERE cand_status=${value} 
            ORDER BY cargo_id ASC, cand_votos DESC;`,

        q3: `SELECT 
            cand_nome, cargo_nome, cand_votos, cand_status 
            FROM votos_cand_estado 
            WHERE cand_status=0 OR cand_status=2 
            ORDER BY cargo_id ASC, cand_votos DESC;`
    }

    let sql = ''

    switch (value) {
        case '0':
            sql = querys.q1;
            break;
        case '1':
            sql = querys.q2;
            break;
        case '2':
            sql = querys.q3;
            break;
        default:
            break;

    }

    databaseSearch(sql, response)


}

function databaseSearch(query, response) {

    sqlite.database.all(query, (error, rows) => {
        if (error) {
            throw Error(error.message)
        }

        const tuples = JSON.stringify(rows)

        response.send(tuples)
    })
}


module.exports = {
    populateSelect,
    searchCandidate,
    searchCandidateByCargo,
    searchCandidateByMunicipio,
    generalResult
}
