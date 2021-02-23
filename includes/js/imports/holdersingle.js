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
        drop: function (event, ui) {
          let predId = ui.draggable[0].dataset['drag'];

          Set.Predictors[0][predId - 1].status = 2;

          addPredictors(ui.draggable);
          Set.drop = '1';
          $('#multiple-predictor').attr('disabled', true);
        },
      });
    },
  });
};

function addPredictors($item) {
  let $trash = $('.choosen-holder');
  $item.hide(function () {
    var $list = $($trash).length
      ? $($trash)
      : $('<div class="choosen-holder"/>').html($trash);

    $item.appendTo($list).show(function () {
      $item.removeClass('col-md-6 drag-btn');
      $item.addClass('drop-btn');
      displayPredTable('');
      $item.find('.drag-box').animate({ height: '48px' });
    });
  });
}

export default holderSingle;
