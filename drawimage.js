// JavaScript Document


		var canvas2 = document.getElementById("canvas2");
		var context = canvas2.getContext("2d");
		var image = document.getElementById("preview");

		var filechooser  = document.getElementById("furl");


		function previewImage(input){
			// this function is to show preview of image
			var files = event.target.files;
			var file = files[0];

			if(file.type !== '' && !file.type.match('image.*'))
        {
			alert("Select valid image file!")
            return;
        }
			else{

			var reader = new FileReader();
			reader.onload = function (e){
				document.getElementById("preview").style.height = '100px';
				document.getElementById("preview").style.width = '90%';
				document.getElementById("preview").setAttribute("src", e.target.result);
			};
			reader.readAsDataURL(input.files[0]);
		 }
		}

		function imgavailable(){

			if(filechooser.value != ""){
				initi3();
			}
			else{
				alert("First select Image to upload!");
			}

		}

		function setImage(x, y){

	//		var image = document.getElementById("preview");
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
//var loca ={x:0 , y:0};
var movement = false;

function showCanvas() {
				if(audiostream){
					recorder.pauseRecording();
				}
            canvas2.style.visibility = 'visible';
	//		canv.style.visibility = 'hidden';
	//		canvas2.style.width = canv.style.width;
	//		canvas2.style.height = canv.style.height;

			canvas2.width = window.innerWidth-20;
			canvas2.height = window.innerHeight-20;
			canvas2.style.boxShadow = canv.style.boxShadow;

        }

function hideCanvas() {
	canvas2.style.visibility = 'hidden';
	canvas2.width = '0';
	canvas2.height = '0';
	if(audiostream){
		recorder.resumeRecording();
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
  context.fillRect(0, 0, canvas2.width, canvas2.height);
}

function saveimgdata(){
	if(filechooser.value != ""){
				copy();
			}
			else{
				alert("First select Image to upload!");
			}
}

function copy(){
	var imgdata = context.getImageData(loc.x, loc.y, image.width, image.height);
	cntx.putImageData(imgdata, loc.x, loc.y);
	clearpage();
	hideCanvas();

}
