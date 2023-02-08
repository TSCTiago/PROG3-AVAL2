const selectCandidates = document.querySelector('#candidato')


selectCandidates.addEventListener('change', searchDataCandidate)

function searchDataCandidate(event) {

    const value = selectCandidates.options[selectCandidates.selectedIndex].text;

    if (value == 'Selecione o candidato') {
        clearTable()
        return
    }

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
    tbody.innerHTML = ''

    const tr = document.createElement('tr');
        
        const name = data.cand_nome
        const cargo = data.cargo_nome
        const votes = Intl.NumberFormat('pt-br').format(data.cand_votos)
        const status = data.cand_status == 1 ? 'Eleito' : 'Não Eleito'

        const tds = [name, cargo, votes, status].map(content => {
            const td = document.createElement('td');
            td.textContent = content;
            return td;
        });

        tr.append(...tds);
        tbody.appendChild(tr);
}

function clearTable(){
    const tbody = document.querySelector('.table-body')
    tbody.innerHTML = ''
}