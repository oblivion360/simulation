import displayPredTable from '../../displaypredtable.js';
import Multiple from '../single/multi.js';
let holderMultiple = (fd, stageId) => {
  Set.drop = '2';
  $.ajax({
    type: 'GET',
    crossDomain: true,
    url: 'components/content/holder-multi-hurdle.html',
    dataType: 'html',
    success: function (res) {
      // show page
      $('#predictor-holder').html(res);
      $('#methodType').val(1);
      setFinalDrop(fd, stageId);
      for (let z = 1; z <= 2; z++) {
        $('.droppable' + z).droppable({
          accept: '.draggable',
          drop: function (event, ui) {
            let predId = ui.draggable[0].dataset['drag'],
              id;
            $('#methodType').val(1);
            Set.Predictors[0][predId - 1].status = 2;
            id = event.target.id;
            id = id.split(/([0-9]+)/);

            addPredictors(ui.draggable, id[1]);
            Multiple();
            showMethod(predId, id[1]);
            saveDrop(predId, id[1]);
            navBtn();

            Set.drop = '2';

            $('#single-predictor').attr('disabled', true);
            $('#compensatory').attr('disabled', true);
          },
        });
      }
      multiHurdle();
    },
  });
};

// additional
function addPredictors($item, x) {
  let $trash = $('.choosen-holder' + x),
    z = $('#counter').val();
  $item.hide(function () {
    var $list = $($trash).length
      ? $($trash)
      : $(`<div class="choosen-holder{x}"/>`).html($trash);
    $('.choosen-holder' + x).html('');
    $item.appendTo($list).show(function () {
      $item.removeClass('col-md-6 drag-btn');
      $item.addClass('drop-btn');
      $item.attr('data-num', x);
      displayPredTable(3);
      $item.find('.drag-box').animate({ height: '48px' });
    });
    z = Number(z) + 1;
    $('#counter').val(z);
  });
}

