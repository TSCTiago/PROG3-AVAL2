const selectFilter = document.querySelector('select')
selectFilter.addEventListener('change', searchFinalResult)

function searchFinalResult(event) {
    const value = selectFilter.options[selectFilter.selectedIndex].value;

    if (value == '') {
        clearTable()
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