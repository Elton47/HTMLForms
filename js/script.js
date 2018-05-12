$(document).ready(function() {
  $('header > nav').css('padding-right', $('header > .logo-and-title').outerWidth() + 'px'); // Centering Header's nav.
  $('#clear-form-button').on('click', function() { $('#first-form')[0].reset(); });
});