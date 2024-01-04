var color="#000000";
var canvas;
var contexto;

var puntos = []; //arreglo de puntos para guardar las coordenadas de los puntos


//la recta se define por dos puntos, el punto inicial de la recta
//será la posición donde se haga clic por primera vez y el punto
//final estara definido por la ubicación del segundo clic
var primerPunto=true;  //bandera para controlar los clics

function ponerPixel(contexto, x,y, color){
  contexto.fillStyle = color;
  contexto.fillRect(x, y, 5, 5);
} 


function dibujar(event){  //Esta función se ejecuta cada que se hace clic sobre el lienzo

  var form = document.getElementById("formulario");
  var DX= parseInt(form.elements["Dx"].value);
  var DY = parseInt(form.elements["Dy"].value);
  
  canvas = document.getElementById("lienzo"); //accedemos al lienzo de dibujo
  contexto = canvas.getContext("2d"); //obtenemos el contexto 2d del lienzo

  if(primerPunto){  //Si es el primer clic, se lee el primer punto de la línea
    puntos.push({x:event.offsetX, y:event.offsetY});
    ponerPixel(contexto, puntos[puntos.length-1].x, puntos[puntos.length-1].y, color);
    primerPunto = false;
  }
  else{  //pintar línea
    lineaBresenham(puntos[puntos.length-1].x, puntos[puntos.length-1].y, event.offsetX, event.offsetY, contexto, color);
    puntos.push({x:event.offsetX, y:event.offsetY});

  }
  
}

//Implementación del algoritmo de Bresenham para líneas
function lineaBresenham(x0, y0, x1, y1, contexto, color){
  var dx = Math.abs(x1-x0);
  var dy = Math.abs(y1-y0);
  var sx = (x0 < x1) ? 1 : -1;
  var sy = (y0 < y1) ? 1 : -1;
  var err = dx-dy;

   contexto.fillText( "(" + x1 + "," + y1 + ")", x1+5, y1+20);//nos dice las coordenadas de los puntos

   while(x0!=x1 || y0!=y1){
     ponerPixel(contexto, x0, y0, color);
     var e2 = 2*err;
     if (e2 >-dy){ err -= dy; x0  += sx; }
     if (e2 < dx){ err += dx; y0  += sy; }
   }
 }


 function repintar(){
   contexto.clearRect(0, 0, canvas.width, canvas.height);
   for(var i = 1; i < puntos.length; i++) {
     lineaBresenham(puntos[i-1].x, puntos[i-1].y, puntos[i].x, puntos[i].y, contexto, color);
   }

 }

 function cambiarColor(){ 
  color = document.getElementById("color").value; //obtenemos el color para pintar
  repintar();
}

function reiniciar(){ 
  puntos = [];
  repintar();
  document.getElementById("Dx").value="";
  document.getElementById("Dy").value="";
  primerPunto=true;
}

function verArreglo(){
  var info = "";

  for(var i = 0; i < puntos.length; i++){ 
    info  += "punto "+i+": ("+puntos[i].x+","+puntos[i].y+")"+"\n";
    
    alert(info); 
  }


}

function trasladar(){
  var form = document.getElementById("formulario");
  var DX= parseInt(form.elements["Dx"].value);
  var DY = parseInt(form.elements["Dy"].value);


  //contexto.clearRect(0, 0, canvas.width, canvas.height);
  for(var i = 1; i < puntos.length; i++) {
    lineaBresenham(puntos[i-1].x+DX, puntos[i-1].y+DY, puntos[i].x+DX, puntos[i].y+DY, contexto, color);
  }

}

function Escalar(){
  var form = document.getElementById("formulario");
  var SX= parseInt(form.elements["Sx"].value);
  var SY = parseInt(form.elements["Sy"].value);

  for(var i = 1; i < puntos.length; i++) {
    lineaBresenham(puntos[i-1].x*SX, puntos[i-1].y*SY, puntos[i].x*SX, puntos[i].y*SY, contexto, color);
  }

}

