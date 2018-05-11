document.addEventListener("DOMContentLoaded", function(){

  var overlay = document.querySelector(".modal-overlay");

  // close modal on overlay click
  overlay.addEventListener('click', function(){
    this.classList.remove('active');

    document.querySelectorAll('.pin-modal.active').forEach(function(modal){
      modal.classList.remove('active');
    });
  });

  // close open modal on ESC
  document.addEventListener('keyup', function(event){
    if (event.defaultPrevented){ return; }
    if (document.querySelector('.pin-modal.active') == null){ return; }

    var key = event.key || event.keyCode;
    if (key === 'Escape' || key === 'Esc' || key === 27) {
      document.querySelector('.pin-modal.active').classList.remove('active');
      overlay.classList.remove('active');
    }
  });

  // close modal on dismiss click
  document.querySelectorAll('.pin-modal-dismiss').forEach(function(dismiss){
    dismiss.addEventListener('click', function(){
      this.closest('.pin-modal.active').classList.remove('active');
      overlay.classList.remove('active');
    });
  });

  // open modal on toggler click
  document.querySelectorAll('.pin-modal-toggle').forEach(function(toggle){
    toggle.addEventListener('click', function(){
      var modal = document.querySelector("#"+toggle.getAttribute('data-modal'));
      overlay.classList.add("active");
      modal.classList.add("active");
    });
  });

  // swap viewer images
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

});
