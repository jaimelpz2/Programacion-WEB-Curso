//xi, yi se usan para guardar las coordenadas del primer punto de la recta
var xi=0;
var yi=0;
//la recta se define por dos puntos, el punto inicial de la recta
//será la posición donde se haga clic por primera vez y el punto
//final estara definido por la ubicación del segundo clic
var primerPunto=true; //bandera para controlar los clics

function ponerPixel(contexto, x,y, color){
contexto.fillStyle = color;
contexto.fillRect(x, y, 3, 3);
}

//Para pintar una recta esta función deberá ser ejecutada dos veces
//la primera vez captura las coordenadas del punto incial de la recta
// y lo grafica sobre el lienzo. La segunda vez toma las coordenadas
//del segundo punto y pinta la línea llamando a la función lineaBresenham.
function dibujar(event){ //Esta función se ejecuta cada que se hace clic sobre el lienzo
var form = document.getElementById("f");
var c=form.elements["c"].value;
var canvas = document.getElementById("lienzo"); //accedemos al lienzo de dibujo
var contexto = canvas.getContext("2d");

if(primerPunto){ //Si es el primer clic, se lee el primer punto de la línea
xi=event.offsetX; //Guardamos la abscisa 150
yi=event.offsetY; //guardamos la ordenada 150
ponerPixel(contexto, xi, yi, c); 
contexto.fillText( "(" + xi + "," + yi + ")", xi+5, yi+20);//obtenemos el contexto 2d del lienzo
primerPunto =! primerPunto;
}else //Si e el segundo clic, pintamos la línea con los valores xi, yi
//y la posición del último clic del ratón (event.offsetX, event.offsetY)
lineaBresenham(xi, yi, event.offsetX, event.offsetY, contexto,c);
xi=event.offsetX; //Guardamos la abscisa 150
yi=event.offsetY; //guardamos la ordenada 150
ponerPixel(contexto, xi, yi, c); 
contexto.fillText( "(" + xi + "," + yi + ")", xi+5, yi+20);//obtenemos el contexto 2d del lienzo
/*				inicial       final
lineaBresenham(150, 150, , event.offsetY, contexto,c);
*/


}
//Implementación del algoritmo de Bresenham para líneas
function lineaBresenham(x0, y0, x1, y1, contexto, color){

var dx = Math.abs(x1-x0);
var dy = Math.abs(y1-y0);
var sx = (x0 < x1) ? 1 : -1;
var sy = (y0 < y1) ? 1 : -1;
var err = dx-dy;
while(x0!=x1 || y0!=y1){
ponerPixel(contexto, x0, y0, color);

var e2 = 2*err;
if (e2 >-dy){ err -= dy; x0 += sx; }
if (e2 < dx){ err += dx; y0 += sy; }
}
}