function Rotar(){

  var form = document.getElementById("formulario");
  var Grados = parseInt(form.elements["Grados"].value);
  var conversionRTG = Math.cos(Grados* Math.PI/180);
  var conversionRTG2 =Math.sin(Grados* Math.PI/180);
  //var origen=0,origen2=0,final,final2;
  var num1 =0,num2=0,m=0;
  var k=0;
  var nuevo = [],constante=[],resultado =[],cambio=[],final2=[],final2y=[],tabla=[];
  var info2 = "",info="",info3="",info4="",info5="";
  
  var multiplicar =[
  [conversionRTG,-conversionRTG2,0],
  [conversionRTG2, conversionRTG,0],
  [0,0,1]

  ];
  var multiplicar2 = [
  [0,0,0,0],
  [0,0,0,0],
  [0,0,0,0]
  ];

  var multiplicacion = [
  [0,0,0,0],
  [0,0,0,0],
  [0,0,0,0]
  ];

  var final = [
  [0,0,0,0],
  [0,0,0,0],
  [0,0,0,0]
  ];
  var rotador = [];

  
// convirtiendo del arreglo que tenemos dividido 2 (puntos) asignamos cada division a 1 arreglo para despues
// concatenarlo a otro, esto para que ya el vector sin ninguna division pueda ser convertido a matriz
// y proceder hacer la multiplicacion de matrices 

for (var i = 0; i < puntos.length; i++) {
  num1 = puntos[i].x;
  num2= puntos[i].y;
   nuevo.push(num1); // este tiene 1,2,3,4,5,6 por lo que este contendra X (puntos.x)
   rotador.push(num2); // este 3,6,9,12,15 por ejemplo  por lo que este contendra Y (puntos.Y)
   constante.push(1); // este se lo agregamos para que pueda hacer la multiplicacion de matrices
   resultado=nuevo.concat(rotador,constante); // nos da entonces 1,2,3,4,5,6,3,6,9,12,15,1,1,1,1,1,1
 // info2  += "\nResultado "+i+": ("+nuevo[i]+","+rotador[i]+","+constante[i]+")"+"\n";
 // info2  += "\nTodoConcatenado "+i+": ("+resultado[i]+")"+"\n";
 // alert(info2);
}


/*
// chequeo del arreglo y de que esta arriba que funcione o de bien
for (var i = 0; i < resultado.length; i++) {
    info2  += "\nTodoConcatenado "+i+": ("+resultado[i]+")"+"\n";
  alert(info2);
}
*/

// convirtiendo el vector en matriz

for (var i = 0; i < multiplicar2.length; i++) {
    //multiplicar2[i][j]=0.0; esto es solo para inicializar por que como no tiene valores no quiere jalar aveces
  for (var j = 0; j <multiplicar2[0].length ; j++) {//columas se supone que debe de ser multiplicar[i].length pero esto solo nos imprime 4 resultados de 12
    // podemos mantener el multiplicar[i] pero tiene que tener valores, sea incluso un 0 o 1, solo asi detecta las 4 columnas
    multiplicar2[i][j]=resultado[k];
    k++;
    info2  += "["+multiplicar2[i][j]+"]";

    
  }
  //m=multiplicar2[i].length;
 // alert(info2+"   M es:  "+m); comprobar columnas
//  alert(info2);
}


// multiplicacion de las matrices
for (x=0; x < multiplicar.length; x++) {
  for (y=0; y < multiplicar2[0].length; y++) {                                
    for (z=0; z<multiplicar[0].length; z++) {
      multiplicacion [x][y] +=multiplicar[x][z]*multiplicar2[z][y]; 

    }
    info3  += "["+multiplicacion[x][y]+"]";
  }
  info  += "["+multiplicar[x]+"]";

}


// estos for aninados los creamos para eliminar la fila de [1 ] que quedaron en la multiplicacion 
// y tener solamente las x y y para graficar
//constante++; // para iterar el vector
for(var i = 0; i < multiplicacion.length-1; i++) {
  for (var j = 0; j < multiplicacion[i].length; j++) {
    // lineaBresenham(puntos[i-1].x*SX, puntos[i-1].y*SY, puntos[i].x*SX, puntos[i].y*SY, contexto, color);
    //ponerPixel(contexto, multiplicacion[i][j], multiplicacion[i][j], "#ff0000");
    final [i][j] = Math.abs(multiplicacion[i][j]);
  // lineaBresenham(final[i-1][j-1], final[i-1][j-1], final[i][j], final[i][j], contexto, color);
  info4  +="\npuntos: i"+i+" j: "+j+ "["+final[i][j]+"]";
}

}

//convertir matriz a vector para dividirlo en 2, x Y y y poder pasarlo a bresenham
for (var i = 0; i < final.length-1; i++) {
  for (var j = 0; j < final[i].length; j++) {
    cambio[m]=final[i][j];
    m++;
    
  }

}


var a=0,b=0;
for (var i = 0; i < cambio.length-4; i++) {

  a=cambio[i];
  final2.push({xp:a});

}
for (var i = 4; i < cambio.length; i++) {

  b=cambio[i];
  final2y.push({xq:b});

}
var l=0,n=0;
for (var i = 0; i < final2.length; i++) {
  l=final2[i].xp;
  n=final2y[i].xq;
  tabla.push({xr:l,xt:n});
   // info5  +="\n i:"+i+"\t["+constante[i].xr+"],["+constante[i].xt+"]";
   info5  += "\npunto "+i+": ("+tabla[i].xr+","+tabla[i].xt+")"+"\n";
 }


 for (var i = 1; i <tabla.length; i++) {
                       //x0          //y0                  //x1           //y1
  //lineaBresenham(puntos[i-1].x, puntos[i-1].y, puntos[i].x, puntos[i].y, contexto, color);
        ponerPixel(contexto, tabla[i].xr, tabla[i].xt, "#ff0000");
       contexto.fillText( ""+i+"(" + tabla[i].xr + "," + tabla[i].xt + ")", tabla[i].xr+5, tabla[i].xt+15);//nos dice las coordenadas de los puntos

      //lineaBresenham(tabla[i-1].xr, tabla[i-1].xt, tabla[i].xr, tabla[i].xt, contexto, color);
      
     // info5  += "\npunto "+i+": ("+tabla[i].xr+")"+"\n";
    }


    alert("CosenoYSeno\n"+info+"\n\nMatrizConversionada\n"+info2+"\n\nResultadoDeMultiplicacion\n"+info3+"\n\nA Poner:"+info4);
    alert("\nArreglo Convertido:"+info5);


 } //-************ FIN FUNCION ************************


 /*
sacar el origen de la figura, el centro

   for(var i = 0; i < puntos.length; i++){ 
    var puntomedio= Math.abs(puntos[i].x+puntos[i+1].x)/2;
    var puntomedio2=Math.abs(puntos[i].y+puntos[i+1].y)/2;
    nuevo.push({X:puntomedio,Y:puntomedio2});
    info2  += "punto "+i+": ("+nuevo[i].X+","+nuevo[i].Y+")"+"\n";
    ponerPixel(contexto, nuevo[i].X, nuevo[i].Y, "#ff0000");

    origen+=nuevo[i].X;
    origen2+=nuevo[i].Y;
    final=origen/3;
    final2=origen2/3;
   
    
    if(i==2){
      ponerPixel(contexto, final, final2, "#0000ff");
    }
       
         // esto aun no se sabe como implementar pero puede servir para ajustar la rotacion
  alert(info2+origen); 
  
  }

  */


 /* // multiplicar por un vector o algo asi, luego puede servir

for (var i = 0; i < multiplicar.length; i++) {
  nuevo[i] =0.0;
  for (var j = 0; j <multiplicar[i].length; j++) {
     nuevo[i] += multiplicar[i][j] * puntos[j].x;
    info2  += "\nResultado "+i+": ("+nuevo[i]+" de, punto:"+puntos[i].x+", por:"+multiplicar[i]+")"+"\n";
    alert(info2);
 
  }
} 
*/

/* posible manera de graficar sin necesidad de convertirlo a vector, osea desde la pura matriz resultante pero no resulto 
// graficamos queda por checar
  for(var i = 1; i < final.length; i++) {
  for (var j = 1; j < final[i].length; j++) {
    // lineaBresenham(puntos[i-1].x*SX, puntos[i-1].y*SY, puntos[i].x*SX, puntos[i].y*SY, contexto, color);
    //ponerPixel(contexto, multiplicacion[i][j], multiplicacion[i][j], "#ff0000");
                   //x0          //y0         //x1           //y1
  // lineaBresenham(final[i-1][j-1], final[i][j-1], final[i][j], final[i][j], contexto, color);
                     ponerPixel(contexto, final[i-1][j-1], final[i][j-1], "#ff0000");
                   contexto.fillText( "(" + final[i-1][j-1] + "," + final[i][j-1] + ")", final[i-1][j-1]+40, final[i][j-1]+100);//nos dice las coordenadas de los puntos
     
  }
   
  }
  */