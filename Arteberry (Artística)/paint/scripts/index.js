// fonction pour créer un element html avec des attributs
function creatHTMLelement(name, attributes) {
    var node = document.createElement(name);
    if (attributes) {
      for (var attr in attributes)
        if (attributes.hasOwnProperty(attr))
          node.setAttribute(attr, attributes[attr]);
    }
    return node;
}
 
var canvas;
var paintDiv = document.getElementById('dessin');

// hight et width de conteneur du canvas
var width_div = paintDiv.offsetWidth;
var height_div = paintDiv.offsetHeight;

// margin left & top du conteneur du canvas
var left = paintDiv.offsetLeft;
var off_top = paintDiv.offsetTop;

// créeer le canvas dans le conteneur comme fils 
canvas= creatHTMLelement('canvas', {id : "mycanvas",width: width_div, height: height_div});
paintDiv.appendChild(canvas);
var ctx = canvas.getContext('2d');
ctx.fillStyle = "white";
ctx.fillRect(0,0,canvas.width,canvas.height);

// changer la couleur du dessin
var colors ='black';
var colorPick = document.getElementById("colorPick");
var picker = document.getElementById("picker");
picker.addEventListener('click', function(event) {
    colors = colorPick.value;
    }); 
picker.addEventListener('touchstart', function(event) {
    colors = colorPick.value;
    }); 
var epaisseur =2 ;
function ChangelineWidth(taille){
    epaisseur = taille;
    dessiner();
    }
// gomme    
function effacer(){
   colors="white";
    }
function resetOutil(attr){
    if(attr==true){   
       canvas.removeEventListener('mousedown', rectMouseDown);
		canvas.removeEventListener('mouseup', rectMouseUp);
		canvas.removeEventListener('mousemove', rectMouseMove);
		canvas.removeEventListener('mouseout', rectMouseout);
    }
    if(attr==false){   
        canvas.removeEventListener('mousedown', linesMousedown, false);
        canvas.removeEventListener('mousemove', linesMousemove, false);
        canvas.removeEventListener('mouseup', linesMouseup, false);
        canvas.removeEventListener('mouseout', linesMouseout, false);
    }
}


//Dessin avec crayans et pinceaux
dessiner(); // par defaut
var otherTools = false;
function dessiner(){
  var mouse = { x: 0, y: 0};
	if (otherTools == true) {
        resetOutil(true);
	};
    
    paint = function() {
        ctx.lineTo(mouse.x, mouse.y);
        ctx.lineWidth = epaisseur;
        ctx.lineJoin = 'round';
        ctx.strokeStyle = colors;
        ctx.stroke();
        
    };
    
    //coordonnées de la souris relatives au canvas 
    linesMousemove = function(e){
        mouse.x = e.pageX - left - this.offsetLeft;
        mouse.y = e.pageY - off_top - this.offsetTop;
        
    };
    
    linesMousedown = function(){
        
        ctx.beginPath();
        saveState(canvas);
        ctx.moveTo(mouse.x, mouse.y);
        canvas.addEventListener('mousemove', paint, false);
    };

    linesMouseup = function(){
        canvas.removeEventListener('mousemove', paint, false);
    };

    linesMouseout = function() {
        canvas.removeEventListener('mousemove', paint, false);
    };

    canvas.addEventListener('mousedown', linesMousedown, false);
    canvas.addEventListener('mousemove', linesMousemove, false);
    canvas.addEventListener('mouseup', linesMouseup, false);
    canvas.addEventListener('mouseout', linesMouseout, false);
}


function rectangle() {
   otherTools = true;
	resetOutil(false);
	var mouse = {x: 0, y: 0};

	draw = function() {
		ctx.fillStyle = colors;
		ctx.fillRect(mouse.x, mouse.y, mouse.w, mouse.h);
	};

	rectMouseMove = function(e) {
	    mouse.w = ( e.pageX - left - this.offsetLeft) - mouse.x;
	    mouse.h = (e.pageY - off_top- this.offsetTop) - mouse.y ;
	};

	rectMouseDown = function(e) {
		ctx.beginPath();
		mouse.x = e.pageX  - left - this.offsetLeft;
		mouse.y = e.pageY -off_top- this.offsetTop;
		canvas.addEventListener('mousemove', draw, false);		  
	};

	rectMouseUp = function() {
		canvas.removeEventListener('mousemove', draw, false);
	};

	rectMouseout = function() {
		canvas.removeEventListener('mousemove', draw, false);
	};

	canvas.addEventListener('mousedown', rectMouseDown, false);
	canvas.addEventListener('mouseup', rectMouseUp, false);
	canvas.addEventListener('mousemove', rectMouseMove, false);
	canvas.addEventListener('mouseout', rectMouseout, false);
}
function cercle() {
  otherTools = true;
	resetOutil(false);
	var mouse = {x: 0, y: 0};

	draw = function() {
    ctx.fillStyle = colors;
    ctx.beginPath();
    ctx.arc(mouse.x, mouse.y, Math.abs(mouse.w), 0, 2 * Math.PI);
    ctx.fill();
	};

	rectMouseMove = function(e) {
	    mouse.w = ( e.pageX - left - this.offsetLeft) - mouse.x;
	    mouse.h = (e.pageY - off_top- this.offsetTop) - mouse.y ;
	};

	rectMouseDown = function(e) {
		ctx.beginPath();
		mouse.x = e.pageX  - left - this.offsetLeft;
		mouse.y = e.pageY -off_top- this.offsetTop;
		canvas.addEventListener('mousemove', draw, false);		  
	};

	rectMouseUp = function() {
		canvas.removeEventListener('mousemove', draw, false);
	};

	rectMouseout = function() {
		canvas.removeEventListener('mousemove', draw, false);
	};

	canvas.addEventListener('mousedown', rectMouseDown, false);
	canvas.addEventListener('mouseup', rectMouseUp, false);
	canvas.addEventListener('mousemove', rectMouseMove, false);
	canvas.addEventListener('mouseout', rectMouseout, false);
}
 
 
