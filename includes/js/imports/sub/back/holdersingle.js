import displayPredTable from '../../displaypredtable.js';
import Single from '../single/single.js';
let holderSingle = (fd, stageId) => {
  Set.drop = '1';
  $.ajax({
    type: 'GET',
    crossDomain: true,
    url: 'components/content/holder-single-predictor.html',
    dataType: 'html',
    success: function (res) {
      // show page
      $('#predictor-holder').html(res);
      setFinalDrop(fd, stageId);
      $('.droppable').droppable({
        accept: '.draggable',
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
    $item.appendTo($list).show(function () {
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

function setFinalDrop(fd, stageId) {
  let predId = fd[0].predId,
    methodType = fd[0].methodType,
    valueType,
    value = fd[0].value;
  //button activate
  $('.pred-btn').removeClass('btn-active');
  $('#single-predictor').addClass('btn-active');
  $('.pred-btn').attr('disabled', false);
  $('#multiple-predictor').attr('disabled', true);
  $('.subPred-btn').removeClass('d-none');
  $('.subPred-btn').addClass('d-none');

  // Add Predictor to holder
  let pred = Set.Predictors[0].find(pd => pd.predId == predId);
  valueType = pred.valueType;
  $('.choosen-holder').html(`
  <div
  class="draggable ui-draggable ui-draggable-handle drop-btn"
  data-drag="${predId}"
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

  // Add the setting for method choosen
  Single();
  $('.method').attr('data-predid', predId);
  $('.btn-method').attr('disabled', false);
  if (methodType == 1) {
    $('#minimum').addClass('btn-active');
  } else {
    $('#topdown').addClass('btn-active');
  }

  if (valueType == 2) {
    $('#topdown').attr('disabled', true);
  }

  //display the selected value
  $('.method').html(`<option value="0" >Select the Score</option>`);
  if (methodType == 1) {
    let selected, selected1, selected2;

    $('#methodType').val(1);
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
            if (value == start) {
              selected = 'selected';
            } else {
              selected = '';
            }
            if (x == 1) {
              $('.method').append(`
                <option value="${start}" ${selected}>${start} ${res.textSingular}</option>
                `);
            } else {
              $('.method').append(`
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
          $('.method').append(`
                <option value="${start}" ${selected1}>${start}</option>
                `);
          $('.method').append(`
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
      $('.method').append(
        `<option value="${start}" ${selected}>Top ${start}%</option>`
      );
      start = start + add;
    } while (start <= end);
  }
  Set.dropped.push(fd[0]);
}

export default holderSingle;
