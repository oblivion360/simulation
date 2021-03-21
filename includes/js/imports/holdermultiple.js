import displayPredTable from './displaypredtable.js';
import Multiple from './sub/single/multi.js';
let holderMultiple = () => {
  $.ajax({
    type: 'GET',
    crossDomain: true,
    url: 'components/content/holder-multi-hurdle.html',
    dataType: 'html',
    success: function (res) {
      // show page
      $('#predictor-holder').html(res);
      $('#methodType').val(1);
      $('.droppable1, .droppable2').droppable({
        accept: '.draggable',
        drop: function (event, ui) {
          let predId = ui.draggable[0].dataset['drag'];
          Set.Predictors[0][predId - 1].status = 2;
          addPredictors(ui.draggable);
          Multiple();
          showMethod(predId);
          saveDrop(predId);
          navBtn();
          Set.drop = '2';
          $('#single-predictor').attr('disabled', true);
          $('#compensatory').attr('disabled', true);
        },
      });

      //multiHurdle();
    },
  });
};

let multiHurdle = () => {
  $.ajax({
    type: 'GET',
    crossDomain: true,
    url: 'components/content/multi-hurdle.html',
    dataType: 'html',
    success: function (res) {
      // show page
      $('#holder-button').append(res);
    },
  });
};

function droppable() {
  let x = $('#counter').val();
  x = Number(x) + 1;
  $('#counter').val(x);
  console.log(x);
  $('.droppable' + x).droppable({
    accept: '.draggable',
    drop: function (event, ui) {
      let predId = ui.draggable[0].dataset['drag'];
      Set.Predictors[0][predId - 1].status = 2;

      Multiple();
      saveDrop(predId);
      addPredictors(ui.draggable);
      showMethod(predId);
      Set.drop = '2';

      $('#single-predictor').attr('disabled', true);
      $('#compensatory').attr('disabled', true);
    },
  });
}

// additional
function addPredictors($item) {
  let x = $('#counter').val();

  let $trash = $('.choosen-holder' + x);
  $item.hide(function () {
    var $list = $($trash).length
      ? $($trash)
      : $(`<div class="choosen-holder{x}"/>`).html($trash);
    $('.choosen-holder' + x).html('');
    $item.appendTo($list).show(function () {
      $item.removeClass('col-md-6 drag-btn');
      $item.addClass('drop-btn');
      displayPredTable(3);
      $item.find('.drag-box').animate({ height: '48px' });
    });
    x = Number(x) + 1;
    $('#counter').val(x);
    // $('.set-choosen')
    //   .removeClass('set-choosen')
    //   .addClass('choosen-holder' + x);
    // $('.droppable')
    //   .removeClass('droppable')
    //   .addClass('droppable' + x);
  });
  //droppable();
}

function showMethod(predId) {
  let x = $('#counter').val();
  console.log('show method' + x);
  $('.method' + x).attr('data-predid', predId);
  $('.method' + x).html(`<option value="0" selected>Pls Choose</option>`);
  Set.Predictors[0].map(res => {
    if (res.predId == predId) {
      if (res.valueType == 1) {
        let start = Number(res.start),
          end = Number(res.end),
          y = 0,
          add = Number(res.add);

        do {
          y++;
          if (y == 1) {
            $('.method' + x).append(`
            <option value="${start}" >${start} ${res.textSingular}</option>
            `);
          } else {
            $('.method' + x).append(`
            <option value="${start}" >${start} ${res.textPlural}</option>
            `);
          }
          start = start + add;
        } while (start <= end);
      } else if (res.valueType == 2) {
        let start = res.start,
          end = res.end;
        $('.method' + x).append(`
            <option value="${start}" >${start}</option>
            `);
        $('.method' + x).append(`
            <option value="${end}" >${end}</option>
            `);
      }
    }
  });
}

function saveDrop(predId) {
  let x = $('#counter').val();

  if (typeof Set.dropped[0] == 'undefined') {
    Set.data.Dropped(predId);
    //console.log(Set.dropped);
  } else {
    // Set.dropped = [];
    Set.data.Dropped(predId);
    //console.log(Set.dropped);
  }

  $('#minimum' + x).removeAttr('disabled');
  $('#topdown' + x).removeAttr('disabled');
  $('#minimum' + x).addClass('btn-active');
}

function navBtn() {
  let stage = Number($('#stage').val());
  console.log('navBtn: ' + stage);
  if (stage == 1) {
    $('.nav-btn').attr('disabled', true);
  } else {
    $('#next').attr('disabled', true).removeClass('btn-stage-active');
    $('#prev').attr('disabled', false).addClass('btn-stage-active');
  }
}

export default holderMultiple;
