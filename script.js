const btnAddTask = document.querySelector('.btn-add-task')
const input = document.querySelector('.input-task')
const listComplete = document.querySelector('.list-task')
const btnMin = document.querySelector('#icon-aba')
const nav = document.querySelector('#id-nav')
let numero = 0;


let minhaListaItens = []



function addNewTask() {

    if (input.value.trim() === '') {
        alert('Não é possivel adicionar uma tarefa em branco!');
        return;
    }


    minhaListaItens.push({
        task: input.value,
        completed: false
    })



    input.value = ''

    showTask()
}

function showTask() {
    let newLi = ''

    minhaListaItens.forEach((item, index) => {
        newLi = newLi + `
                    
        <li class="task ${item.completed && "done"}">
        <img src="./src/icon-check.png" alt="Icone de correto" width="25px" onclick="itemComplete(${index})">
        <p>${item.task}</p>
        <img src="./src/icon-trash.png" alt="Icone de lixeira" width="25px" onclick="itemDelete(${index})">
        </li>
        `
    })
    listComplete.innerHTML = newLi

    localStorage.setItem('lista', JSON.stringify(minhaListaItens))
}

function itemComplete(index) {
    minhaListaItens[index].completed = !minhaListaItens[index].completed
    showTask()
}

function itemDelete(index) {
    minhaListaItens.splice(index, 1)

    showTask()
}

function reloadItems() {
    const tasksLocalStorage = localStorage.getItem('lista')

    if (tasksLocalStorage) {
        minhaListaItens = JSON.parse(tasksLocalStorage)
    }

    showTask()
}

function minimize() {
    if (nav.classList.contains('nav') && numero===0) {
        //minimizar
        document.getElementById("id-nav").classList.remove("nav");
        document.getElementById("id-nav").classList.add("minimizado");
        numero +=1;
        console.log(numero)
    } else {
        document.getElementById("id-nav").classList.remove("minimizado");
        document.getElementById("id-nav").classList.add("nav");
        numero = 0;
        console.log(numero)
    }
    // document.getElementById("id-nav").classList.remove("nav");
    // document.getElementById("id-nav").classList.add("minimizado");
}

function verificarTela(){
    if (numero === 1 && window.innerWidth <= 700) {
        document.getElementById("id-nav").classList.remove("minimizado");
        document.getElementById("id-nav").classList.add("nav");
        numero = 0;
    }
}

reloadItems()


function verificarEnter(){
    if (event.key === 'Enter') {
        addNewTask()
    }
}

document.addEventListener('keydown', verificarEnter);
window.addEventListener('resize', verificarTela);
btnMin.addEventListener('click', minimize)
btnAddTask.addEventListener('click', addNewTask)

