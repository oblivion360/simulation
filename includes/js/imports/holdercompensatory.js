import displayPredTable from './displaypredtable.js';
import Compensatory from './sub/single/compensatory.js';
let holderCompensatory = () => {
  $.ajax({
    type: 'GET',
    crossDomain: true,
    url: 'components/content/holder-compensatory-predictor.html',
    dataType: 'html',
    success: function (res) {
      // show page
      $('#predictor-holder').html(res);
      // set weight selector
      for (let x = 5; x <= 100; x = x + 5) {
        $('.weight').append(`<option value="${x}">${x}%</option>`);
      }

      // droppable
      $('.droppable1, .droppable2').droppable({
        accept: '.draggable',
        drop: function (event, ui) {
          let predId = ui.draggable[0].dataset['drag'];
          Set.Predictors[0][predId - 1].status = 2;
          addPredictors(ui.draggable, predId);
          Compensatory();
          saveDrop(predId);

          Set.drop = '3';
          navBtn();
          $('#single-predictor').attr('disabled', true);
          $('#multiple-predictor').attr('disabled', true);
          $('#multi-hurdle').attr('disabled', true);
        },
      });
    },
  });
};

// adding Predictors
function addPredictors($item, predId) {
  let x = $('#counter').val();
  $('#weight' + x).attr('data-predid', predId);
  let $trash = $('.choosen-holder' + x);
  $item.hide(function () {
    var $list = $($trash).length
      ? $($trash)
      : $(`<div class="choosen-holder{x}"/>`).html($trash);

    $item.appendTo($list).show(function () {
      $item.removeClass('col-md-6 drag-btn');
      $item.addClass('drop-btn');
      displayPredTable(1);
      $item.find('.drag-box').animate({ height: '48px' });
    });
    x = Number(x) + 1;
    $('#counter').val(x);
  });
}

function saveDrop(predId) {
  if (typeof Set.dropped[0] == 'undefined') {
    Set.data.Dropped(predId);
    //console.log(Set.dropped);
  } else {
    // Set.dropped = [];
    Set.data.Dropped(predId);
    //console.log(Set.dropped);
  }
}

function navBtn() {
  let stage = Number($('#stage').val());
  if (stage == 1) {
    $('.nav-btn').attr('disabled', true);
  } else {
    $('#next').attr('disabled', true).removeClass('btn-stage-active');
    $('#prev').attr('disabled', false).addClass('btn-stage-active');
  }
}

export default holderCompensatory;
