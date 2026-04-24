const form = document.getElementById("taskForm")

if(form){

    form.addEventListener("submit", function(event){

        event.preventDefault()

        const titulo =
        document.getElementById("titulo").value

        const materia =
        document.getElementById("materia").value

        let tarefas = JSON.parse(
            localStorage.getItem("tarefas")
        ) || []

        tarefas.push({

            titulo: titulo,
            materia: materia,
            concluida: false

        })

        localStorage.setItem(
            "tarefas",
            JSON.stringify(tarefas)
        )

        window.location.href =
        "dashboard.html"

    })

}

const container =
document.querySelector(".tasks-container")

if(container){

    let tarefas = JSON.parse(
        localStorage.getItem("tarefas")
    ) || []

    tarefas.forEach((tarefa, index) => {

        container.innerHTML += `

        <div class="task">

            <h3>
                ${tarefa.titulo}
            </h3>

            <p>
                ${tarefa.materia}
            </p>

            <p>
                ${
                    tarefa.concluida
                    ? "✅ Concluída"
                    : "❌ Pendente"
                }
            </p>

            <div class="task-buttons">

                <button onclick="concluir(${index})">
                    Concluir
                </button>

                <button onclick="editar(${index})">
                    Editar
                </button>

                <button onclick="remover(${index})">
                    Remover
                </button>

            </div>

        </div>

        `

    })

}

function remover(index){

    let tarefas = JSON.parse(
        localStorage.getItem("tarefas")
    )

    tarefas.splice(index, 1)

    localStorage.setItem(
        "tarefas",
        JSON.stringify(tarefas)
    )

    location.reload()

}

function concluir(index){

    let tarefas = JSON.parse(
        localStorage.getItem("tarefas")
    )

    tarefas[index].concluida =
    !tarefas[index].concluida

    localStorage.setItem(
        "tarefas",
        JSON.stringify(tarefas)
    )

    location.reload()

}

function editar(index){

    let tarefas = JSON.parse(
        localStorage.getItem("tarefas")
    )

    let novoTitulo =
    prompt(
        "Novo título:",
        tarefas[index].titulo
    )

    tarefas[index].titulo =
    novoTitulo

    localStorage.setItem(
        "tarefas",
        JSON.stringify(tarefas)
    )

    location.reload()

}

function filtrar(){

    let filtro =
    document.getElementById("filtro")
    .value.toLowerCase()

    let tarefas =
    document.querySelectorAll(".task")

    tarefas.forEach((tarefa) => {

        let texto =
        tarefa.innerText.toLowerCase()

        if(texto.includes(filtro)){

            tarefa.style.display =
            "block"

        }

        else{

            tarefa.style.display =
            "none"

        }

    })

}