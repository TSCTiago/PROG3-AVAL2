
const sqlite = require('./database')

//funções de resolução da primeira questão
function populateSelect(request, response) {
    let name = request.body.table
    let sql = ''

    if (name == 'candidato') {
        sql = `SELECT id, nome FROM candidato WHERE tipo=1 ORDER BY nome`
    }
    else if (name == 'cargo') {
        sql = `SELECT id, nome FROM cargo ORDER BY id`
    }
    else if (name == 'municipio') {
        sql = `SELECT id, nome FROM municipio ORDER BY nome`
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

            const json = JSON.stringify(data)
            response.send(json)
        }
    )

}
function searchCandidate(request, response) {
    const nome = request.body.name
    // console.log(nome)

    const sql = `SELECT cand_nome, cargo_nome, cand_votos, cand_status  FROM votos_cand_estado where cand_nome like '${nome}'`
    // console.log(sql)
    sqlite.database.each(sql, (error, row) => {
        if (error) {
            throw new Error(error.message);
        }
        const json = JSON.stringify(row)
        // console.log(json)
        response.send(json)
    });


}

//funções de resolução da segunda questão

function searchCandidateByCargo(request, response) {
    const cargo = request.body.cargo
    const sql = `SELECT cand_nome, cargo_nome, cand_votos, cand_status FROM votos_cand_estado where cargo_nome like '${cargo}' ORDER BY cand_votos DESC`

    // console.log(sql)
    sqlite.database.all(sql, (error, rows) => {
        if (error) {
            throw Error(error.message)
        }
        const data = rows.map((cargo) => {
            return {
                nome: cargo.cand_nome,
                cargo: cargo.cargo_nome,
                votos: cargo.cand_votos,
                status: cargo.cand_status
            }
        })

        const json = JSON.stringify(data)
        // console.log(json)
        response.send(json)
    }
    )

}

//funções de resolução da terceira questão

function searchCandidateByMunicipio(request, response) {
    const municipio = request.body.municipio
    const sql = `SELECT cand_nome, cargo_nome, cand_votos, cand_status FROM votos_cand_municipio where muni_nome like '${municipio}' ORDER BY cargo_id ASC, cand_votos DESC;`

    // console.log(sql)
    sqlite.database.all(sql, (error, rows) => {
        if (error) {
            throw Error(error.message)
        }
        const data = rows.map((cargo) => {
            return {
                nome: cargo.cand_nome,
                cargo: cargo.cand_status,
                votos: cargo.cand_votos,
                status: cargo.cargo_nome
            }
        })

        const json = JSON.stringify(data)
        // console.log(json)
        response.send(json)
    }
    )
}

function geralResult(request, response) {

    const value = request.body.value
    let sql = ''

    if (value == 0) {
        sql = `SELECT cand_nome, cargo_nome, cand_votos, cand_status FROM votos_cand_estado ORDER BY cargo_id ASC, cand_votos DESC;`
    }
    else if (value == 1) {
        sql = `SELECT cand_nome, cargo_nome, cand_votos, cand_status FROM votos_cand_estado where cand_status=${value} ORDER BY cargo_id ASC, cand_votos DESC;`
    }
    else {
        sql = `SELECT cand_nome, cargo_nome, cand_votos, cand_status FROM votos_cand_estado where cand_status=0 OR cand_status=2 ORDER BY cargo_id ASC, cand_votos DESC;`
    }

    // console.log(sql)
    sqlite.database.all(sql, (error, rows) => {
        if (error) {
            throw Error(error.message)
        }
        const data = rows.map((cargo) => {
            return {
                nome: cargo.cand_nome,
                cargo: cargo.cargo_nome,
                votos: cargo.cand_votos,
                status: cargo.cand_status
            }
        })

        const json = JSON.stringify(data)
        // console.log(json)
        response.send(json)
    }
    )


}
module.exports = {
    // populateSelectCandidates,
    populateSelect,
    searchCandidate,
    searchCandidateByCargo,
    searchCandidateByMunicipio,
    geralResult
}
