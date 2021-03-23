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
      let newPred = [];
      Set.Predictors[0].map(pred => {
        if (pred.status == 1) {
          newPred.push(pred);
        }
      });

      for (let z = 1; z <= newPred.length; z++) {
        $('.droppable' + z).droppable({
          accept: '.draggable',
          drop: function (event, ui) {
            let predId = ui.draggable[0].dataset['drag'],
              id;
            Set.Predictors[0][predId - 1].status = 2;
            id = event.target.id;
            id = id.split(/([0-9]+)/);
            addPredictors(ui.draggable, id[1]);
            Multiple();
            showMethod(predId);
            saveDrop(predId);
            navBtn();

            Set.drop = '2';

            $('#single-predictor').attr('disabled', true);
            $('#compensatory').attr('disabled', true);
          },
        });
      }
      multiHurdle();
      //multiHurdle();
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

function showMethod(predId) {
  let x = $('#counter').val();
  console.log('show method' + x);
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

let multiHurdle = () => {
  $('.add-button').on('click', function () {
    let x = $('#addCounter').val();
    $.ajax({
      type: 'GET',
      crossDomain: true,
      url: 'components/content/multi-hurdle.html',
      dataType: 'html',
      success: function (res) {
        // show page
        $('#holder-button').append(res);

        let newPred = [];
        Set.Predictors[0].map(pred => {
          if (pred.status == 1) {
            newPred.push(pred);
          }
        });
        addSetting();
        for (let z = 1; z <= newPred.length; z++) {
          $('.droppable' + z).droppable({
            accept: '.draggable',
            drop: function (event, ui) {
              let predId = ui.draggable[0].dataset['drag'],
                id,
                rmb;
              Set.Predictors[0][predId - 1].status = 2;
              id = event.target.id;
              id = id.split(/([0-9]+)/);
              addPredictors(ui.draggable, id[1]);
              Multiple();
              showMethod(predId);
              saveDrop(predId);
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

        x = Number(x) + 1;
        $('#addCounter').val(x);

        removeHolder();
      },
    });
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
      id;

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
export default holderMultiple;
