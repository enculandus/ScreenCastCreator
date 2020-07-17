document.onload = initi2();
function initi2() {

}

//for pages functionality start
var pages=[],page_number=0;
function new_page() {
  if (pages.length==page_number||pages.length-1==page_number) {
    pages[page_number] = cntx.getImageData(0,0,canv.width,canv.height);
    page_number++;
    clear_page();
    //document.getElementById('action5').innerHTML="New Page";
  }
  else if(pages.length>page_number) {
    pages[page_number] = cntx.getImageData(0,0,canv.width,canv.height);
    page_number++;
    cntx.putImageData(pages[page_number],0,0);
    if ((pages.length-1)==page_number) {
      document.getElementById('action5').innerHTML="New Page";
    }
  }
  else{}
}

function previous_page() {
  //automatically saving current page
  pages[page_number]=cntx.getImageData(0,0,canv.width,canv.height);
  //settng up condition for first page error
  if(page_number>=1){
    page_number--;
  }
  else{
    alert("This is the first page.");
    //return;
  }
  if (page_number==0) {
    document.getElementById('action6').visibility="hidden";
  }
  cntx.putImageData(pages[page_number],0,0);
  //document.getElementById('action5').innerHTML="";
  document.getElementById('action5').innerHTML="Next Page";
}
//for page functionality end

//image download
function download_img() {
  var canvas_data_image = new Image(230);
  canvas_data_image.src = canv.toDataURL('imgage/jpeg');
  document.getElementById('actions').appendChild(canvas_data_image);
}

//to pdf function
async function to_pdf() {
  await loadscript("jspdf.min.js", document.body, 'action7notification');
  var doc = new jsPDF();
  var imgdata = canv.toDataURL('imgage/jpeg');
  doc.addImage(imgdata, "PNG", 15, 40, 180, 180);

}
