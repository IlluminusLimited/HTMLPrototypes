document.addEventListener("DOMContentLoaded", function() {
  document.querySelectorAll('[href^="#"]').forEach(function(link){
    link.addEventListener('click', function(event){
      var target = document.querySelector(this.getAttribute('href'));
      if(target !== null){
        target.scrollIntoView({
          behavior: 'smooth'
        });

        window.setTimeout(function(){
          var index = target.getAttribute('tabindex');
          target.setAttribute('tabindex', -1);
          target.focus();
          target.setAttribute('tabindex', index);

          history.pushState({},null,"#" + target.getAttribute('id'));
        }, 800);

        event.preventDefault();
      }
    });
  });
});
