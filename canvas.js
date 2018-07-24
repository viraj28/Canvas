// RESIZING THE CANVAS
var canvas = document.querySelector('canvas');

canvas.width = window.innerWidth;

canvas.height = window.innerHeight;



// CONTEXT
var c = canvas.getContext('2d');


// Line.

// c.beginPath();
// c.moveTo(50,300);
// c.lineTo(300,100);
// c.strokeStyle = 'Red';
// c.stroke();

//A rectangle.
// c.fillStyle = 'rgba(0,255,0,0.8)';
// c.fillRect(100,100,100,100);

//An Arc.
// c.beginPath();
// c.arc(300,300,30,0,Math.PI * 2,false);
// c.strokeStyle = 'blue';
// c.stroke();

// for (var i = 0; i < 100; i++){
// 	var x = Math.random() * window.innerWidth;
// 	var y = Math.random() * window.innerHeight;
	
// 	c.beginPath();
// 	c.arc(x,y,30,0,Math.PI * 2,false);
// 	c.strokeStyle = '#' + Math.floor(Math.random() * 16777215).toString(16);
// 	c.fillStyle = '#' + Math.floor(Math.random() * 16777215).toString(16);
// 	c.fill();
// 	c.stroke();

// }


//EVENT LISTENER FOR SCREEN RESIZE

window.addEventListener('resize',function(){
	canvas.width = window.innerWidth;

	canvas.height = window.innerHeight;

	init();
});

//EVENT LISTENER FOR MOUSE MOVEMENT CHECK
var mouse = {
	x : undefined,
	y : undefined
}
window.addEventListener('mousemove',
	function(event){
		mouse.x = event.x;
		mouse.y = event.y;
		console.log(mouse);
	});



var minRadius = 2;
var maxRadius = 40;

//Circle class
function Circle(x, y, dx ,dy, radius,colour){

	this.x = x;
	this.y = y;

	this.dx = dx;
	this.dy = dy;
	this.ogRadius = radius;
	this.radius = radius;
	this.colour = colour; 
	this.draw = function(){
		c.beginPath();
		c.arc(this.x,this.y,this.radius,0,Math.PI * 2,false);
		//c.strokeStyle = 'red';
		c.fillStyle = this.colour;
		c.fill();
		c.stroke();
	}

	this.update = function(){

		this.draw();

		if(this.x+this.radius > canvas.width || this.x-this.radius < 0){
			this.dx = -this.dx;
		}
		
		if(this.y+this.radius > canvas.height || this.y-this.radius < 0){
			this.dy = -this.dy;
		}

		this.x += this.dx;
		this.y += this.dy;

		//interactivity

		if(mouse.x - this.x < 50 && mouse.x - this.x > -50 
		  && mouse.y -this.y < 50 && mouse.y-this.y > -50){
			if(this.radius < maxRadius)
				this.radius += 1;
		}
		else{
			if (this.radius > this.ogRadius) 
				this.radius -= 1;
		}
	}
}


var circleArray = [];  /*ARRAY TO STORE ALL OBJECTS*/

var colorArray = [
	'#133046',
	'#15959F',
	'#F1E4B3',
	'#EC9770',
	'#C7402D'
];

function init(){

	circleArray = [];

	for(var i = 0; i < 800; i++ ){
	
		var radius = Math.floor(Math.random()*5 +2);
		var x = Math.random() * (innerWidth - radius * 2) + radius;
		var y = Math.random() * (innerHeight - radius*2) + radius;
		var dx = (Math.random() - 0.5) ;
		var dy = (Math.random() - 0.5) ;
		
		//var colour = '#' + Math.floor(Math.random() * 16777215).toString(16);
		var colour = colorArray[Math.floor(Math.random() * colorArray.length )];
		circleArray.push(new Circle(x,y,dx,dy,radius,colour));
	}	 
}



	 
	function animate(){
		
		requestAnimationFrame(animate);
		c.clearRect(0,0,innerWidth,innerHeight);
		
		
		for (var i = 0; i < circleArray.length; i++) {
			circleArray[i].update();
		}
		

		
	}

	init();
	animate();
