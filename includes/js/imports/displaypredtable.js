let displayPredTable = val => {
  $('#predictors-table').html('');
  Set.Predictors.map(({ name, type, status, predId }) => {
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

    if (x == '' || x == type) {
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
      Set.Predictors[predId - 1].status = 1;
      revertPredictor(ui.draggable);
      ui.draggable.addClass('col-md-6');
    },
  });
};

function revertPredictor($item) {
  let $revert = $('#predictors-table');
  $item.hide(function () {
    var $list = $($revert).length
      ? $($revert)
      : $('<div id="predictors-table"/>').html($revert);

    $item.prependTo($list).show(function () {
      displayPredTable(2);
    });
  });
}

export default displayPredTable;
