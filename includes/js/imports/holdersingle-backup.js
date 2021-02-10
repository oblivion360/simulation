import displayPredTable from './displaypredtable.js';
let holderSingle = () => {
  $.ajax({
    type: 'GET',
    crossDomain: true,
    url: 'components/content/holder-single-predictor.html',
    dataType: 'html',
    success: function (res) {
      // show page
      $('#predictor-holder').html(res);
      $('.droppable').droppable({
        accept: '.draggable',
        classes: {
          'ui-droppable-active': 'ui-state-highlight',
        },
        drop: function (event, ui) {
          let predId = ui.draggable[0].dataset['drag'];
          Set.Predictors[predId - 1].status = 2;
          deleteImage(ui.draggable);
        },
      });
    },
  });
};

function deleteImage($item) {
  let $trash = $('.choosen-holder');
  $item.fadeOut(function () {
    var $list = $($trash).length
      ? $($trash)
      : $("<div class='choosen-holder'/>").appendTo($trash);

    $item.appendTo($list).show(function () {
      $item.draggable('disable');
      $item.attr('id', 'draggable');
      $item.removeClass(
        'col-md-6 drag-btn draggable ui-draggable ui-draggable-handle'
      );
    });
  });
}

export default holderSingle;
