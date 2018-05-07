document.addEventListener("DOMContentLoaded", function(){

  var overlay = document.querySelector(".modal-overlay");

  overlay.addEventListener('click', function(){
    this.classList.remove('active');

    document.querySelectorAll('.pin-modal.active').forEach(function(modal){
      modal.classList.remove('active');
    });
  });

  document.querySelectorAll('.pin-modal-toggle').forEach(function(toggle){
    toggle.addEventListener('click', function(){
      var modal = document.querySelector("#"+toggle.getAttribute('data-modal'));
      overlay.classList.add("active");
      modal.classList.add("active");
    });
  });

});