function showMethod(predId, x) {
  $('.method' + x).attr('data-predid', predId);
  $('.method' + x).html(`<option value="0" selected>Select the Score</option>`);
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

function saveDrop(predId, x) {
  if (typeof Set.dropped[0] == 'undefined') {
    Set.data.Dropped(predId);
    //console.log(Set.dropped);
  } else {
    // Set.dropped = [];
    Set.data.Dropped(predId);
    //console.log(Set.dropped);
  }

  let btn = [];
  btn = Set.Predictors[0].find(pred => pred.predId == predId);
  // console.log(btn);
  if (btn.valueType == 2) {
    $('#topdown' + x).attr('disabled', 'true');
    $('#minimum' + x).removeAttr('disabled');
    $('#minimum' + x).addClass('btn-active');
  } else {
    $('#minimum' + x).removeAttr('disabled');
    $('#topdown' + x).removeAttr('disabled');
    $('#minimum' + x).addClass('btn-active');
  }
}

function navBtn() {
  let stage = Number($('#stage').val());
  // console.log('navBtn: ' + stage);
  if (stage == 1) {
    $('.nav-btn').attr('disabled', true);
  } else {
    $('#next').attr('disabled', true).removeClass('btn-stage-active');
    $('#prev').attr('disabled', false).addClass('btn-stage-active');
  }
}

let multiHurdle = () => {
  $('.add-button').on('click', function () {
    let x = $('#addCounter').val();
    $('#methodType').val(1);
    let newPred = [];
    Set.Predictors[0].map(pred => {
      if (pred.status == 1) {
        newPred.push(pred);
      }
    });
    if (newPred.length != 0) {
      $.ajax({
        type: 'GET',
        crossDomain: true,
        url: 'components/content/multi-hurdle.html',
        dataType: 'html',
        success: function (res) {
          // show page
          $('#holder-button').append(res);

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
                addPredictors(ui.draggable, id[1]);
                Multiple();
                showMethod(predId, id[1]);
                saveDrop(predId, id[1]);
                navBtn();
                rmb = event.target.id;
                rmb = rmb.split(/([0-9]+)/);
                Set.drop = '2';
                addPred(rmb[1], predId);
                console.log('drop 2');
                $('#single-predictor').attr('disabled', true);
                $('#compensatory').attr('disabled', true);
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

  $('.selector')
    .attr('id', 'selector' + x)
    .removeClass('selector');

  //id="minimum3"
  $('.ch-holder')
    .addClass('choosen-holder' + x)
    .removeClass('ch-holder');
  $('.min')
    .attr('id', 'minimum' + x)
    .attr('data-method', 'method' + x)
    .attr('data-counter', 'topdown' + x)
    .removeClass('min');

  $('.top')
    .attr('id', 'topdown' + x)
    .attr('data-method', 'method' + x)
    .attr('data-counter', 'minimum' + x)
    .removeClass('top');

  $('.method-select')
    .addClass('method' + x)
    .attr('data-class', 'method' + x)
    .removeClass('method-select');

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
      stage = $('#stage').val(),
      id;

    // remove the finalDrop
    let fdtrue = Set.finalDrop.some(fd => fd.stage == stage),
      fd = Set.finalDrop.find(fd => fd.stage == stage),
      index,
      index2;
    console.log(predId);
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

      $('#' + id[0]).remove();
      $('#' + id[1]).remove();
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

function revertPred(id) {
  // add the log
  Set.Predictors[0].map(({ name, type, status, predId }) => {
    let x = Set.drop,
      state = '',
      drag = '',
      newType = '';

    if (status != 1 || predId == 9) {
      newType = 'pred-hide';
    }
    if (type == x) {
      state = 'disabled';
    } else {
      state = '';
    }

    if (x == type) {
      state = 'drag-disabled';
    } else if (x == 3) {
      drag = 'draggable';
      state = 'drag-active';
    } else if (x == 0) {
      state = 'drag-disabled';
    } else {
      drag = 'draggable';
      state = 'drag-active';
    }
    if (predId == id) {
      // ${newType}
      $('#predictors-table').append(`       
        <div class="col-md-6 drag-btn ${drag} ${newType}" data-drag="${predId}">
          <div class="drag-box ${state}">    
            ${name}     
          </div>  
        </div>`);
    }
  });
}

function setFinalDrop(fd, stageId) {
  //button activate
  $('.pred-btn').removeClass('btn-active');
  $('#multiple-predictor').addClass('btn-active');
  $('#multi-hurdle').addClass('subBtn-active');
  $('.pred-btn').attr('disabled', false);
  $('#single-predictor').attr('disabled', true);
  $('.subPred-btn').attr('disabled', false);
  $('.subPred-btn').removeClass('d-none');
  $('#compensatory').attr('disabled', true);

  //map the fd result
  let x = 1;
  fd.map(res => {
    let predId = res.predId,
      methodType = res.methodType,
      valueType,
      value = res.value;

    // Add Predictor to holder
    let pred = Set.Predictors[0].find(pd => pd.predId == predId);
    valueType = pred.valueType;
    //set 1 to 2 counter
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
      Multiple();
    } else {
      // set 3 to ... counter
      // Add the setting for method choosen
      addSlot(x, predId, methodType, value, pred, valueType);
    }

    // Add the setting for method choosen
    $('.method' + x).attr('data-predid', predId);
    $('.btn-method').attr('disabled', false);
    if (methodType == 1) {
      $('#minimum' + x).addClass('btn-active');
    } else {
      $('#topdown' + x).addClass('btn-active');
    }

    if (valueType == 2) {
      $('#topdown' + x).attr('disabled', true);
    }

    //display the selected value
    $('.method' + x).html(`<option value="0" >Select the Score</option>`);
    if (methodType == 1) {
      let selected, selected1, selected2;
      $('#methodType').val(1);
      Set.Predictors[0].map(res => {
        if (res.predId == predId) {
          // console.log(typeof res.start);
          if (typeof res.start == 'number') {
            let start = res.start,
              end = res.end,
              y = 0,
              add = res.add;

            do {
              y++;
              if (value == start) {
                selected = 'selected';
              } else {
                selected = '';
              }

              if (y == 1) {
                $('.method' + x).append(`
                  <option value="${start}" ${selected}>${start} ${res.textSingular}</option>
                  `);
              } else {
                $('.method' + x).append(`
                  <option value="${start}" ${selected}>${start} ${res.textPlural}</option>
                  `);
              }
              start = start + add;
            } while (start <= end);
          } else if (typeof res.start == 'string') {
            let start = res.start,
              end = res.end;
            if (value == start) {
              selected1 = 'selected';
            } else if (value == end) {
              selected2 = 'selected';
            } else {
              selected1 = '';
              selected2 = '';
            }

            $('.method' + x).append(`
                  <option value="${start}" ${selected1}>${start}</option>
                  `);
            $('.method' + x).append(`
                  <option value="${end}" ${selected2}>${end}</option>
                  `);
          }
        }
      });
    } else {
      $('#methodType').val(2);
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
        $('.method' + x).append(
          `<option value="${start}" ${selected}>Top ${start}%</option>`
        );
        start = start + add;
      } while (start <= end);
    }
    Set.dropped.push(res);
    // ADD 1 COUNTER
    x = x + 1;
  });

  // set the Add Predictor to draggable
  $('.draggable').draggable({
    revert: 'invalid',
    containment: 'document',
    helper: 'clone',
    zIndex: 100,
  });
}

function addSlot(x, predId, methodType, value, pred, valueType) {
  let newPred = [];
  Set.Predictors[0].map(pred => {
    if (pred.status == 1) {
      newPred.push(pred);
    }
  });

  $.ajax({
    type: 'GET',
    crossDomain: true,
    url: 'components/content/multi-hurdle.html',
    dataType: 'html',
    success: function (res) {
      // show page
      $('#holder-button').append(res);

      addSetting();

      $('.choosen-holder' + x).html(`
          <div
          class="draggable ui-draggable ui-draggable-handle drop-btn"
          data-drag="${pred.predId}"
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

      Multiple();

      // Add the setting for method choosen
      $('.method' + x).attr('data-predid', predId);
      $('.btn-method').attr('disabled', false);

      if (methodType == 1) {
        $('#minimum' + x).addClass('btn-active');
      } else {
        $('#topdown' + x).addClass('btn-active');
      }

      if (valueType == 2) {
        $('#topdown' + x).attr('disabled', true);
      }

      //display the selected value
      $('.method' + x).html(`<option value="0" >Select the Score</option>`);
      if (methodType == 1) {
        let selected, selected1, selected2;
        $('#methodType').val(1);
        Set.Predictors[0].map(res => {
          if (res.predId == predId) {
            // console.log(typeof res.start);
            if (typeof res.start == 'number') {
              let start = res.start,
                end = res.end,
                y = 0,
                add = res.add;

              do {
                y++;
                if (value == start) {
                  selected = 'selected';
                } else {
                  selected = '';
                }

                if (y == 1) {
                  $('.method' + x).append(`
                  <option value="${start}" ${selected}>${start} ${res.textSingular}</option>
                  `);
                } else {
                  $('.method' + x).append(`
                  <option value="${start}" ${selected}>${start} ${res.textPlural}</option>
                  `);
                }
                start = start + add;
              } while (start <= end);
            } else if (typeof res.start == 'string') {
              let start = res.start,
                end = res.end;
              if (value == start) {
                selected1 = 'selected';
              } else if (value == end) {
                selected2 = 'selected';
              } else {
                selected1 = '';
                selected2 = '';
              }

              $('.method' + x).append(`
                  <option value="${start}" ${selected1}>${start}</option>
                  `);
              $('.method' + x).append(`
                  <option value="${end}" ${selected2}>${end}</option>
                  `);
            }
          }
        });
      } else {
        $('#methodType').val(2);
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
          $('.method' + x).append(
            `<option value="${start}" ${selected}>Top ${start}%</option>`
          );
          start = start + add;
        } while (start <= end);
      }
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
            addPredictors(ui.draggable, id[1]);
            Multiple();
            showMethod(predId, id[1]);
            saveDrop(predId, id[1]);
            navBtn();
            rmb = event.target.id;
            rmb = rmb.split(/([0-9]+)/);
            Set.drop = '2';
            addPred(rmb[1], predId);

            $('#single-predictor').attr('disabled', true);
            $('#compensatory').attr('disabled', true);
          },
        });
      }

      removeHolder();
    },
  });
}

export default holderMultiple;
