// JavaScript Document


		var canvas2 = document.getElementById("canvas2");
		var context = canvas2.getContext("2d");

		
		function previewImage(input){
			var reader = new FileReader();
			reader.onload = function (e){
				document.getElementById("preview").setAttribute("src", e.target.result);
			};
			reader.readAsDataURL(input.files[0]);
		}
		
		function setImage(x, y){
			
			var image = document.getElementById("preview");
			if(!image.complete){
				setTimeout(function(){
					setImage(x, y);
				},50);
				return;
			}
			
			context.drawImage(image, x, y);
		}

function initi3() {
  //Setting up for normal moving
	showCanvas();
	setImage(0, 0);
	canvas2.addEventListener("touchstart", start_move);
	canvas2.addEventListener("touchend", stop_move);
	canvas2.addEventListener("touchmove", move);
 	canvas2.addEventListener("mousedown", start_move);
	canvas2.addEventListener("mouseup", stop_move);
	canvas2.addEventListener("mousemove", move);
	canvas2.addEventListener("pointerdown", start_move);
	canvas2.addEventListener("pointerup", stop_move);
	canvas2.addEventListener("pointermove", move);
}
var loc ={x:0 , y:0};
var movement = false;

function showCanvas() {
            canvas2.style.visibility = 'visible'; 
			canvas2.style.width = canv.style.width;
			canvas2.style.height = canv.style.height;
	//		canvas2.style.boxShadow = canv.style.boxShadow;
        }

async function locator(event) {
  if(event.touches){
    loc.x = event.touches[0].clientX - canvas2.offsetLeft;
    loc.y = event.touches[0].clientY - canvas2.offsetTop;
  }
  else{
   loc.x = event.clientX - canvas2.offsetLeft;
   loc.y = event.clientY - canvas2.offsetTop;
  }
}

async function start_move(event) {
  event.preventDefault();
  locator(event);
  movement = true;
}

async function stop_move(event) {
  movement = false;
}

async function move(event){
  if (!movement){return;}
  context.beginPath();
  context.moveTo(loc.x,loc.y);

  locator(event);
  var x = loc.x;
  var y = loc.y;
  clearpage();
  setImage(x, y);
}

function clearpage() {
  context.clearRect(0,0,canvas2.width,canvas2.height);
  context.fillStyle = document.getElementById("boardcolor").value;
//  context.fillRect(0, 0, canvas2.width, canvas2.height);
}