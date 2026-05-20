/*
* CLASSE PALA
*/

class Pala {
    constructor(puntPosicio, amplada, alcada){      
        this.amplada = amplada;
        this.alcada = alcada;
        this.posicio = puntPosicio;
        this.radius = 20;
        this.vy = 5;     
        this.vx = 5;                                                     // velocitat = 10 píxels per fotograma
        this.color = "#D30"; 
    }

    update(){
       
    }

    draw(ctx) {
        ctx.save();
        ctx.fillStyle = this.color;

        ctx.beginPath();
        ctx.roundRect(
            this.posicio.x,
            this.posicio.y,
            this.amplada,
            this.alcada,
            this.radius
        );
        ctx.fill();
        ctx.restore();
        
    }
    mou(x,y){
        this.posicio.x += x * this.vx;
        this.posicio.y += y * this.vy;
    }
}