// selecciono el boton 'enviar' y el div donde se mostraran las tareas
const btn = document.querySelector('#enviar'),
tareasDiv = document.querySelector('#tareas'),
errorDiv = document.querySelector('#error');

// obtengo las tareas almacenadas en el localStorage o un array vacio si no hay
let tareas = JSON.parse(localStorage.getItem('tareasLocal')) || [];

// funcion para recoger la tarea ingresada y agregarla al array de tareas
function recogerTarea(){
    // obtengo el valor de la tarea
    const tarea = document.querySelector('#tarea').value;
    // agrego la tarea al array
    if(tarea != ""){
        tareas.push(tarea);
        // almaceno el array actualizado en el localStorage
        localStorage.setItem('tareasLocal',JSON.stringify(tareas))
        // limpio el campo de entrada
        document.querySelector('#tarea').value = '';
    }else{
        const error = document.createElement("div");
        error.className = "text-center text-white bg-danger p-2 rounded";
        error.textContent = "No puedes añadir tareas vacias";
        errorDiv.appendChild(error); // Añadir error al contenedor
        setTimeout(() => errorDiv.innerHTML = "", 2000);
    }
    
}

// funcion para eliminar una tarea por su index
function eliminarTarea(index) {
    // elimino la tarea del array
    tareas.splice(index, 1);
    // actualizo el localStorage
    localStorage.setItem('tareasLocal', JSON.stringify(tareas));
    // muestro las tareas nuevamente
    mostrarTareas();
}

// funcion para mostrar todas las tareas
function mostrarTareas(){
    // limpio el contenido del div de tareas
    tareasDiv.innerHTML=""
    // recorro todas las tareas y las muestro
    tareas.forEach((dato, index) => {

        // creo un nuevo elemento p para cada tarea
        const tareaP = document.createElement('p');
        tareaP.className = 'list-group-item col-12';
        tareaP.textContent = dato;
        tareasDiv.appendChild(tareaP);

        // creo un boton de eliminar para cada tarea
        const btnEliminar = document.createElement('button');
        btnEliminar.textContent = 'Eliminar';
        btnEliminar.className = 'btn btn-danger mx-4';
        // asigno el evento de eliminar
        btnEliminar.onclick = () => eliminarTarea(index);

        // agrego el boton al parrafo
        tareaP.appendChild(btnEliminar);
        // agrego el parrafo con el boton al div de tareas
        tareasDiv.appendChild(tareaP);
    });
}

// al hacer clic en el boton 'enviar', recojo la tarea y muestro las tareas
btn.addEventListener('click', (e) => {
    e.preventDefault()
    recogerTarea();
    mostrarTareas(tareas);
})

// muestro las tareas al cargar la pagina
mostrarTareas(tareas);
