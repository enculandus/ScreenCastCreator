//All Drawing related Activities
//Defined constants
const canv = document.getElementById('canvas1') ;
const cntx = canv.getContext('2d');
const video = document.querySelector('#testv');
const toolbox = document.getElementById('toolbox');
const sidein = document.getElementById('sidepanelin');
const sideout = document.getElementById('sidepanelout');

document.onload=initi();

function initi() {
  resize();
  canv.addEventListener("touchstart", start_draw);
  canv.addEventListener("touchend", stop_draw);
  canv.addEventListener("touchmove", draw);
  canv.addEventListener("mousedown", start_draw);
  canv.addEventListener("mouseup", stop_draw);
  canv.addEventListener("mousemove", draw);
  canv.addEventListener("pointerdown", start_draw);
  canv.addEventListener("pointerup", stop_draw);
  canv.addEventListener("pointermove", draw);
  //window.addEventListener("resize", resize_info);
  document.getElementById("boardcolor").addEventListener("input", board_color);
  document.getElementById("strokecolor").addEventListener("input", stroke_properties);
  document.getElementById("strokewidth").addEventListener("input", stroke_properties);
  board_color();
  toggle_sidepanel();
  setup();
}

function setup() {
  document.getElementById('strokewidth').value = "10";
  document.getElementById('strokecolor').value = "#ffffff";
  document.getElementById("boardcolor").value = "#1F6953";
  start_pencil();
}

function board_color() {
  //changing background color of canvas
  canv.style.backgroundColor = document.getElementById("boardcolor").value;
  //filling the canvas with a color
  cntx.fillStyle=document.getElementById("boardcolor").value;
  cntx.fillRect(0, 0, canv.width, canv.height);
}

var full_screen=false;
function resize() {
    //saving original image
    var original=cntx.getImageData(0,0,canv.width,canv.height);
    //resizing the canvas
    canv.width = window.innerWidth-22;
    canv.height = window.innerHeight-22;
    //filling the canvas with a background color
    board_color();
    //placing the image back on to this canvas
    cntx.putImageData(original,0,0,0,0,canv.width,canv.height);
    if(full_screen){document.body.requestFullscreen();}
}

function resize_info() {
  if(confirm("Resizing can lead to loss of data and quality of your image.Do you want to resize?")) {
    resize();
  }
}

async function toggle_sidepanel() {
    if (toolbox.style.width=='0px') {
      toolbox.style.visibility='visible';
      toolbox.style.width='250px';
      sidein.style.visibility='hidden';
    }
    else  {
      toolbox.style.visibility='hidden';
      toolbox.style.width='0px';
      sidein.style.visibility='visible';
    }
    toolbox.height=canv.height;
}

var loc ={x:0 , y:0};
var controlPoint = {x:0 ,y:0};   //for quadratic curve

function locator(event) {
  if(event.touches){
    loc.x = event.touches[0].clientX - canv.offsetLeft;
    loc.y = event.touches[0].clientY - canv.offsetTop;
  }
  else{
   loc.x = event.clientX - canv.offsetLeft;
   loc.y = event.clientY - canv.offsetTop;
  }
}

//drawing functions
var strok = false;
async function start_draw(event) {
  event.preventDefault();
  locator(event);
  stroke_properties();
  strok =true;
}

async function stop_draw(event) {
  strok=false;
}

async function stroke_properties() {
  cntx.lineCap = 'round';
  cntx.lineWidth = document.getElementById('strokewidth').value;
  cntx.strokeStyle = document.getElementById('strokecolor').value;
  cntx.lineJoin = 'round';
}

async function draw(event) {
  if (!strok){return;}
  cntx.beginPath();
  cntx.moveTo(loc.x,loc.y);
  locator(event);
  //controlPoint.x=loc.x;
  //controlPoint.y=loc.y;
  //document.getElementById('toolscontainer').innerHTML = "X:" + loc.x +"   Y:" + loc.y ; //for testing
  //locator(event);
  //cntx.quadraticCurveTo(controlPoint.x, controlPoint.y, loc.x, loc.y);
  cntx.lineTo(loc.x,loc.y);
  cntx.stroke();
  //cntx.closePath();
}

function clear_page() {
  cntx.clearRect(0,0,canv.width,canv.height);
  cntx.fillStyle=document.getElementById("boardcolor").value;
  cntx.fillRect(0, 0, canv.width, canv.height);
}

//Toggle to eraser
var ostrokewidth, ostrokecolor;
function start_eraser() {
  //changing strokewidth to 30
  if(document.getElementById('pencil').style.color == "white"){
    ostrokewidth = document.getElementById('strokewidth').value;
    document.getElementById('strokewidth').value = 30;
    //storing previous strokecolor and changing it to background color
    ostrokecolor = document.getElementById('strokecolor').value;
    document.getElementById('strokecolor').value = document.getElementById("boardcolor").value;
  }
  //changing button properties
  document.getElementById('eraser').style.color = "white";
  document.getElementById('eraser').style.backgroundColor = "black";
  document.getElementById('pencil').style.color = "black";
  document.getElementById('pencil').style.backgroundColor = "white";
}

//Toggle to pencil
function start_pencil() {
  if(document.getElementById('eraser').style.backgroundColor == "black"){
    //changing strokewidth back to original
    document.getElementById('strokewidth').value = ostrokewidth;
    //schanging it to background color
    document.getElementById('strokecolor').value = ostrokecolor;
  }
  //changing button properties
  document.getElementById('eraser').style.color = "black";
  document.getElementById('eraser').style.backgroundColor = "white";
  document.getElementById('pencil').style.color = "white";
  document.getElementById('pencil').style.backgroundColor = "black";
}


//loadscript function !!!!important for better page rendering!!!!
async function loadscript(url, location, notifier_id){
    //url is URL of external file, implementationCode is the code
    //to be called from the file, location is the location to
    //insert the <script> element
    document.getElementById(notifier_id).style.height='20px';
    document.getElementById(notifier_id).innerHTML="Loading Script.....";

    var scriptTag = document.createElement('script');
    scriptTag.src = url;

    //scriptTag.onload = implementationCode;
    //scriptTag.onreadystatechange = implementationCode;

    location.appendChild(scriptTag);

    document.getElementById(notifier_id).innerHTML="";
    document.getElementById(notifier_id).style.height='0px';
}
