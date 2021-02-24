import displayPredTable from './displaypredtable.js';
import Single from './sub/single/single.js';
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

          Single();
          showMethod(predId);
          saveDrop(predId);
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
      displayPredTable(0);
      $item.find('.drag-box').animate({ height: '48px' });
    });
  });
}

function showMethod(predId) {
  $('.method').attr('data-predid', predId);
  $('.method').html(`<option value="0" selected>Pls Choose</option>`);
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

  $('#minimum').removeAttr('disabled');
  $('#topdown').removeAttr('disabled');
  $('#minimum').addClass('btn-active');
}

export default holderSingle;
