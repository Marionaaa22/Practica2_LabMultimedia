/*
* CLASSE MUR
*/

class Mur {
    constructor() {
        this.totxos = [];
    }

    generaMur(totxoamplada, totxoalcada, indexNivell) {

        this.totxos = [];

        let nivell = this.nivells[indexNivell];

        let marge = 2;

        let columnes = nivell.totxos[0].length;

        let ampladaTotalMur =
            columnes * (totxoamplada + marge) - marge;

        let margeEsquerre =
            (joc.canvas.width - ampladaTotalMur) / 2;

        for (let i = 0; i < nivell.totxos.length; i++) {

            for (let j = 0; j < nivell.totxos[i].length; j++) {

                if (nivell.totxos[i][j] === "a") {

                    let x =
                        margeEsquerre +
                        j * (totxoamplada + marge);

                    let y =
                        5 + i * (totxoalcada + marge);

                    let totxo = new Totxo(
                        new Punt(x, y),
                        totxoamplada,
                        totxoalcada
                    );

                    totxo.color = nivell.color;

                    this.totxos.push(totxo);
                }
            }
        }
    }

    draw(ctx) {
        for (let i = 0; i < this.totxos.length; i++) {
            this.totxos[i].draw(ctx);
        }
    }

    defineixNivells() {
        this.nivells = [
            {
                color: "#4CF", // blue cel
                totxos: [
                    /* "aaaaaaaaaaaa",
                    "aaaaaaaaaaaa",
                    "aaaaaaaaaaaa", */
                    "a",
                ]
            },
            {
                color: "#8D1", // verd
                totxos: [
                    "aaaaaaaaaaaa",
                    "     aa     ",
                    "   aaaaaa   ",
                    "   aaaaaa   ",
                    "     aa     ",
                ]
            },
            {
                color: "#D30", // vermell
                totxos: [
                    "aaaaaaaaaaaa",
                    "a          a",
                    " a        a ",
                    "aa        aa",
                    "  aaaaaaaa  ",
                ]
            }
        ];
    }

};