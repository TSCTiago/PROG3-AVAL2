const selectFilter = document.querySelector('select')
selectFilter.addEventListener('change', searchFinalResult)


function searchFinalResult(event) {
    const valueSelect = selectFilter.options[selectFilter.selectedIndex].value;
    // console.log(textSelected)
    const xhr = new XMLHttpRequest()

    xhr.open('POST', '/geral_result', true)

    xhr.setRequestHeader("Content-Type", "application/json;charset=UTF-8");


    const body = {
        value: valueSelect,

    }

    const json = JSON.stringify(body)
    xhr.send(json)

    xhr.onload = (event) => {
        responseGeralResult(xhr, event)
    }
}


function responseGeralResult(xhr, event) {
    if (xhr.status != 200) {
        return;
    }

    console.log(xhr.response)
    const data = JSON.parse(xhr.response)
    console.log(data)

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