/*
* APLICACIÓ
*/

$(document).ready(function() {

    let myCanvas = document.getElementById("joc");
    let ctx = myCanvas.getContext("2d");

    joc = new Joc(myCanvas,ctx);
    joc.inicialitza();
    configuracioJoc();
    animacio();
    $("#myModal").css("display", "flex");


});

function animacio() {
    joc.update();
    requestAnimationFrame(animacio);    
}

function configuracioJoc() {
    $("#myModal").css("display", "flex");

    $("#btnNivell1").on("click", function () {
        console.log("nivell 1");
        $("#myModal").css("display", "none");
    });
    $("#btnNivell2").on("click", function () {
        console.log("nivell 2");
        $("#myModal").css("display", "none");
    });
    $("#btnNivell3").on("click", function () {
        console.log("nivell 3");
        $("#myModal").css("display", "none");
    });

}