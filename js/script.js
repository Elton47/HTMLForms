/// <reference path="jquery-3.3.1.min.js" />
var data;
$(document).ready(function() {
  $('#clear-form-button').click(function(e) { clearForm(e, $('#first-form')); });
  $('#submit-form-button').click(function(e) { submitForm(e, $('#first-form')); });
  $('li[title*="inimize"]').click(function() { minimizeWindow($('#first-form')); }); /* Excluding the first character of "title" attribute, to ignore cases */
  $('li[title*="esize"]').click(function() { resizeWindow($('#first-form')); });
  $('li[title*="lose"]').click(function() { closeWindow($('#first-form')); });
  $.getJSON("/js/data.json", function(results) { data = results; });
  $(document).ajaxSuccess(function() {
    $('#name-field').val(data.name);
    checkFields();
  });
});
function clearForm(e, form) {
  var fab = $(e.target);
  var fabIcon = fab.find('i');
  var fabIconValue = fabIcon.html();
  fab.css('pointer-events', 'none');
  fab.addClass('success');
  fabIcon.addClass('done');
  fabIcon.html('check');
  setTimeout(function() {
    fab.css('pointer-events', 'unset');
    fab.removeClass('success');
    fabIcon.removeClass('done');
    setTimeout(function() { fabIcon.html(fabIconValue); }, 150);
  }, 4000);
  form.trigger('reset');
  toast(4000, 'Cleared', 'check', 'success');
}
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
  e.toggleClass('minimized');
}
function checkFields() {
  Array.from($('input')).forEach(e => { /* Input field labels animation based on empty CSS class for input fields */
    if($(e).val())
      $(e).removeClass('empty');
    else
      $(e).addClass('empty');
    $(e).change(function() {
      if($(e).val())
        $(e).removeClass('empty');
      else
        $(e).addClass('empty');
    });
  });
}
function toast(duration, msg, icon, colorClassName) {
  var toast = $('.toast');
  if(icon)
    toast.html('<i class="material-icons">' + icon + '</i>&nbsp;' + msg);
  else
    toast.html(msg);
  toast.addClass('shown ' + colorClassName);
  setTimeout(function() {
    toast.removeClass('shown ' + colorClassName);
    setTimeout(function() { /* Empty after animation has finished (after 300ms). */
      toast.empty();
    }, 300);
  }, duration);
}