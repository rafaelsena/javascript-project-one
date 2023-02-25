let input = document.querySelector("input[name=tarefa]");
let button = document.querySelector("#button");
let lista = document.querySelector("#lista");
let card = document.querySelector('.card');

let tarefas = JSON.parse(localStorage.getItem('tarefas')) || [];


/** Renders tasks. */
function RenderizarTarefas(){
    //remove previous list
    lista.innerHTML = "";

    //creates the updated list
    for (const tarefa of tarefas){
        let itemLista = document.createElement('li');
        itemLista.setAttribute('class', 'list-group-item list-group-item-action');
        itemLista.addEventListener('click', function (){
            deletarTarefa(this);
        })
        let itemTexto = document.createTextNode(tarefa)
        itemLista.appendChild(itemTexto)

        lista.appendChild(itemLista)

    }
}


/** Renders tasks. */
function removeSpans(){
    let spans = document.querySelectorAll('span');

    for (span of spans){
        card.removeChild(span);
    }
}


/**
 * Deletes a specific task and reload the list.
 * @param {dom object} tar - dom element that has the task name as text.
 */
function deletarTarefa(tar){
    tarefas.splice(tarefas.indexOf(tar.textContent), 1)
    RenderizarTarefas();
    salvaDadosNoStorage();
}


/** Save user's tasks list in client side storage. */
function salvaDadosNoStorage(){
    localStorage.setItem('tarefas', JSON.stringify(tarefas));
}

/**
 * Callback for adding click event listener.
 *
 * @callback addEventListenerCallback
 */
/**
 * @description - Add an click event listener to button.
 */
button.addEventListener('click', function (){
    let novaTarefa = input.value;
    removeSpans()
    if (novaTarefa != ""){
        tarefas.push(novaTarefa);
        RenderizarTarefas();
        input.value= ""
        salvaDadosNoStorage();
    }    
    else{
        
        let span = document.createElement('span');
        span.setAttribute('class', 'alert alert-warning');

        let msg = document.createTextNode('Você precisa informar a tarefa');
        span.appendChild(msg);
        card.appendChild(span);
    } 
}
)


RenderizarTarefas();


