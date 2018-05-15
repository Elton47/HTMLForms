/// <reference path="_references.js" />
var data;
$(document).ready(function() {
  $('#first-form').submit(function(e) { formOnSubmit(e); }).draggable( {
    handle: '.form-status-bar',
    containment: '.main-content',
    start: function(e) { $(e.target).addClass('dragged'); },
    stop: function(e) { $(e.target).removeClass('dragged'); }
  });
  $('#clear-form-button').click(function(e) { clearForm(e, $('#first-form'), 2000); });
  $('#submit-form-button').click(function(e) { submitForm(e, $('#first-form'), 2000); });
  $('.form-status-bar').dblclick(function() { resizeWindow($('#first-form')); });
  $('li[title*="inimize"]').click(function() { minimizeWindow($('#first-form')); }); /* Excluding the first character of "title" attribute, to ignore cases */
  $('li[title*="esize"]').click(function() { resizeWindow($('#first-form')); });
  $('li[title*="lose"]').click(function() { closeWindow($('#first-form')); });
  $.getJSON("/js/data.json", function(results) { data = results; });
  $(document).ajaxSuccess(function() {
    $('#name-field').val(data.name);
    checkFields();
  });
});
function clearForm(e, form, toastTime) {
  var fab = $(e.target);
  var fabIcon = fab.find('i');
  var fabIconValue = fabIcon.html();
  toastTime = toastTime >= 1000 ? toastTime : 4000;
  fab.css('pointer-events', 'none');
  fab.addClass('success');
  fabIcon.addClass('done');
  fabIcon.html('check');
  setTimeout(function() {
    fab.css('pointer-events', 'unset');
    fab.removeClass('success');
    fabIcon.removeClass('done');
    setTimeout(function() { fabIcon.html(fabIconValue); }, 150);
  }, toastTime);
  form.trigger('reset');
  toast(toastTime, 'Cleared', 'check', 'success');
}
function formOnSubmit(e) {
  e.preventDefault();
}
function submitForm(e, form, timeOut) {
  timeOut = timeOut >= 1000 ? timeOut : 4000;
  $(e.target).css('pointer-events', 'none');
  $(form).submit();
  if(validateForm(form)) {
    $(e.target).addClass('success');
    $(e.target).find('>label').html('&nbsp;Done');
  }
  else {
    $(e.target).addClass('danger').find('>i').html('warning');
    $(e.target).find('>label').html('&nbsp;Failed');
  }
  setTimeout(function() {
    $(e.target).removeClass('shrinked success danger').find('>i').html('check');
    $(e.target).find('>label').html('&nbsp;Submit');
    $(e.target).css('pointer-events', 'unset');
  }, timeOut); // Remove previous-applied classes.
}
function validateForm(form) {
  var valid = form.valid();
  $('form input').each(function(index, input) {
    if(!$(input).val())
      valid = false;
  });
  return valid;
}
function minimizeWindow(e) {
  e.toggleClass('minimized');
  e.removeClass('maximized');
  e.removeAttr('style');
}
function resizeWindow(e) {
  e.removeClass('minimized');
  e.toggleClass('maximized');
  e.removeAttr('style');
}
function closeWindow(e) {
  e.hide('fast', function() {
    e.remove();
  });
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