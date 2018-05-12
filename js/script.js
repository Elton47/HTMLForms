$(document).ready(function() {
  $('#clear-form-button').on('click', function() { $('#first-form')[0].reset(); });
  $('li[title*="inimize"]').click(function() { minimizeWindow($('#first-form')); }); /* Excluding the first character of "title" attribute, to ignore cases */
  $('li[title*="esize"]').click(function() { resizeWindow($('#first-form')); });
  $('li[title*="lose"]').click(function() { closeWindow($('#first-form')); });
  Array.from($('input')).forEach(element => { /* Input field labels animation based on empty CSS class for input fields */
    checkField(element);
    $(element).blur(function() { checkField(element); });
  });
});
function closeWindow(e) {
  e.hide('fast', function() {
    e.remove();
  });
}
function resizeWindow(e) {
  if(e.hasClass('minimized'))
    e.removeClass('minimized');
  e.toggleClass('maximized');
}
function minimizeWindow(e) {
  if(e.hasClass('maximized'))
    e.removeClass('maximized');
  e.toggleClass('minimized');
}
function checkField(e) {
  var input = $(e);
  if(input.val() != '')
    input.removeClass('empty');
  else
    input.addClass('empty');
}