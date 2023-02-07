const selectFilter = document.querySelector('select')
selectFilter.addEventListener('change', searchFinalResult)

function searchFinalResult(event) {
    const value = selectFilter.options[selectFilter.selectedIndex].value;

    if(value == ''){
        return
    }
    const xhr = new XMLHttpRequest()

    xhr.open('POST', '/geral_result', true)

    xhr.setRequestHeader("Content-Type", "application/json;charset=UTF-8");

    const body = {
        value: value

    }

    const json = JSON.stringify(body)
    xhr.send(json)

    xhr.onload = () => {
        responseGeneralResult(xhr)
    }
}

function responseGeneralResult(xhr) {
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