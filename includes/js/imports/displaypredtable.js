let displayPredTable = val => {
  $('#predictors-table').html('');

  Set.Predictors[0].map(({ name, type, status, predId }) => {
    let x = val,
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
    // ${newType}
    $('#predictors-table').append(`       
      <div class="col-md-6 drag-btn ${drag} ${newType}" data-drag="${predId}">
        <div class="drag-box ${state}">    
          ${name}     
        </div>  
      </div>`);
  });

  // draggable
  $('.draggable').draggable({
    revert: 'invalid',
    containment: 'document',
    helper: 'clone',
    zIndex: 100,
  });

  // droppable
  $('#predictors-table').droppable({
    accept: '.draggable',
    drop: function (event, ui) {
      let predId = ui.draggable[0].dataset['drag'];
      let ndrop = Set.drop;
      $('#methodType').val(1);
      Set.Predictors[0][predId - 1].status = 1;
      revertPredictor(ui.draggable);
      setBack();
      ui.draggable.addClass('col-md-6');
      if (ndrop == 1) {
        $('#multiple-predictor').attr('disabled', false);
      } else if (ndrop == 2) {
        let counter = $('#counter').val();
        counter = counter - 1;
        if (counter == 1) {
          $('#single-predictor').attr('disabled', false);
          $('#compensatory').attr('disabled', false);
        }
        $('#counter').val(counter);
      } else if (ndrop == 3) {
        let counter = $('#counter').val();
        counter = counter - 1;
        if (counter == 1) {
          $('#single-predictor').attr('disabled', false);
          $('#multi-hurdle').attr('disabled', false);
          $('#counter').val(1);
        }
        $('#counter').val(counter);
      }
    },
  });
};

function revertPredictor($item) {
  let $revert = $('#predictors-table'),
    ndrop = Set.drop;

  $item.hide(function () {
    var $list = $($revert).length
      ? $($revert)
      : $('<div id="predictors-table"/>').html($revert);

    $item.prependTo($list).show(function () {
      if (ndrop == 3) {
        displayPredTable(1);
      } else {
        displayPredTable(3);
      }
    });
  });
}

function setBack() {
  //for single method
  $('.method').html(`<option value="0" selected>Pls Choose</option>`);

  //set method btn to not active
  $('.btn-method').removeClass('btn-active');
  $('.btn-method').attr('disabled', true);
}

export default displayPredTable;
