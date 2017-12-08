(function localFileVideoPlayer() {
	'use strict'
  var URL = window.URL || window.webkitURL
  var displayMessage = function (message, isError) {
    var element = document.querySelector('#message')
    element.innerHTML = message
    element.className = isError ? 'error' : 'info'
  }
  var playSelectedFile = function (event) {
    var file = this.files[0]
    var type = file.type
    var videoNode = document.querySelector('video')
    var canPlay = videoNode.canPlayType(type)
    if (canPlay === '') canPlay = 'no'
    var message = 'Can play type "' + type + '": ' + canPlay
    var isError = canPlay === 'no'
    displayMessage(message, isError)

    if (isError) {
      return
    }

    var fileURL = URL.createObjectURL(file)
    videoNode.src = fileURL
  }
  var inputNode = document.querySelector('input')
  inputNode.addEventListener('change', playSelectedFile, false)
})()


// Pause control
// $("video").click(function() {
//   //console.log(this);
//   if (this.paused) {
//     this.play();
//   } else {
//     this.pause();
//   }
// });

// ____________________________SWIPE
$(document).ready(function() {

var element = $('#element');
var debug = $('#debug');

element.touch = {}

 element.click(function() {
  console.log(this);
  if (this.paused) {
    this.play();
  } else {
    this.pause();
  }
});
element.get(0).ontouchstart = function(e) {
  // Store start position
  element.touch.x = e.touches[0].clientX;
};

element.get(0).ontouchmove = function(e) {
  // only deal with one finger
  if (e.touches.length == 1 && !element.is(":animated")) {

    // Get delta
    var deltaX = element.touch.x - e.touches[0].clientX;

    // Move foward
    if (deltaX > 20) {
        this.currentTime -= .5;
    }
    // Move backward
    else if (deltaX < -20)  {
		this.currentTime += .5;
    }
  }
};

});


//DIM Control_______________________________
$('#contrast').on('input', function() {
    $('#contrastFilter').css('opacity', $(this).val());
});

// ___________DEFAULT_VOLUME
$("video").prop("volume", 0.5);


//URL______________________________
function changeURL() {
    var newURL = document.getElementById("newURL").value;
	var x;
	x = document.getElementById("newURL").value;
    if (x == "")
    document.getElementById("element").src=newURL;
}

function empty() {
    var x;
    x = document.getElementById("newURL").value;
    if (x == "") {
        alert("Enter a Valid Roll Number");
        return false;
    };
}


// Registering ServiceWorker
if ('serviceWorker' in navigator) {
  navigator.serviceWorker.register('sw.js').then(function(registration) {
    // Registration was successful
    console.log('ServiceWorker registration successful with scope: ',    registration.scope);
  }).catch(function(err) {
    // registration failed :(
    console.log('ServiceWorker registration failed: ', err);
  });
}
