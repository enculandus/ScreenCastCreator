//All video capture related functions

var videostream;
var audiostream;
var streamholder = [];//=[videostream,audiostream];

//working video recorder
//setting up recorder variable
var recorder;
//working video recorder*/


async function start_recording() {
  //requesting audio and video stream
  //for audio
  audiostream = await navigator.mediaDevices.getUserMedia({audio:{echoCancellation:true}});
  //getting stream of canvas only
  videostream = document.querySelector('canvas').captureStream(40);
  //videostream = await navigator.mediaDevices.getDisplayMedia(); //alternate
  //for testing
  //video.srcObject = videostream;
  //video.play();
  //audiorecorder = new RecordRTC(audiostream,{type:'audio'});
  streamholder.push(videostream);
  streamholder.push(audiostream);
  recorder = new RecordRTC(streamholder, {
      type: 'canvas',
      mimeType:'video/webm',
      video:{width:canv.width, height:canv.height},
      frameInterval: 40,
  });

  //starting recorder
  recorder.startRecording();

  console.log("recording started");

  document.getElementById('action2').style.backgroundColor='red';
  document.getElementById('action2').style.color='white';
  document.body.style.backgroundColor='red';
}


function stop_recording() {
  //stop testing
  //video.pause()

  //stopping recorders
  recorder.stopRecording(function() {
    var vidblob = recorder.getBlob();
    //ocument.getElementById('testv').src = URL.createObjectURL(blob);
    //document.getElementById('testv').parentNode.style.display = 'block';
    invokeSaveAsDialog(vidblob,"screencast.webm");
  });

  //to stop the tracks, ensuring that the user is asked permissions each time recording is started
  const audtracks = audiostream.getTracks();
  audtracks.forEach(function(track) {
    track.stop();
  });
  const vidtracks = videostream.getTracks();
  vidtracks.forEach(function(track) {
    track.stop();
  });
  streamholder=[];

  document.body.style.backgroundColor='white';

  document.getElementById('action2').style.backgroundColor='white';
  document.getElementById('action2').style.color='black';
  alert("Refresh the page if you want to make another recording. Do not forget to dowload the recorded videos when prompted. They will otherwise be lost.");
}
