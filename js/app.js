/* EventListeners */

eventListeners();

function eventListeners() {
    //Cuando se envía el formulario
    document.getElementById("formulario").addEventListener('submit', leerValores);
    //Contenido cargado
    document.addEventListener('DOMContentLoaded', localStorageListo);
}


/* Funciones */

function leerValores(e) {
    e.preventDefault();

    //Variables a utilizar para leer el formuario
    let fecha;
    const montoFormulario = document.getElementById("cantidad").value;
    const conceptoFormulario = document.getElementById("concepto").value;
    let fechaFormulario = document.getElementById("fecha").value;
    const tipoFormulario = document.getElementById("tipo").value;

    //Se va a generar una fecha en caso de no ingresar una
    if (fechaFormulario === "" || fechaFormulario === null) {
        fecha = new Date();
        fechaFormulario = `${fecha.getFullYear()}-${fecha.getMonth()+1}-${fecha.getDate()}`;
    }

    //Construimos un arreglo con los datos obtenidos del formulario
    const datos = [fechaFormulario, montoFormulario, conceptoFormulario, tipoFormulario];

    //Aquí agregamos a local Storage los datos ingresados
    agregarLocalStorage(datos);

    //Se recarga el navegador para borrar los datos del formulario
    location.reload();
}

function agregarLocalStorage(datos) {
    let listaDatos;
    listaDatos = obtenerLocalStorage();
    listaDatos.push(datos);
    console.log(typeof(listaDatos.toString()));
    localStorage.setItem('listaDatos', JSON.stringify(listaDatos));
}

function obtenerLocalStorage() {
    let listaDatos;
    if (localStorage.getItem('listaDatos') === null) {
        listaDatos = [];
    } else {
        listaDatos = JSON.parse(localStorage.getItem('listaDatos'));
    }
    return listaDatos;
}

function localStorageListo() {
    let listaDatos;
    let ingresos = 0;
    let egresos = 0;
    let llave = 0;
    listaDatos = obtenerLocalStorage();
    listaDatos.forEach(function(datos) {
        //Aquí separamos los ingresos y los egresos
        if (datos[3] === 'ingreso') {
            ingresos = ingresos + parseFloat(datos[1]);
            let item = document.getElementById('tbody-ingresos');
            item.innerHTML += insertarFila(datos, llave);
        } else {
            egresos = egresos + parseFloat(datos[1]);
            let item = document.getElementById('tbody-egresos');
            item.innerHTML += insertarFila(datos, llave);
        }
        llave = llave + 1;
    });
    document.getElementById('ingresos-header').innerText = ingresos;
    document.getElementById('egresos-header').innerText = egresos;
    document.getElementById('total-header').innerText = ingresos - egresos;
}

function insertarFila(datos, llave) {
    return `
    <tr>
        <th scope="row">${datos[0]}</th>
        <td>$ ${datos[1]}</td>
        <td colspan="2">${datos[2]}</td>
        <td><a id=${llave} style="color:red; font-weight:bold;font-size:18px;" href="" onclick="crearId(${llave})">X</a></td>
    </tr>
    `;
}

function crearId(llave) {
    alert("Se ha eliminado un elemento");
    let key = llave.toString();
    listaDatos = obtenerLocalStorage();
    listaDatos.splice(key, 1);
    localStorage.setItem('listaDatos', JSON.stringify(listaDatos));
}


function borrarBoton(e) {
    e.preventDefault();
    console.log("Se quiere borrar");
}

/* Anexo de estilo para los ingresos o egresos */
let seleccionTipo = document.getElementById('tipo');