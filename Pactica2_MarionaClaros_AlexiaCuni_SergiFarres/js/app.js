/*
* APLICACIÓ
*/

let joc;
let intervalTemps;
let segons = 0;
let nomJugador = "";

$(document).ready(function () {


    

    let myCanvas = document.getElementById("joc");
    let ctx = myCanvas.getContext("2d");

    joc = new Joc(myCanvas, ctx);
    joc.inicialitza();

    $("#modalNom").css("display", "flex");

    $("#btnContinuar").on("click", function () {

        let nom = $("#inputNom").val().trim();

        if (nom === "") {
            alert("Introdueix un nom!");
            return;
        }

        nomJugador = nom;
        $("#nomJugador").text(nomJugador);

        $("#modalNom").hide();
        $("#modalNivell").css("display", "flex");
    });

    function iniciarJuego(nivell) {
        registrarRecords();

        joc.configuraNivell(nivell);

        $("#modalNivell").hide();

        // Colores por defecto
        joc.bola.color = "white";
        joc.pala.color = "white";

        $("#colorBola").val("white");
        $("#colorPala").val("white");

        setTimeout(() => {

            joc.bola.vx = 1;
            joc.bola.vy = 1;

        }, 1000);

        animacio();
        iniciarTemps();
    }

    $("#btnNivell1").click(function () {
        iniciarJuego(0);
        $("#nivellActual").text("1");
    });

    $("#btnNivell2").click(function () {
        iniciarJuego(1);
        $("#nivellActual").text("2");
    });

    $("#btnNivell3").click(function () {
        iniciarJuego(2);
        $("#nivellActual").text("3");
    });

});

function iniciarTemps() {

    segons = 0;
    $("#temps").text(segons + "s");

    clearInterval(intervalTemps);

    intervalTemps = setInterval(function () {

        segons++;
        $("#temps").text(segons + "s");

    }, 1000);
}


function tornaJugar() {
    joc.jocActiu = false;

    registrarRecords();

    $("#modalGameOver").hide();

    joc.vides = 3;
    joc.punts = 0;

    $("#videsJugador").text(joc.vides);
    $("#punts").text(joc.punts);

    joc.bola.posicio.x = joc.canvas.width / 2;
    joc.bola.posicio.y = joc.canvas.height / 2;
    joc.bola.enMoviment = true;
    joc.jocActiu = true;

    for (let t of joc.totxo.totxos) {
        t.tocat = false;
    }

    iniciarTemps();
    $("#modalNivell").css("display", "flex");

}

function sortirJoc() {
    joc.jocActiu = false;

    joc.vides = 3;
    joc.punts = 0;

    $("#videsJugador").text(joc.vides);
    $("#punts").text(joc.punts);

    $("#inputNom").val("");
    $("#nomJugador").text("");

    $("#modalGameOver").hide();
    $("#modalNivell").hide();
    $("#modalAjustes").hide();

    joc.bola.posicio.x = joc.canvas.width / 2;
    joc.bola.posicio.y = joc.canvas.height / 2;
    joc.bola.enMoviment = true;
    joc.jocActiu = true;

    for (let t of joc.totxo.totxos) {
        t.tocat = false;
    }

    $("#modalNom").css("display", "flex");

}

function mostrarAjustes() {
    joc.jocActiu = false;
    $("#modalAjustes").css("display", "flex");

}

function guardarAjustes() {
    let colorBola = document.getElementById("colorBola").value;
    let colorPala = document.getElementById("colorPala").value;


    joc.bola.color = colorBola;
    joc.pala.color = colorPala;

    joc.bola.color = colorBola;
    joc.pala.color = colorPala;

    $("#modalAjustes").hide();

    joc.jocActiu = true;
    requestAnimationFrame(animacio);

}

