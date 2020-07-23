document.onload = initi2();
function initi2() {

}

//for pages functionality start (additional array to enable pdf functionality added)
var pages = [], pages_pdf = [],page_number=0;
function new_page() {
  if (pages.length==page_number||pages.length-1==page_number) {
    pages[page_number] = cntx.getImageData(0,0,canv.width,canv.height);
    pages_pdf[page_number] = canv.toDataURL('image/jpeg',1.0);
    page_number++;
    clear_page();
    //document.getElementById('action5').innerHTML="New Page";
  }
  else if(pages.length>page_number) {
    pages[page_number] = cntx.getImageData(0,0,canv.width,canv.height);
    pages_pdf[page_number] = canv.toDataURL('image/jpeg',1.0);
    page_number++;
    cntx.putImageData(pages[0][page_number],0,0);
    if ((pages.length-1)==page_number) {
      document.getElementById('action5').innerHTML="New Page";
    }
  }
  else{}
}

function previous_page() {
  //automatically saving current page
  pages[page_number]=cntx.getImageData(0,0,canv.width,canv.height);
  pages_pdf[page_number] = canv.toDataURL('image/jpeg',1.0);
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
  saveAs(canv.toDataURL('image/png'),'drawing.png');
}

//to pdf function
async function to_pdf() {
  if(canv.width>canv.height){
    var doc = new jsPDF("landscape","pt" , "a4");
  }
  else{
    var doc = new jsPDF("portrait","pt" , "a4");
  }
  for (var i = 0; i < pages_pdf.length; i++) {
    doc.addImage(pages_pdf[i],'JPEG',0,0,842,595);
    console.log(doc.internal.width);
  }
  //since the last page is not yet added to the array
  doc.addImage(canv.toDataURL('image/jpeg',1.0),'JPEG',0,0,842,595);
  doc.save("yourpdf.pdf");
}
