const btnAdd = document.querySelector("#boton");
const listaTarea = document.querySelector("#tareas");
const eliminarTodo = document.querySelector("#eliminar");
const formulario = document.querySelector("#form");
let tweets = [];
eventos()
function eventos() {
    eliminarTodo.addEventListener("click", function(){
        limpiar();
    })
    formulario.addEventListener("submit", agregarTweet);
    document.addEventListener("DOMContentLoaded", () => {
        tweets = JSON.parse( localStorage.getItem("tweets")) || [];
        MostrarTweet();
    });
}

function agregarTweet(e) {
    e.preventDefault();

    const texto = document.querySelector("#quehaceres").value;
    if (texto.trim() === "") {
        mostrarError("La Tarea No Puede Ir Vacía");
        return;
    }

    const tweetObj = {
        id: Date.now(),
        texto
    }

    tweets = [...tweets, tweetObj];

    MostrarTweet();
    formulario.reset();
}
function mostrarError(error) {
    const mensajeError = document.createElement("p");
    mensajeError.textContent = error;
    mensajeError.classList.add("error");
    formulario.appendChild(mensajeError);
    setTimeout(() => {
        mensajeError.remove();
    }, 2500)
}

function MostrarTweet(){
    limpiar();
    tweets.forEach(tareas => {
        const tarea = document.createElement("li");
        tarea.innerHTML = tareas.texto;
        listaTarea.appendChild(tarea);

        const eliminar = document.createElement("a");
        eliminar.href = "#";
        eliminar.textContent = "X";
        tarea.appendChild(eliminar);
        eliminar.classList.add("eliminar");

        eliminar.onclick = (e) => {
            e.preventDefault()
            borrarTweet(tareas.id);
        }

    });
    sincronizarStorage();
}

function borrarTweet(id){
    tweets = tweets.filter(tarea => tarea.id !== id);
    MostrarTweet();
}

function limpiar() {
    while(listaTarea.firstChild){
        listaTarea.removeChild(listaTarea.firstChild);
    }   
}

function sincronizarStorage() {
    localStorage.setItem("tweets", JSON.stringify(tweets));
}

