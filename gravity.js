//RESIZING THE CANVAS.
var canvas = document.querySelector('canvas');

canvas.width = window.innerWidth;

canvas.height = window.innerHeight;

//GET THE CONTEXT

var c = canvas.getContext('2d');


//EVENT LISTENER FOR SCREEN RESIZE

window.addEventListener('resize',function(){
	canvas.width = window.innerWidth;

	canvas.height = window.innerHeight;

	init();
});

//Variables

var mouse = {
	x : innerWidth / 2,
	y : innerHeight / 2
};

var colors = [
	'#133046',
	'#15959F',
	'#F1E4B3',
	'#EC9770',
	'#C7402D'
];

var gravity = 1;
var friction = 0.99;

//Utility Functions
function randomIntfromRange(min,max){
	return Math.floor(Math.random() * (max - min + 1) + min);
}

function randomColor(colors){
	return colors[Math.floor(Math.random() * colors.length)];
}

//Objects
function Ball(x, y, dy, radius, color){

	this.x = x;
	this.y = y;
	this.dy = dy
	this.radius = radius;
	this.color = color;

	this.update = function() {
		if(this.y + this.radius  > canvas.height ){
			this.dy = -this.dy * friction;
		}
		else{
			this.dy += gravity;
			console.log(this.dy);
		}
		this.y += this.dy;
		this.draw();
	};

	this.draw = function(){
		c.beginPath();
		c.arc(this.x, this.y, this.radius, 0, Math.PI * 2, false);
		c.fillStyle = this.color;
		c.fill();
		c.stroke();
		c.closePath();

	};

}

//Implementation
var ball;
var ballArray =[];
function init(){
	var radius = 30;
	for(var i =0;i<10;i++){
		
		var x = randomIntfromRange(0,canvas.width);
		var y = randomIntfromRange(0,canvas.height-radius);
		ballArray.push(new Ball(x,y,2,radius,'red'));
	}
	console.log(ballArray);
	 ball = new Ball(canvas.width / 2, canvas.height/2, 2,30,'red');
	
	console.log(ball);
}

//Animation Loop
function animate(){
	requestAnimationFrame(animate);

	

	c.clearRect(0, 0, canvas.width, canvas.height);
	//ball.update();
	for (var i = 0; i < ballArray.length; i++) {
		ballArray[i].update();
	}
}

init();
animate();