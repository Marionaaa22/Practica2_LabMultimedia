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

function mostrarAjustes() {
    $("#modalAjustes").css("display", "flex");
}

function animacio() {
    if (!joc.jocActiu){
        return;
    }

    joc.update();
    requestAnimationFrame(animacio);
}