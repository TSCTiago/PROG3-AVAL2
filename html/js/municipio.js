const selectMunicipio = document.querySelector('select')


selectMunicipio.addEventListener('change', searchDataCandidateByMunicipio)



function searchDataCandidateByMunicipio(event) {
    const value = selectMunicipio.options[selectMunicipio.selectedIndex].text;
    // console.log(value)
    const xhr = new XMLHttpRequest()

    xhr.open('POST', '/search_data_candidate_by_municipio', true)

    xhr.setRequestHeader("Content-Type", "application/json;charset=UTF-8");


    const body = {
        municipio: value
    }

    const json = JSON.stringify(body)
    xhr.send(json)

    xhr.onload = (event) => {
        responseDataCandidateByMunicipio(xhr, event)
    }
}


function responseDataCandidateByMunicipio(xhr, event) {
    if (xhr.status != 200) {
        return;
    }

    console.log(xhr.response)
    const data = JSON.parse(xhr.response)

    let votos = []
    const tbody = document.querySelector('.table-body')
    tbody.innerHTML = ''
    data.forEach((cand) => {
        votos.push(cand.votos)
        const tr = document.createElement('tr')
        const status = cand.status == 1 ? 'Eleito' : 'Não Eleito'
        const votes = Intl.NumberFormat('pt-br').format(cand.votos)
        tr.innerHTML = `<td>${cand.nome}</td><td>${cand.cargo}</td><td>${votes}</td><td>${status}</td>`
        tbody.appendChild(tr)
    })

    let soma = 0;
    for (var i = 0; i < votos.length; i++) {
        soma += votos[i];
    }
    // console.log(soma);
    const sumFormated = Intl.NumberFormat('pt-br').format(soma)
    const total = document.querySelector('#total')
    total.innerHTML = `${sumFormated} votos`


}