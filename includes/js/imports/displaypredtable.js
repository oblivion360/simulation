let displayPredTable = val => {
  $('#predictors-table').html('');
  // console.log(Set.finalDrop.length);

  if (Set.finalDrop.length == 0) {
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
  } else {
    // set the pridictor that is save
    Set.finalDrop.map(fd => {
      let fpred = fd.predId;
      Set.Predictors[0].map(pred => {
        if (fpred == pred.predId) {
          pred.status = 2;
        }
      });
    });
    // now display pridictors
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
  }

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
      removeDropped(Set.Predictors[0][predId - 1].predId);
      revertPredictor(ui.draggable);
      setBack();
      ui.draggable.addClass('col-md-6');

      if (ndrop == 1) {
        $('#multiple-predictor').attr('disabled', false);
        $('#next').attr('disabled', false);
      } else if (ndrop == 2) {
        let counter = $('#counter').val();
        counter = counter - 1;
        if (counter == 1) {
          $('#single-predictor').attr('disabled', false);
          $('#compensatory').attr('disabled', false);
          $('#next').attr('disabled', false);
        } else if (counter == 2) {
          $('#next').attr('disabled', true);
        }
        $('#counter').val(counter);
      } else if (ndrop == 3) {
        let counter = $('#counter').val(),
          cdId;
        cdId = counter;
        counter = counter - 1;

        if (counter == 1) {
          $('#single-predictor').attr('disabled', false);
          $('#multi-hurdle').attr('disabled', false);
          $('#next').attr('disabled', false);
          $('#weight' + counter).val(0);
        } else {
          $('#next').attr('disabled', true);
          $('#weight' + counter).val(0);
        }

        $('.method').val(0);
        $('#counter').val(counter);
      }
    },
  });

  function next() {
    console.log('Next');
  }
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
  let drop = Set.drop,
    counter = $('#counter').val();
  //for single method
  if (drop == 1) {
    $('.method').html(`<option value="0" selected>Pls Choose</option>`);

    //set method btn to not active
    $('.btn-method').removeClass('btn-active');
    $('.btn-method').attr('disabled', true);
  } else if (drop == 2) {
    counter = counter - 1;
    $('.method' + counter).html(
      `<option value="0" selected>Pls Choose</option>`
    );

    //set method btn to not active
    $('#topdown' + counter)
      .removeClass('btn-active')
      .attr('disabled', true);
    $('#minimum' + counter)
      .removeClass('btn-active')
      .attr('disabled', true);
  }
}

function removeDropped(id) {
  let x = 0;
  Set.dropped.map(res => {
    if (res.predId == id) {
      Set.dropped.splice(x, 1);
    }
    x = x + 1;
  });
}

export default displayPredTable;
