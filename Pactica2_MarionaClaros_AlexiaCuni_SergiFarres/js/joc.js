/*
* CLASSE JOC
*/

class Joc {
    constructor(canvas, ctx) {
        this.canvas = canvas;
        this.ctx = ctx;
        this.amplada = canvas.width;
        this.alcada = canvas.height;
        this.totxoamplada = 22;
        this.totxoalcada = 10; // MIDES DEL TOTXO EN PÍXELS
        this.totxocolor = 20;
        this.vides = 3;
        this.punts = 0;
        this.jocActiu = true;

        this.bola = new Bola(new Punt(this.canvas.width / 2, this.canvas.height / 2), 3);
        this.pala = new Pala(new Punt((this.canvas.width - 60) / 2, this.canvas.height - 15), 60, 4);
        this.totxo = new Mur();

        this.totxo.defineixNivells();


        this.key = {
            LEFT: { code: 37, pressed: false },
            RIGHT: { code: 39, pressed: false }
        };
    }

    draw() {
        this.clearCanvas();
        this.pala.draw(this.ctx);
        this.bola.draw(this.ctx);
        this.totxo.draw(this.ctx);


    }
    clearCanvas() {
        this.ctx.clearRect(0, 0, this.canvas.width, this.canvas.height)
    }

    inicialitza() {
        this.pala.draw(this.ctx);
        this.bola.draw(this.ctx);
        this.totxo.draw(this.ctx);

        $(document).on("keydown", { joc: this }, function (e) {

            if (e.keyCode === 37) {
                e.data.joc.key.LEFT.pressed = true
            }

            if (e.keyCode === 39) {
                e.data.joc.key.RIGHT.pressed = true;
            }

        });

        $(document).on("keyup", { joc: this }, function (e) {

            if (e.keyCode === 37) {
                e.data.joc.key.LEFT.pressed = false;
            }

            if (e.keyCode === 39) {
                e.data.joc.key.RIGHT.pressed = false;
            }

        });


    }

    acabaJoc() {

        this.jocActiu = false;

        clearInterval(intervalTemps);

        $("#nomJugadorGuanyar").text($("#nomJugador").text());
        $("#tempsGuanyar").text($("#temps").text());
        $("#puntsGuanyar").text($("#punts").text());

        if (joc.campanya === true) {
        seguentNivell(); 
    } else {
        $("#modalGuanyar").css("display", "flex"); 
    }
    }

    update() {

        if (this.pala.posicio.x > 0) {
            if (this.key.LEFT.pressed) {
                this.pala.mou(-1, 0);
            }
        }
        if (this.pala.posicio.x < this.canvas.width - this.pala.amplada) {
            if (this.key.RIGHT.pressed) {
                this.pala.mou(1, 0);
            }
        }
        this.bola.update();
        this.pala.update();
        this.draw();

    }

    configuraNivell(nivell) {
        this.totxo.generaMur(
            this.totxoamplada,
            this.totxoalcada,
            nivell
        );
    }
}