const selectCandidates = document.querySelector('#candidato')


selectCandidates.addEventListener('change', searchDataCandidate)

function searchDataCandidate(event) {

    const value = selectCandidates.options[selectCandidates.selectedIndex].text;
    const xhr = new XMLHttpRequest()

    xhr.open('POST', '/search_data_candidate', true)

    xhr.setRequestHeader("Content-Type", "application/json;charset=UTF-8");

    const body = {
        name: value
    }

    const json = JSON.stringify(body)
    xhr.send(json)

    xhr.onload = () => {
        responseDataCandidate(xhr)
    }
}

function responseDataCandidate(xhr) {

    if (xhr.status != 200) {
        return;
    }

    const data = JSON.parse(xhr.response)

    const tbody = document.querySelector('.table-body')
    const status = data.cand_status == 1 ? 'Eleito' : 'Não Eleito'
    const votes = Intl.NumberFormat('pt-br').format(data.cand_votos)

    tbody.innerHTML = `<tr><td>${data.cand_nome}</td><td>${data.cargo_nome}</td><td>${votes}</td><td>${status}</td></tr>`

}