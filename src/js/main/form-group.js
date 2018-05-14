document.addEventListener("DOMContentLoaded", function(){
  document.querySelectorAll('.form-group input, .form-group textarea').forEach(function(input){
    input.addEventListener('keyup', function(){
      if(input.value != ""){
        input.parentNode.classList.add('active');
      } else {
        input.parentNode.classList.remove('active');
      }
    });
  });
});
