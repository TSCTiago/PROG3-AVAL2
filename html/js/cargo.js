const selectCargo = document.querySelector('select')
selectCargo.addEventListener('change', searchDataCandidateByCargo)

function searchDataCandidateByCargo(event) {
    const value = selectCargo.options[selectCargo.selectedIndex].text;
    // console.log(value)
    const xhr = new XMLHttpRequest()

    xhr.open('POST', '/search_data_candidate_by_cargo', true)

    xhr.setRequestHeader("Content-Type", "application/json;charset=UTF-8");


    const body = {
        cargo: `${value}`
    }

    const json = JSON.stringify(body)
    xhr.send(json)

    xhr.onload = (event) => {
        responseDataCandidateByCargo(xhr, event)
    }
}


function responseDataCandidateByCargo(xhr, event) {
    if (xhr.status != 200) {
        return;
    }
    const data = JSON.parse(xhr.response)
    console.log(data);

    const tbody = document.querySelector('.table-body')
    tbody.innerHTML = ''
    data.forEach((cand) => {
        const tr = document.createElement('tr')
        const status = cand.status == 1 ? 'Eleito' : 'Não Eleito'
        const votes = Intl.NumberFormat('pt-br').format(cand.votos)
        tr.innerHTML = `<td>${cand.nome}</td><td>${cand.cargo}</td><td>${votes}</td><td>${status}</td>`
        tbody.appendChild(tr)
    })


}