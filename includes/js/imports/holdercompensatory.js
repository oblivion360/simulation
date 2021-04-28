import displayPredTable from './displaypredtable.js';
import Compensatory from './sub/single/compensatory.js';
let holderCompensatory = () => {
  Set.drop = '3';
  $.ajax({
    type: 'GET',
    crossDomain: true,
    url: 'components/content/holder-compensatory-predictor.html',
    dataType: 'html',
    success: function (res) {
      // show page
      $('#predictor-holder').html(res);
      // set weight selector
      for (let x = 10; x <= 100; x = x + 10) {
        $('.weight').append(`<option value="${x}">${x}%</option>`);
      }

      // droppable
      for (let z = 1; z <= 2; z++) {
        $('.droppable' + z).droppable({
          accept: '.draggable',
          direction: 'top',
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
            let predId = ui.draggable[0].dataset['drag'],
              id;
            Set.Predictors[0][predId - 1].status = 2;
            id = event.target.id;
            id = id.split(/([0-9]+)/);
            addPredictors(ui.draggable, predId, id[1]);
            Compensatory();
            saveDrop(predId);

            Set.drop = '3';

            if ($('#counter').val() >= 2) {
              $('#topdown').attr('disabled', false);
              $('#minimum').attr('disabled', false);
            }
            navBtn();
            $('#single-predictor').attr('disabled', true);
            $('#multiple-predictor').attr('disabled', true);
            $('#multi-hurdle').attr('disabled', true);
          },
        });
      }
      com();
    },
  });
};

// adding Predictors
function addPredictors($item, predId, x) {
  let z = $('#counter').val();
  $('#weight' + x).attr('data-predid', predId);
  let $trash = $('.choosen-holder' + x);
  $item.hide(function () {
    console.log('hide');
    var $list = $($trash).length
      ? $($trash)
      : $(`<div class="choosen-holder{x}"/>`).html($trash);
    $('.choosen-holder' + x).html('');
    $item.appendTo($list).show('fast', 'linear', function () {
      console.log('show');
      $item.removeClass('col-md-6 drag-btn');
      $item.addClass('drop-btn');
      $item.attr('data-num', x);
      displayPredTable(1);
      $item.find('.drag-box').animate({ height: '48px' });
    });
    z = Number(z) + 1;
    $('#counter').val(z);
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

let com = () => {
  $('.add-button').on('click', function () {
    let x = $('#addCounter').val();
    $('#methodType').val(1);
    let newPred = [];
    Set.Predictors[0].map(pred => {
      if (pred.status == 1 && pred.type == 2) {
        newPred.push(pred);
      }
    });

    if (newPred.length != 0) {
      $.ajax({
        type: 'GET',
        crossDomain: true,
        url: 'components/content/compensatory.html',
        dataType: 'html',
        success: function (res) {
          // show page
          $('#holder-button').append(res);
          for (let x = 10; x <= 100; x = x + 10) {
            $('.weight').append(`<option value="${x}">${x}%</option>`);
          }

          addSetting();
          for (let z = 1; z <= 8; z++) {
            $('.droppable' + z).droppable({
              accept: '.draggable',
              drop: function (event, ui) {
                let predId = ui.draggable[0].dataset['drag'],
                  id,
                  rmb;
                $('#methodType').val(1);
                Set.Predictors[0][predId - 1].status = 2;
                id = event.target.id;
                id = id.split(/([0-9]+)/);
                addPredictors(ui.draggable, predId, id[1]);
                Compensatory();
                saveDrop(predId);

                Set.drop = '3';
                if ($('#counter').val() >= 2) {
                  $('#topdown').attr('disabled', false);
                  $('#minimum').attr('disabled', false);
                }
                navBtn();

                rmb = event.target.id;
                rmb = rmb.split(/([0-9]+)/);
                addPred(rmb[1], predId);

                $('#single-predictor').attr('disabled', true);
                $('#multiple-predictor').attr('disabled', true);
                $('#multi-hurdle').attr('disabled', true);
              },
            });
          }

          x = Number(x) + 1;
          $('#addCounter').val(x);

          removeHolder();
        },
      });
    }
  });
};

function addSetting() {
  // find holder id then replace id
  let x = $('#addCounter').val();
  $('.drop')
    .attr('id', 'holder' + x)
    .addClass('droppable' + x)
    .removeClass('drop');

  //id="minimum3"
  $('.ch-holder')
    .addClass('choosen-holder' + x)
    .removeClass('ch-holder');

  $('.selector')
    .attr('id', 'selector' + x)
    .removeClass('selector');

  $('.weight-select')
    .attr('id', 'weight' + x)
    .attr('data-class', 'weight' + x)
    .removeClass('weight-select');

  $('.rmb')
    .addClass('rmb' + x)
    .attr('data-remove', 'holder' + x + '*' + 'selector' + x)
    .removeClass('rmb');
}

let removeHolder = () => {
  $('.remove').on('click', function (res) {
    let allClass = $(this).attr('data-remove'),
      ndrop = Set.drop,
      predId = $(this).attr('data-predid'),
      totalWeight,
      a = 0,
      y,
      id;

    if (allClass != '') {
      id = allClass;
      id = id.split('*');

      y = id[0];
      y = y.split(/([0-9]+)/);

      for (let z = 1; z <= 4; z++) {
        totalWeight = $('#weight' + z).val();
        if (typeof totalWeight !== 'undefined') {
          a = a + Number($('#weight' + z).val());
        }
      }
      a = a - Number($('#weight' + y[1]).val());

      if (a < 100 || a > 100) {
        $('#percentage').removeClass('text-primary');
        $('#percentage').addClass('text-danger');
        $('#percentage').html(a + '%');
      } else {
        $('#percentage').removeClass('text-danger');
        $('#percentage').addClass('text-primary');
        $('#percentage').html(a + '%');
      }

      $('#' + id[0]).remove();
      $('#' + id[1]).remove();
      $('.btn-method').removeClass('btn-active');
      $('.method').html(`<option value="0" selected>Select the Score</option>`);
    }
    removeDropped(predId);
    // revertPred(predId);
    if (ndrop == 3) {
      displayPredTable(1);
    } else {
      displayPredTable(3);
    }
  });
};

function addPred(x, predId) {
  $('.rmb' + x).attr('data-predid', predId);
}

function removeDropped(id) {
  let x = 0;
  Set.dropped.map(res => {
    if (res.predId == id) {
      Set.dropped.splice(x, 1);
    }
    x = x + 1;
  });
  Set.Predictors[0].map(pred => {
    if (pred.predId == id) {
      pred.status = 1;
    }
  });
}
export default holderCompensatory;
