const selectCargo = document.querySelector('select')
selectCargo.addEventListener('change', searchDataCandidateByCargo)

function searchDataCandidateByCargo(event) {
    const value = selectCargo.options[selectCargo.selectedIndex].text;

    const xhr = new XMLHttpRequest()

    xhr.open('POST', '/search_data_candidate_by_cargo', true)

    xhr.setRequestHeader("Content-Type", "application/json;charset=UTF-8");

    const body = {
        cargo: value
    }

    const json = JSON.stringify(body)
    xhr.send(json)

    xhr.onload = () => {
        responseDataCandidateByCargo(xhr)
    }
}


function responseDataCandidateByCargo(xhr) {
    if (xhr.status != 200) {
        return;
    }

    const data = JSON.parse(xhr.response)

    const tbody = document.querySelector('.table-body')
    tbody.innerHTML = ''

    data.forEach((resp) => {
        const tr = document.createElement('tr')

        const status = resp.cand_status == 1 ? 'Eleito' : 'Não Eleito'
        const votes = Intl.NumberFormat('pt-br').format(resp.cand_votos)

        tr.innerHTML = `<td>${resp.cand_nome}</td><td>${resp.cargo_nome}</td><td>${votes}</td><td>${status}</td>`
        tbody.appendChild(tr)
    })


}