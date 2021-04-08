import displayPredTable from '../../displaypredtable.js';
import Compensatory from '../single/compensatory.js';
let holderCompensatory = (fd, stageId) => {
  Set.drop = '3';
  $.ajax({
    type: 'GET',
    crossDomain: true,
    url: 'components/content/holder-compensatory-predictor.html',
    dataType: 'html',
    success: function (res) {
      // show page
      $('#predictor-holder').html(res);
      setFinalDrop(fd, stageId);

      // set weight selector
      // for (let x = 10; x <= 100; x = x + 10) {
      //   $('.weight').append(`<option value="${x}">${x}%</option>`);
      // }

      // droppable
      for (let z = 1; z <= 2; z++) {
        $('.droppable' + z).droppable({
          accept: '.draggable',
          drop: function (event, ui) {
            let predId = ui.draggable[0].dataset['drag'],
              id;
            Set.Predictors[0][predId - 1].status = 2;
            id = event.target.id;
            id = id.split(/([0-9]+)/);
            addPredictors(ui.draggable, predId, id[1]);
            Compensatory();
            saveDrop(predId);
            console.log('drop 1');
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
    var $list = $($trash).length
      ? $($trash)
      : $(`<div class="choosen-holder{x}"/>`).html($trash);
    $('.choosen-holder' + x).html('');
    $item.appendTo($list).show(function () {
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
                console.log('drop 2');
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
      stage = $('#stage').val(),
      a = 0,
      y,
      id;

    // remove the finalDrop
    let fdtrue = Set.finalDrop.some(fd => fd.stage == stage),
      fd = Set.finalDrop.find(fd => fd.stage == stage),
      index,
      index2;

    if (fdtrue) {
      index = Number(Set.finalDrop.findIndex(fds => fds.predId == predId));
      index2 = index + 1;
      console.log(index + ':' + index);
      if (index != 0) {
        Set.finalDrop.splice(index, index);
      } else {
        Set.finalDrop.splice(index, index2);
      }
    }

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

function setFinalDrop(fd, stageId) {
  //button activate
  $('.pred-btn').removeClass('btn-active');
  $('.pred-btn').attr('disabled', true);
  $('.subPred-btn').removeClass('d-none');
  $('.subPred-btn').attr('disabled', false);
  $('#multi-hurdle').attr('disabled', true);
  $('#compensatory').addClass('subBtn-active');
  console.log(fd);
  let x = 1;
  fd.map(res => {
    let predId = res.predId,
      methodType = res.methodType,
      valueType,
      value = res.value,
      weightValue = res.weightValue;

    // Add Predictor to holder
    let pred = Set.Predictors[0].find(pd => pd.predId == predId);
    valueType = pred.valueType;
    if (x <= 2) {
      $('.choosen-holder' + x).html(`
        <div
        class="draggable ui-draggable ui-draggable-handle drop-btn"
        data-drag="${predId}"
        data-num="${x}"
        >
          <div class="drag-box drag-active" style="height: 48px">
          ${pred.name}
          </div>
        </div>
      `);
      // Add the setting for method choosen
      Compensatory();
    } else {
      // set 3 to ... counter
      // Add the setting for method choosen
      addSlot(x, predId, methodType, value, pred, valueType);
    }

    // set the Add Predictor to draggable
    $('.draggable').draggable({
      revert: 'invalid',
      containment: 'document',
      helper: 'clone',
      zIndex: 100,
    });

    //display the selected value
    $('#weight' + x).html(`<option value="0" >Select the Score</option>`);
    let start = 10,
      add = 10,
      selected,
      end = 100;

    do {
      if (value == start) {
        selected = 'selected';
      } else {
        selected = '';
      }
      $('#weight' + x).append(
        `<option value="${start}" ${selected}>${start}%</option>`
      );
      start = start + add;
    } while (start <= end);

    //Set comp
    if (methodType == 1) {
      let selected;

      $('.btn-method-comp').removeClass('btn-active');
      $('.comp').html(`<option value="0">Select the Score</option>`);
      $('#minimum').addClass('btn-active');
      $('#methodType').val(1);
      for (let y = 1; y <= 10; y++) {
        if (weightValue == y) {
          selected = 'selected';
        } else {
          selected = '';
        }
        $('.comp').append(`<option value="${y}" ${selected}>${y}</option>`);
      }
    } else {
      $('.comp').html(`<option value="0">Select the Score</option>`);
      let start = 10,
        add = 10,
        end = 100;
      do {
        if (weightValue == start) {
          selected = 'selected';
        } else {
          selected = '';
        }
        $('.comp').append(
          `<option value="${start}" ${selected}>${start}%</option>`
        );
        start = start + add;
      } while (start <= end);

      $('.btn-method-comp').removeClass('btn-active');
      $('#topdown').addClass('btn-active');
      $('#methodType').val(2);
    }

    //set total weightage
    $('#percentage').removeClass('text-danger');
    $('#percentage').addClass('text-primary');
    $('#percentage').html('100%');

    Set.dropped.push(res);
    //set x counter + 1

    x = x + 1;
    $('#counter').val(x);
  });
}

function addSlot(x, predId, methodType, value, pred, valueType) {
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
        $('.choosen-holder' + x).html(`
        <div
        class="draggable ui-draggable ui-draggable-handle drop-btn"
        data-drag="${predId}"
        data-num="${x}"
        >
          <div class="drag-box drag-active" style="height: 48px">
          ${pred.name}
          </div>
        </div>
      `);

        // set the Add Predictor to draggable
        $('.draggable').draggable({
          revert: 'invalid',
          containment: 'document',
          helper: 'clone',
          zIndex: 100,
        });
        Compensatory();

        //display the selected value
        $('#weight' + x).html(`<option value="0" >Select the Score</option>`);
        let start = 10,
          add = 10,
          selected,
          end = 100;

        do {
          if (value == start) {
            selected = 'selected';
          } else {
            selected = '';
          }
          $('#weight' + x).append(
            `<option value="${start}" ${selected}>${start}%</option>`
          );
          start = start + add;
        } while (start <= end);

        addPred(x, predId);

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
              console.log('drop 2');
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

        removeHolder();
      },
    });
  }
}
export default holderCompensatory;
