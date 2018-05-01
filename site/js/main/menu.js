var body = document.querySelector('body');
var menuList = document.querySelector('#menu-list');
var navToggles = document.querySelectorAll('[aria-controls="menu-list"]');

navToggles.forEach(function(toggle){
  toggle.addEventListener('click', function(event){
    var expanded = menuList.getAttribute('aria-expanded') === 'true' || false;
    menuList.setAttribute('aria-expanded', !expanded);
    body.setAttribute('data-menu', !expanded);
    event.stopPropagation();
  });
});

body.addEventListener('click', function(event){
  var isMenu = $(event.target).closest('#menu-list').length > 0;
  if(isMenu){ return false; }

  var expanded = menuList.getAttribute('aria-expanded') === 'true' || false;
  if(expanded){
    menuList.setAttribute('aria-expanded', !expanded);
    body.setAttribute('data-menu', !expanded);
  }
});
