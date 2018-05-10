document.addEventListener("DOMContentLoaded", function(){

  var overlay = document.querySelector(".modal-overlay");

  overlay.addEventListener('click', function(){
    this.classList.remove('active');

    document.querySelectorAll('.pin-modal.active').forEach(function(modal){
      modal.classList.remove('active');
    });
  });

  document.querySelectorAll('.pin-modal-dismiss').forEach(function(dismiss){
    dismiss.addEventListener('click', function(){
      this.closest('.pin-modal.active').classList.remove('active');
      overlay.classList.remove('active');
    });
  });

  document.querySelectorAll('.pin-modal-toggle').forEach(function(toggle){
    toggle.addEventListener('click', function(){
      var modal = document.querySelector("#"+toggle.getAttribute('data-modal'));
      overlay.classList.add("active");
      modal.classList.add("active");
    });
  });

  document.querySelectorAll('.pin-modal-thumbs .pin-modal-img').forEach(function(img){
    img.addEventListener('click', function(){
      var viewer = img.closest(".pin-modal-container ").querySelector(".pin-modal-viewer");
      viewer.querySelector("img").remove();
      viewer.append(img.cloneNode());

      img.parentNode.querySelectorAll(".pin-modal-img").forEach(function(elem){
        elem.classList.remove('active');
      });
      img.classList.add('active');
    });
  });


});
