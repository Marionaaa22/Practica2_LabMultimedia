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

        joc.configuraNivell(nivell);
        registrarRecords();

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
        joc.campanya = false;
        iniciarJuego(0);
        $("#nivellActual").text("1");
    });

    $("#btnNivell2").click(function () {
        joc.campanya = false;
        iniciarJuego(1);
        $("#nivellActual").text("2");
    });

    $("#btnNivell3").click(function () {
        joc.campanya = false;
        iniciarJuego(2);
        $("#nivellActual").text("3");
    });

    $("#btnNivellC").click(function () {

        joc.campanya = true;
        joc.nivellActual = 1;

        joc.vides = 3;
        joc.punts = 0;

        $("#videsJugador").text(joc.vides);
        $("#punts").text(joc.punts);

        iniciarJuego(0);
        iniciarTemps();

        $("#nivellActual").text("CAMPANYA (Nivell 1)");
    });

});

function iniciarTemps() {

    segons = 0;
    joc.tempsFinal = 0;

    $("#temps").text("0s");

    clearInterval(intervalTemps);

    intervalTemps = setInterval(function () {

        segons++;
        $("#temps").text(segons + "s");


        joc.tempsFinal = segons; 
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

    $("#modalGuanyar").hide();
    $("#modalAjustes").hide();
    $("#modalCampanya").hide();
    $("#modaHasGuanyatCampanya").hide();

    registrarRecords();

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

function seguentNivellCampanya() {

    $("#modalCampanya").hide();

    joc.nivellActual++;

    if (joc.nivellActual > 3) {
        $("#modalCampanya").css("display", "flex");
        return;
    }

    $("#nivellActual").text(
        "CAMPANYA (Nivell " + joc.nivellActual + ")"
    );

    joc.bola.posicio.x = joc.canvas.width / 2;
    joc.bola.posicio.y = joc.canvas.height / 2;

    joc.bola.vx = 0;
    joc.bola.vy = 0;

    joc.configuraNivell(joc.nivellActual - 1);

    setTimeout(() => {
        joc.bola.vx = 1;
        joc.bola.vy = 1;
    }, 1000);

    joc.jocActiu = true;
    requestAnimationFrame(animacio);
}

function cambiaNivell() {

    $("#modalAjustes").hide();
    $("#modalGuanyar").hide();
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

function registrarRecords() {

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

    let top3 = tablaLideres.slice(0, 5);

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