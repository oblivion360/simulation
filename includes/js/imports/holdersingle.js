import displayPredTable from './displaypredtable.js';
import Single from './sub/single/single.js';
let holderSingle = () => {
  Set.drop = '1';
  $.ajax({
    type: 'GET',
    crossDomain: true,
    url: 'components/content/holder-single-predictor.html',
    dataType: 'html',
    success: function (res) {
      // show page
      $('#predictor-holder').html(res);
      // $('.btn-method').addClass('method-disabled');
      $('.droppable').droppable({
        accept: '.draggable',
        over: function (event, ui) {
          // Enable all the .droppable elements
          // $('.droppable').droppable('enable');

          // If the droppable element we're hovered over already contains a .draggable element,
          // don't allow another one to be dropped on it
          if ($(this).has('.draggable').length) {
            $(this).droppable('disable');
          }
        },
        drop: function (event, ui) {
          let predId = ui.draggable[0].dataset['drag'];
          Set.Predictors[0][predId - 1].status = 2;
          $('#methodType').val(1);
          Single();
          showMethod(predId);
          saveDrop(predId);
          addPredictors(ui.draggable);
          Set.drop = '1';
          $('#multiple-predictor').attr('disabled', true);

          navBtn();
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
    $('.choosen-holder').html('');
    $item.appendTo($list).show('fast', 'linear', function () {
      $item.removeClass('col-md-6 drag-btn');
      $item.addClass('drop-btn');
      displayPredTable(0);
      $item.find('.drag-box').animate({ height: '48px' });
    });
  });
}

function showMethod(predId) {
  let btn = [];
  btn = Set.Predictors[0].find(pred => pred.predId == predId);
  console.log(btn);
  if (btn.valueType == 2) {
    $('#topdown').attr('disabled', 'true');

    $('#minimum').removeAttr('disabled');
    $('#minimum').addClass('btn-active');
  } else {
    $('#minimum').removeAttr('disabled');
    $('#topdown').removeAttr('disabled');
    $('#minimum').addClass('btn-active');
  }
  $('.method').attr('data-predid', predId);
  $('.method').html(`<option value="0" selected>Select the Score</option>`);
  Set.Predictors[0].map(res => {
    if (res.predId == predId) {
      // console.log(typeof res.start);
      if (typeof res.start == 'number') {
        let start = res.start,
          end = res.end,
          x = 0,
          add = res.add;

        do {
          x++;
          if (x == 1) {
            $('.method').append(`
            <option value="${start}" >${start} ${res.textSingular}</option>
            `);
          } else {
            $('.method').append(`
            <option value="${start}" >${start} ${res.textPlural}</option>
            `);
          }
          start = start + add;
        } while (start <= end);
      } else if (typeof res.start == 'string') {
        let start = res.start,
          end = res.end;
        $('.method').append(`
            <option value="${start}" >${start}</option>
            `);
        $('.method').append(`
            <option value="${end}" >${end}</option>
            `);
      }
    }
  });
}

function saveDrop(predId) {
  if (typeof Set.dropped[0] == 'undefined') {
    Set.data.Dropped(predId);
    console.log(Set.dropped);
  } else {
    Set.dropped = [];
    Set.data.Dropped(predId);
    console.log(Set.dropped);
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

export default holderSingle;
