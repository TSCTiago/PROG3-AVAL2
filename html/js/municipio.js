const selectMunicipio = document.querySelector('select')

selectMunicipio.addEventListener('change', searchDataCandidateByMunicipio)

function searchDataCandidateByMunicipio(event) {
    const value = selectMunicipio.options[selectMunicipio.selectedIndex].text;
    if(value == ''){
        return
    }
    const xhr = new XMLHttpRequest()

    xhr.open('POST', '/search_data_candidate_by_municipio', true)

    xhr.setRequestHeader("Content-Type", "application/json;charset=UTF-8");

    const body = {
        municipio: value
    }

    const json = JSON.stringify(body)
    xhr.send(json)

    xhr.onload = () => {
        responseDataCandidateByMunicipio(xhr)
    }
}

function responseDataCandidateByMunicipio(xhr) {
    if (xhr.status != 200) {
        return;
    }

    const data = JSON.parse(xhr.response)

    let soma = 0;

    const tbody = document.querySelector('.table-body')
    tbody.innerHTML = ''

    data.forEach((resp) => {
        soma = soma + resp.cand_votos
        const tr = document.createElement('tr')
        const status = resp.cargo_nome == 1 ? 'Eleito' : 'Não Eleito'
        const votes = Intl.NumberFormat('pt-br').format(resp.cand_votos)
        tr.innerHTML = `<td>${resp.cand_nome}</td><td>${resp.cand_status}</td><td>${votes}</td><td>${status}</td>`
        tbody.appendChild(tr)
    })

    const total = document.querySelector('#total')
    total.innerHTML = `${Intl.NumberFormat('pt-br').format(soma)} votos`
}