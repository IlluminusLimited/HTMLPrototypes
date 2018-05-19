document.addEventListener("DOMContentLoaded", function(){

  // swap modal viewer images
  document.querySelectorAll('.pin-modal-thumb').forEach(function(thumb){
    thumb.addEventListener('click', function(){
      var viewer = thumb.closest(".pin-modal-container ").querySelector(".pin-modal-viewer");
      viewer.querySelector("img").remove();
      viewer.append(thumb.querySelector("img").cloneNode());

      thumb.parentNode.querySelectorAll(".pin-modal-thumb").forEach(function(elem){
        elem.classList.remove('active');
      });
      thumb.classList.add('active');
    });
  });

  // swap page viewer images
  document.querySelectorAll('.pin-thumb').forEach(function(thumb){
    thumb.addEventListener('click', function(){
      var viewer = thumb.closest(".pin-page").querySelector(".pin-viewer");
      viewer.querySelector("img").remove();
      viewer.append(thumb.querySelector("img").cloneNode());

      thumb.parentNode.querySelectorAll(".pin-thumb").forEach(function(elem){
        elem.classList.remove('active');
      });
      thumb.classList.add('active');
    });
  });

});