function cambiaNivell() {

    $("#modalAjustes").hide();
    joc.jocActiu = false

    joc.jocActiu = false;

    joc.vides = 3;
    joc.punts = 0;

    $("#videsJugador").text(joc.vides);
    $("#punts").text(joc.punts);

    $("#modalNivell").css("display", "flex");

    joc.bola.posicio.x = joc.canvas.width / 2;
    joc.bola.posicio.y = joc.canvas.height / 2;
    joc.bola.enMoviment = true;
    joc.jocActiu = true;

    for (let t of joc.totxo.totxos) {
        t.tocat = false;
    }

}

function registrarRecords(){

    let tablaLideres = localStorage.getItem('top3_jugadores');
    tablaLideres = tablaLideres ? JSON.parse(tablaLideres) : [];

    let puntosActuales = parseInt($("#puntsFinal").text()) || 0; 

    let jugadorExistente = tablaLideres.find(j => j.nombre.toLowerCase().trim() === nomJugador.toLowerCase().trim());

    if (jugadorExistente) {
        if (puntosActuales > jugadorExistente.puntos) {
            jugadorExistente.puntos = puntosActuales;
        }
    } else {
        tablaLideres.push({
            nombre: nomJugador, 
            puntos: puntosActuales
        });
    }

    tablaLideres.sort((a, b) => b.puntos - a.puntos);

    let top3 = tablaLideres.slice(0, 3);

    localStorage.setItem('top3_jugadores', JSON.stringify(top3));

    let $ranking = $('.ranking');

    $ranking.find('.fila').remove();

    top3.forEach((jugadorActual) => {
        let filaHtml = `
            <div class="fila">
                <span>${jugadorActual.nombre}</span>
                <span>${jugadorActual.puntos}</span>
            </div>
        `;
        $ranking.append(filaHtml);
    });
}
function animacio() {
    if (!joc.jocActiu) {
        return;
    }

    joc.update();
    requestAnimationFrame(animacio);
}

function registrarRecords(){
    // 0. IMPORTANTE: Asegúrate de leer la tabla de LocalStorage al inicio de la función 
    // para que "tablaLideres" no esté vacía al reiniciar el juego.
    let tablaLideres = localStorage.getItem('top3_jugadores');
    tablaLideres = tablaLideres ? JSON.parse(tablaLideres) : [];

    // Convertimos los puntos de HTML (texto) a número entero obligatoriamente
    let puntosActuales = parseInt($("#puntsFinal").text()) || 0; 

    // 1. BUSCAR: Comprobamos si el jugador ya existe en la tabla de registros
    let jugadorExistente = tablaLideres.find(j => j.nombre.toLowerCase().trim() === nomJugador.toLowerCase().trim());

    if (jugadorExistente) {
        // Si existe, SOLO actualizamos los puntos SI la puntuación nueva es mejor
        if (puntosActuales > jugadorExistente.puntos) {
            jugadorExistente.puntos = puntosActuales;
        }
    } else {
        // Si NO existe, lo añadimos como un jugador nuevo a la lista
        tablaLideres.push({
            nombre: nomJugador, 
            puntos: puntosActuales
        });
    }

    // 2. ORDENAR: De mayor a menor puntuación (ahora que son números funciona al 100%)
    tablaLideres.sort((a, b) => b.puntos - a.puntos);

    // 3. RECORTAR: Quedarse estrictamente con los 3 mejores
    let top3 = tablaLideres.slice(0, 3);

    // 4. GUARDAR: Actualizar el LocalStorage con el nuevo Top 3
    localStorage.setItem('top3_jugadores', JSON.stringify(top3));

    // 5. RENDERIZAR EN HTML: Seleccionamos el contenedor principal de tu ranking
    let $ranking = $('.ranking');

    // Borramos las filas existentes (.fila)
    $ranking.find('.fila').remove();

    // Recorremos tu array 'top3' pintando la estructura
    top3.forEach((jugadorActual) => {
        let filaHtml = `
            <div class="fila">
                <span>${jugadorActual.nombre}</span>
                <span>${jugadorActual.puntos}</span>
            </div>
        `;
        $ranking.append(filaHtml);
    });
}