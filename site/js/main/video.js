document.addEventListener("DOMContentLoaded", function() {
  document.querySelectorAll('video').forEach(function(video){

    if (!video.getAttribute("autoplay")) {
      video.parentNode.setAttribute("data-state", "paused");
    }

    // toggle playback
    video.addEventListener('click', function(){
      if(video.paused){
        video.parentNode.removeAttribute("data-state");
        video.play();
      } else {
        video.parentNode.setAttribute("data-state", "paused");
        video.pause();
      }
    });
  });
});
