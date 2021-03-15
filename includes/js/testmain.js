import Final from './imports/final.js';
$(function () {
  stageActive();
});

function stageActive() {
  $.ajax({
    type: 'GET',
    crossDomain: true,
    url: 'components/content/final/table.html',
    dataType: 'html',
    success: function (res) {
      $('#content').html(res);
      Final();
    },
  });
}
