const selectCargo = document.querySelector('select')
selectCargo.addEventListener('change', searchDataCandidateByCargo)

function searchDataCandidateByCargo(event) {
    const value = selectCargo.options[selectCargo.selectedIndex].text;

    if(value == 'Selecione um cargo'){
        clearTable()
        return
    }

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
        const tr = document.createElement('tr');
        
        const name = resp.cand_nome
        const cargo = resp.cargo_nome
        const votes = Intl.NumberFormat('pt-br').format(resp.cand_votos)
        const status = resp.cand_status == 1 ? 'Eleito' : 'Não Eleito'

        const tds = [name, cargo, votes, status].map(content => {
            const td = document.createElement('td');
            td.textContent = content;
            return td;
        });

        tr.append(...tds);
        tbody.appendChild(tr);
    })
}

function clearTable(){
    const tbody = document.querySelector('.table-body')
    tbody.innerHTML = ''
}