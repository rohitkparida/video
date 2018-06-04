(function localFileVideoPlayer() {
    'use strict'
    var URL = window.URL || window.webkitURL
    var displayMessage = function(message, isError) {
        var element = document.querySelector('#message')
        element.innerHTML = message
        element.className = isError ? 'error' : 'info'
    }
    var playSelectedFile = function(event) {
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
    var inputNode = document.querySelector('.receiver')
    inputNode.addEventListener('change', playSelectedFile, false)
})()




document.querySelector('video').playbackRate = 3.0;


// STATUS-----------

// var element = $('#element');
//
// element.waiting(function() {
//     console.log(this);
//     if (this.paused) {
//         $(".status").addClass("playing");
//     } else {
//         $(".status").addClass("error");
//     }
// });

// Disable_sendBtn-----------------------------
function success() {
    if (document.getElementById("newURL").value === "") {
        document.getElementById('send').disabled = true;
    } else {
        document.getElementById('send').disabled = false;
    }
}

// Pause control
// $("video").click(function() {
//   //console.log(this);
//   if (this.paused) {
//     this.play();
//   } else {
//     this.pause();
//   }
// });

// ____________________________PLAYBACK_GESTURES
$(document).ready(function() {

    var element = $('#element');
    var debug = $('#debug');

    element.touch = {}

    // element.click(function() {
    //     console.log(this);
    //     if (this.paused) {
    //         this.play();
    //     } else {
    //         this.pause();
    //     }
    // });
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
            else if (deltaX < -20) {
                this.currentTime += .5;
            }
        }
    };

});


//DIM Control_______________________________
// $('#contrast').on('input', function() {
//     $('#element').css('opacity', $(this).val());
// });


// ___________DEFAULT_VOLUME
$("video").prop("volume", 0.6);


//URL______________________________
function changeURL() {
    var newURL = document.getElementById("newURL").value;
    document.getElementById("element").src = newURL;
}


// Registering ServiceWorker
if ('serviceWorker' in navigator) {
    navigator.serviceWorker.register('sw.js').then(function(registration) {
        // Registration was successful
        console.log('ServiceWorker registration successful with scope: ', registration.scope);
    }).catch(function(err) {
        // registration failed :(
        console.log('ServiceWorker registration failed: ', err);
    });
}