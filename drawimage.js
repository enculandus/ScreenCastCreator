// JavaScript Document


		var canvas2 = document.getElementById("canvas2");
		var context = canvas2.getContext("2d");
		var image = document.getElementById("preview");
		var filechooser  = document.getElementById("furl");


	async	function previewImage(input){
			// this function is to show preview of image
			tool_toggler();
			var files = event.target.files;
			var file = files[0];
			toggle_sidepanel();

		if(file.type !== '' && !file.type.match('image.*'))
        {
			alert("Select valid image file!");
			filechooser.value = "";
            return;
        }
			else{

			document.getElementById('image_input_menu').style.margin = "7.5% 0% 0% 15%";
			document.getElementById('image_input_menu').style.height = "70%";
			document.getElementById('image_input_menu').style.width = "70%";
			document.getElementById('image_input_menu').style.visibility = "visible";

			var reader = new FileReader();
			reader.onload = function (e){
				document.getElementById("preview").setAttribute("src", e.target.result);
			};
			reader.readAsDataURL(input.files[0]);
		 document.getElementById("input_image_width").addEventListener("input", resize_input_image ,{passive: true});
		 document.getElementById("input_image_height").addEventListener("input", resize_input_image ,{passive: true});
		}
	}

async function resize_input_image() {
	document.getElementById("preview").style.height = document.getElementById("input_image_height").value + "px";
	document.getElementById("preview").style.width = document.getElementById("input_image_width").value + "px";
}

	async	function imgavailable(){

			document.getElementById('image_input_menu').style.margin = "0px 0px 0px 0px";
			document.getElementById('image_input_menu').style.height = "0%";
			document.getElementById('image_input_menu').style.width = "0%";
			document.getElementById('image_input_menu').style.visibility = "hidden";
			document.getElementById('image_placement_box').style.visibility = "visible";
			document.getElementById('image_placement_box').style.height = "50px";
			document.getElementById('image_placement_box').style.width = "90px";
			document.getElementById('image_placement_box').style.margin = "20% 0% 0% 0%";

			if(filechooser.value != ""){
				initi3();
			}
			else{
				alert("First select Image to upload!");
			}

		}

async function setImage(x, y){

	//		var image = document.getElementById("preview");
			if(!image.complete){
				setTimeout(function(){
					setImage(x, y);
				},50);
				return;
			}
			if(canv.width>canv.height){
				context.font = "30px Arial";
				context.fillStyle = "white";
				context.fillText("Tip:Drag The image to its desired location", 86, canv.height-25);
			}
			context.drawImage(image, (x - (document.getElementById("input_image_width").value/2)), (y - (document.getElementById("input_image_height").value/2)), document.getElementById("input_image_width").value, document.getElementById("input_image_height").value);
		}

async function initi3() {
  //Setting up for normal moving
	showCanvas();
	setImage(document.getElementById("input_image_width").value/2, document.getElementById("input_image_height").value/2);
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

async function showCanvas() {
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

async function hideCanvas() {
	canvas2.style.visibility = 'hidden';
	canvas2.width = '0';
	canvas2.height = '0';
	if(audiostream){
		recorder.resumeRecording();
	}
	document.getElementById('image_placement_box').style.margin = "0px 0px 0px 0px";
	document.getElementById('image_placement_box').style.height = "0%";
	document.getElementById('image_placement_box').style.width = "0%";
	document.getElementById('image_placement_box').style.visibility = "hidden";
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

async function clearpage() {
  context.clearRect(0,0,canvas2.width,canvas2.height);
  //context.fillStyle = document.getElementById("boardcolor").value;
  //context.fillRect(0, 0, canvas2.width, canvas2.height);
}

async function saveimgdata(){
	if(filechooser.value != ""){
				copy();
			}
			else{
				alert("First select Image to upload!");
			}
			document.getElementById('image_placement_box').style.margin = "0px 0px 0px 0px";
			document.getElementById('image_placement_box').style.height = "0%";
			document.getElementById('image_placement_box').style.width = "0%";
			document.getElementById('image_placement_box').style.visibility = "hidden";
}

async function copy(){
	var imgdata = context.getImageData((loc.x-(document.getElementById("input_image_width").value/2)), (loc.y-(document.getElementById("input_image_height").value/2)), document.getElementById("input_image_width").value, document.getElementById("input_image_height").value);
	cntx.putImageData(imgdata, (loc.x-(document.getElementById("input_image_width").value/2)), (loc.y-(document.getElementById("input_image_height").value/2)));
	clearpage();
	hideCanvas();
	filechooser.value = "";

}
