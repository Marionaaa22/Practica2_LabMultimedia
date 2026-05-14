/*
* CLASSE JOC
*/

class Joc{
    constructor(canvas,ctx) {
        this.canvas = canvas;
        this.ctx = ctx;
        this.amplada = canvas.width;
        this.alcada = canvas.height;
        this.totxoamplada = 22;
        this.totxoalcada = 10; // MIDES DEL TOTXO EN PÍXELS
        this.totxocolor = 20;
       

        this.bola = new Bola(new Punt(this.canvas.width/2,this.canvas.height/2),3);
        this.pala = new Pala(new Punt((this.canvas.width-60)/2,this.canvas.height-15),60,4);
        this.totxo = new Totxo(new Punt((this.canvas.width-120)/2,(this.canvas.height-20)/3), 120, 20, "#0ad");  // només posem un totxo gegant

        this.key = {
            LEFT:{code:37, pressed:false},
            RIGHT:{code:39, pressed:false}
        };      
    }

    draw(){
        this.clearCanvas();
        this.pala.draw(this.ctx);
        this.bola.draw(this.ctx);
        this.totxo.draw(this.ctx);


    }
    clearCanvas(){
        this.ctx.clearRect(0,0,this.canvas.width, this.canvas.height)
    }

    inicialitza(){
        this.pala.draw(this.ctx);
        this.bola.draw(this.ctx);
        this.totxo.draw(this.ctx);
        
        $(document).on("keydown",{joc:this}, function(e){
           //Moviment de la pala
           switch (e.keyCode) {
            case 37:    //left arrow key
                if(e.data.joc.pala.posicio.x > 0){
                    e.data.joc.pala.mou(-1, 0);
                }
                break;
            case 39:    //right arrow key
                if(e.data.joc.pala.posicio.x < e.data.joc.canvas.width - e.data.joc.pala.amplada){
                    e.data.joc.pala.mou(1, 0);
                }
                break;
        }
            
        });

        
    }

    update(){
        this.bola.update();
        this.pala.update();
        this.draw();       

    }
}