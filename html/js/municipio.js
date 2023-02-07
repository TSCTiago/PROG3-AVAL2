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

        const tr = document.createElement('tr');
        
        const name = resp.cand_nome
        const cargo = resp.cand_status
        const votes = Intl.NumberFormat('pt-br').format(resp.cand_votos)
        const status = resp.cargo_nome == 1 ? 'Eleito' : 'Não Eleito'

        const tds = [name, cargo, votes, status].map(content => {
            const td = document.createElement('td');
            td.textContent = content;
            return td;
        });

        tr.append(...tds);
        tbody.appendChild(tr);
    })

    const total = document.querySelector('#total')
    total.innerHTML = `${Intl.NumberFormat('pt-br').format(soma)} votos`
}