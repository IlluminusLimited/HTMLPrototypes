function openModal(toggle){
  var modal = document.querySelector("#"+toggle.getAttribute('data-modal'));
  modal.classList.add("active");
  document.querySelector(".modal-overlay").classList.add("active");
  document.querySelector('html').classList.add('no-scroll');
}

function closeModal(){
  document.querySelector('html').classList.remove('no-scroll');
  document.querySelector(".modal-overlay").classList.remove("active");
  document.querySelectorAll('.pin-modal.active').forEach(function(modal){
    modal.classList.remove('active');
  });
}

document.addEventListener("DOMContentLoaded", function(){

  // close modal on overlay click
  document.querySelector(".modal-overlay").addEventListener('click', function(){
    closeModal();
  });

  // close open modal on ESC
  document.addEventListener('keyup', function(event){
    if (event.defaultPrevented){ return; }

    var key = event.key || event.keyCode;
    if (key === 'Escape' || key === 'Esc' || key === 27) {
      closeModal();
    }
  });

  // close modal on dismiss click
  document.querySelectorAll('.pin-modal-dismiss').forEach(function(dismiss){
    dismiss.addEventListener('click', function(){
      closeModal();
    });
  });

  // open modal on toggler click
  document.querySelectorAll('.pin-modal-toggle').forEach(function(toggle){
    toggle.addEventListener('click', function(){
      openModal(toggle);
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
