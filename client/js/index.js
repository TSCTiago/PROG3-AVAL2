window.addEventListener("load", populateSelect);


function populateSelect(event) {
    const xhr = new XMLHttpRequest()
    
    xhr.open('POST', '/populate_select', true)
    xhr.onload = (event) => {
        result(xhr, event)
    }
    xhr.setRequestHeader("Content-Type", "application/json;charset=UTF-8");

    const select = document.querySelector('select')
    const name = select.getAttribute('name')

    const body = {
        table: name
    }
    const json = JSON.stringify(body)
    xhr.send(json)
}

function result(xhr, event) {
    if (xhr.status != 200) {
        return;
    }
    const data = JSON.parse(xhr.response)

    data.forEach(function (param) {
        addOption(param)
    });
}

function addOption(param) {
    var option = new Option(param.nome, param.id);
    const select = document.querySelector('select')
    select.add(option);
}

