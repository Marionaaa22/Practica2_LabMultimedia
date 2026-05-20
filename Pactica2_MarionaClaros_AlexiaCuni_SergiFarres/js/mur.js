/*
* CLASSE MUR
*/

class Mur {
    constructor() {
        
    }

    generaMur(totxoamplada, totxoalcada){
       if (this.nivells.length > 0){
        this.totxos = [];
        let nivell = this.nivells.shift();
        let ampladaTotalMur = 12 * totxoamplada;
        let margeEsquerre = (this.totxos.length === 0) ? (300 - ampladaTotalMur) / 2 : 0;
        for (let i=0; i<nivell.totxos.length; i++){
            for (let j=0; j<nivell.totxos[i].length; j++){
                if (nivell.totxos[i][j] === "a"){
                    let totxo = new Totxo(
                        new Punt(j * totxoamplada, i * totxoalcada), 
                        totxoamplada, 
                        totxoalcada,
                        
                    );
                    totxo.color = nivell.color;
                    this.totxos.push(totxo);
                }
            }
        }

       }
    }
   draw(ctx){
       for (let i = 0; i < this.totxos.length; i++) {
           this.totxos[i].draw(ctx);
       }
    }
     
    defineixNivells(){
        this.nivells=[
            {
                color: "#4CF", // blue cel
                totxos:[
                    "aaaaaaaaaaaa",
                    "aaaaaaaaaaaa",
                    "aaaaaaaaaaaa",
                    "aaaaaaaaaaaa",
                ]
            },
            {
                color: "#8D1", // verd
                totxos:[
                    "aaaaaaaaaaaa",
                    "     aa     ",
                    "   aaaaaa   ",
                    "   aaaaaa   ",
                    "     aa     ",
                ]
            },
            {
                color: "#D30", // vermell
                totxos:[
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