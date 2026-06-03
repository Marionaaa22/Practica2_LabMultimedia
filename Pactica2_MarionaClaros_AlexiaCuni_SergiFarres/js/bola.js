class Bola {
    constructor(puntPosicio, radi) {
        this.radi = radi;
        this.posicio = puntPosicio;
        this.vx = 1;
        this.vy = -1;
        this.color = "white";
        this.audioMur = new Audio("./so/romperMuro.mp3");
        this.soPala = new Audio("./so/soPala.mp3");
        this.soVides = new Audio("./so/so_perdvides.mp3");
        this.enMoviment = true;

    };

    draw(ctx) {
        ctx.beginPath();
        ctx.fillStyle = this.color;
        ctx.arc(this.posicio.x, this.posicio.y, this.radi, 0, 2 * Math.PI);
        ctx.fill();
        ctx.closePath();
    }
    mou(x, y) {
        this.posicio.x += x;
        this.posicio.y += y;
    }

    update() {

        if (!this.enMoviment) return;

        let puntActual = this.posicio;
        let puntSeguent = new Punt(this.posicio.x + this.vx,
            this.posicio.y + this.vy);
        let trajectoria = new Segment(puntActual, puntSeguent);
        let exces;
        let xoc = false;
        let ampleCanvas = 300;
        let alturaCanvas = 150;
        let pala = joc.pala;

        // Xoc amb els laterals del canvas

        // Xoc lateral superior
        if (trajectoria.puntB.y - this.radi < 0) {

            exces = (trajectoria.puntB.y - this.radi) / this.vy;

            this.posicio.x = trajectoria.puntB.x - exces * this.vx;
            this.posicio.y = this.radi;

            xoc = true;

            this.vy = -this.vy;
        }


        // Xoc lateral dret
        if (trajectoria.puntB.x + this.radi > ampleCanvas) {

            exces = (trajectoria.puntB.x + this.radi - ampleCanvas) / this.vx;

            this.posicio.x = ampleCanvas - this.radi;
            this.posicio.y = trajectoria.puntB.y - exces * this.vy;

            xoc = true;

            this.vx = -this.vx;
        }


        // Xoc lateral esquerra
        if (trajectoria.puntB.x - this.radi < 0) {

            exces = (trajectoria.puntB.x - this.radi) / this.vx;

            this.posicio.x = this.radi;
            this.posicio.y = trajectoria.puntB.y - exces * this.vy;

            xoc = true;

            this.vx = -this.vx;
        }


        // Xoc lateral inferior
        if (trajectoria.puntB.y + this.radi > alturaCanvas) {

            joc.vides--;

            this.soVides.play();
            $("#videsJugador").text(joc.vides);

            this.posicio.x = joc.canvas.width / 2;
            this.posicio.y = joc.canvas.height / 2;

            this.vx = 0;
            this.vy = 0;

            setTimeout(() => {

                this.vx = 1;
                this.vy = 1;

            }, 1000);

            if (joc.vides <= 0) {

                joc.jocActiu = false;

                $("#nomJugadorFinal").text($("#nomJugador").text());
                $("#tempsFinal").text($("#temps").text());
                $("#puntsFinal").text(joc.punts);
                $("#modalGameOver").css("display", "flex");

                joc.vides = 3;
                joc.punts = 0;

                $("#videsJugador").text(joc.vides);
                $("#punts").text(joc.punts);
                $("#modalGameOver").css("display", "flex");
                joc.jocActiu = false;

                // Reiniciar muro
                for (let t of joc.totxo.totxos) {
                    t.tocat = false;
                }
            }

            return;
        }

        //Xoc amb la pala

        if (
            this.posicio.y + this.radi >= pala.posicio.y &&
            this.posicio.x >= pala.posicio.x &&
            this.posicio.x <= pala.posicio.x + pala.amplada
        ) {
            let centroPala = pala.posicio.x + pala.amplada / 2;
            let distancia = this.posicio.x - centroPala;
            let normalizado = distancia / (pala.amplada / 2);

            this.vx = normalizado * 2;
            this.vy = -Math.abs(this.vy);

            this.posicio.y = pala.posicio.y - this.radi;

            this.soPala.currentTime = 0;
            this.soPala.play();
        }


        //Xoc amb els totxos del mur
        //Utilitzem el mètode INTERSECCIOSEGMENTRECTANGLE
        if (!xoc && joc && joc.totxo && joc.totxo.totxos) {
    let llistaTotxos = joc.totxo.totxos;

    for (let i = 0; i < llistaTotxos.length; i++) {
        let t = llistaTotxos[i];

        if (t.tocat) continue;

        if (t.puntInteriorRectangle(puntSeguent)) {
            t.tocat = true; // Rompemos el bloque
            xoc = true;

           
            let centroTotxoX = t.posicio.x + t.amplada / 2;
            let centroTotxoY = t.posicio.y + t.alcada / 2;

            
            let distanciaX = this.posicio.x - centroTotxoX;
            let distanciaY = this.posicio.y - centroTotxoY;

         
            let overlapX = Math.abs(distanciaX) / (t.amplada / 2);
            let overlapY = Math.abs(distanciaY) / (t.alcada / 2);

            if (overlapX > overlapY) {
          
                this.vx = -this.vx;
                
               
                if (distanciaX > 0) {
                    this.posicio.x = t.posicio.x + t.amplada + this.radi; // Lado derecho
                } else {
                    this.posicio.x = t.posicio.x - this.radi; // Lado izquierdo
                }
            } else {
               
                this.vy = -this.vy;
                
              
                if (distanciaY > 0) {
                    this.posicio.y = t.posicio.y + t.alcada + this.radi; // Lado inferior
                } else {
                    this.posicio.y = t.posicio.y - this.radi; // Lado superior
                }
            }   
            
            break; 
        }
    }
}


        if (!xoc) {
            this.posicio.x = trajectoria.puntB.x;
            this.posicio.y = trajectoria.puntB.y;
        }

    }

    interseccioSegmentRectangle(segment, rectangle) {


        let puntI;
        let distanciaI;
        let puntIMin;
        let distanciaIMin = Infinity;
        let voraI;

       
        let segmentVoraSuperior = new Segment(rectangle.posicio,
            new Punt(rectangle.posicio.x + rectangle.amplada, rectangle.posicio.y));
    

     
        puntI = segment.puntInterseccio(segmentVoraSuperior);
        if (puntI) {
           
            distanciaI = Punt.distanciaDosPunts(segment.puntA, puntI);
            if (distanciaI < distanciaIMin) {
                distanciaIMin = distanciaI;
                puntIMin = puntI;
                voraI = "superior";
            }
        }
        

        if (voraI) {
            return { pI: puntIMin, vora: voraI };
        }
    }
    distancia = function (p1, p2) {
        return Math.sqrt((p2.x - p1.x) * (p2.x - p1.x) + (p2.y - p1.y) * (p2.y - p1.y));
    }
}

