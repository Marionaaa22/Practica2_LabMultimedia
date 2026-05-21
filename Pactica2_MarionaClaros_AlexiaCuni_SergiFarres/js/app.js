/*
* APLICACIÓ
*/

let joc;
let intervalTemps;
let segons = 0;

$(document).ready(function () {

    let myCanvas = document.getElementById("joc");
    let ctx = myCanvas.getContext("2d");

    joc = new Joc(myCanvas, ctx);
    joc.inicialitza();

    let nomJugador = "";
    
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

        $("#modalNivell").hide();

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

function animacio() {
    joc.update();
    requestAnimationFrame(animacio);
}