//All Drawing related Activities
//Defined constants
const canv = document.getElementById('canvas1') ;
const cntx = canv.getContext('2d');
const video = document.querySelector('#testv');
const toolbox = document.getElementById('toolbox');
const sidein = document.getElementById('sidepanelin');
const sideout = document.getElementById('sidepanelout');
var undo_arr = [];

document.onload=initi();

function initi() {
  resize();
  //Setting up for normal drawing
  drawing_setup();
  //window.addEventListener("resize", resize_info);
  document.getElementById("boardcolor").addEventListener("input", board_color,{passive: true});
  document.getElementById("strokecolor").addEventListener("input", stroke_properties,{passive: true});
  document.getElementById("strokewidth").addEventListener("input", stroke_properties,{passive: true});
  setup();
}

function drawing_setup() {
  canv.addEventListener("touchstart", start_draw);
  canv.addEventListener("touchmove", draw);
  canv.addEventListener("touchend", stop_draw);
  canv.addEventListener("mousedown", start_draw);
  canv.addEventListener("mousemove", draw);
  canv.addEventListener("mouseup", stop_draw);
  canv.addEventListener("mouseup", auxillary_stop_draw);
  canv.addEventListener("mouseout", stop_draw);
  canv.addEventListener("pointerdown", start_draw);
  canv.addEventListener("pointermove", draw);
  canv.addEventListener("pointerup", stop_draw);
  canv.addEventListener("pointerup", auxillary_stop_draw);
  canv.addEventListener("pointerout", stop_draw);
}

function setup() {
  toolbox.style.height=(window.innerHeight-44)+'px';
  board_color();
  toggle_sidepanel();
  start_pencil();
  toggle_sidepanel();
  update_page_image();
  //startup_instructions();
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
    canv.width = window.innerWidth-20;
    canv.height = window.innerHeight-20;
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
  if (toolbox.style.visibility=='hidden') {
    toolbox.style.visibility='visible';
    sidein.style.visibility='hidden';
    for(var opac=0;opac<=1;opac+=0.1){
      toolbox.style.opacity=opac;
    }
  }
  else  {
    toolbox.style.visibility='hidden';
    sidein.style.visibility='visible';
    for(var opac=1;opac>=0;opac-=0.1){
      toolbox.style.opacity=opac;
    }
  }
}

//drawing pre-requisites
var loc ={x:0 , y:0};
var controlPoint = {x:0 , y:0};   //for quadratic curve

async function locator(event) {
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

async function stroke_properties() {
  cntx.lineCap = 'round';
  cntx.lineWidth = document.getElementById('strokewidth').value;
  cntx.strokeStyle = document.getElementById('strokecolor').value;
  cntx.lineJoin = 'round';
}

async function start_draw(event) {
  event.preventDefault();
  locator(event);
  stroke_properties();
  strok =true;
}

async function auxillary_stop_draw() {
  strok=false;
  update_page_image();
}

async function stop_draw(event) {
  strok=false;
  //update_page_image();
}

// This function is not yet being used
function sleep(milliseconds) {
  const date = Date.now();
  let currentDate = null;
  do {
    currentDate = Date.now();
  } while (currentDate - date < milliseconds);
}


async function draw(event) {
  if (!strok){return;}
  cntx.beginPath();
  cntx.moveTo(loc.x,loc.y);
  //locator(event);
  controlPoint.x=loc.x;
  controlPoint.y=loc.y;
  //new piece
  locator(event);
  controlPoint.x = (controlPoint.x + loc.x)/2 ;
  controlPoint.y = (controlPoint.y + loc.y)/2 ;
  //end piece
  //document.getElementById('toolscontainer').innerHTML = "X:" + controlPoint.x +"   Y:" + controlPoint.y ; //for testing
  locator(event);
  cntx.quadraticCurveTo(controlPoint.x, controlPoint.y, loc.x, loc.y);
  //cntx.lineTo(loc.x,loc.y);
  cntx.stroke();
  cntx.closePath();
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
  document.getElementById('eraser').style.backgroundColor = "#9392FF";
  document.getElementById('pencil').style.color = "black";
  document.getElementById('pencil').style.backgroundColor = "white";
}

//Toggle to pencil
function start_pencil() {
  if(document.getElementById('eraser').style.color == "white"){
    //changing strokewidth back to original
    document.getElementById('strokewidth').value = ostrokewidth;
    //schanging it to background color
    document.getElementById('strokecolor').value = ostrokecolor;
  }
  //changing button properties
  document.getElementById('eraser').style.color = "black";
  document.getElementById('eraser').style.backgroundColor = "white";
  document.getElementById('pencil').style.color = "white";
  document.getElementById('pencil').style.backgroundColor = "#9392FF";
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

async function startup_instructions() {
  write_on_canvas("Welcome To the Content Creator Blackboard.", toolbox.style.width + 2, canv.height/2);
  write_on_canvas("Start Drawing!", 200, (canv.height/2) + 40);
  write_on_canvas("Use the reset Button in the 'Actions panel'(the first one) to clear this message.", 200, (canv.height/2) + 80);
}

async function write_on_canvas(string, corx, cory) {
  cntx.font = "30px Arial";
  cntx.fillStyle="white";
  cntx.fillText(string, corx, cory);
}

//Undo Redo functionality:
var undo_arr_index;
async function update_page_image() {
  var board_image = cntx.getImageData(0,0,canv.width,canv.height);
  if(undo_arr_index<(undo_arr.length)){
    undo_arr.splice( (undo_arr_index + 1), (undo_arr.length - undo_arr_index - 1));
  }
  undo_arr.push(board_image);
  undo_arr_index = undo_arr.length - 1; //array indexing issue
  button_state_checker();
  //console.log(undo_arr.length)//for testing
}

async function undo() {
  if(undo_arr_index>0){
    undo_arr_index -= 1;
    cntx.putImageData(undo_arr[undo_arr_index],0,0);
  }
  button_state_checker();
}

async function redo() {
  if(undo_arr_index<undo_arr.length){
    undo_arr_index ++;
    cntx.putImageData(undo_arr[undo_arr_index],0,0);
  }
  button_state_checker();
}

async function button_state_checker() {
  //enabling and disabling of buttons
  if (undo_arr_index==0) {
    document.getElementById('action8').disabled = true;
  }
  if(undo_arr_index==(undo_arr.length - 1)){
    document.getElementById('action9').disabled = true;
  }
  if(undo_arr_index>0){
    document.getElementById('action8').disabled = false;
  }
  if(undo_arr_index<(undo_arr.length - 1)){
    document.getElementById('action9').disabled = false;
  }
  //number of undo's that can be done
  if(undo_arr.length>25){
    undo_arr.splice(0,(undo_arr.length - 25));
  }
}
//Undo Redo Achieved
