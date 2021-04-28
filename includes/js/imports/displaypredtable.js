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
      let predId = ui.draggable[0].dataset['drag'],
        dataNum = ui.draggable[0].dataset['num'],
        stage = $('#stage').val(),
        id = ui.draggable[0].dataset['num'],
        ndrop = Set.drop;
      $('#methodType').val(1);

      //set drop
      if (ndrop == 1) {
        $('#multiple-predictor').attr('disabled', false);
        $('#next').attr('disabled', false);
        $('.choosen-holder').html('Drag Predictor Here');
        // remove the finalDrop
        let fdtrue = Set.finalDrop.some(fd => fd.stage == stage),
          fd = Set.finalDrop.find(fd => fd.stage == stage),
          index,
          index2;

        if (fdtrue) {
          index = Number(
            Set.finalDrop.findIndex(fds => fds.predId == fd.predId)
          );
          index2 = index + 1;
          if (index != 0) {
            Set.finalDrop.splice(index, index);
          } else {
            Set.finalDrop.splice(index, index2);
          }
        }
      } else if (ndrop == 2) {
        if (id) {
          let counter = $('#counter').val();
          counter = counter - 1;
          $('#holder' + dataNum).droppable('enable');
          $('.choosen-holder' + id).html('Drag Predictor Here');
          if (counter == 1) {
            $('#single-predictor').attr('disabled', false);
            $('#compensatory').attr('disabled', false);
            $('#next').attr('disabled', false);
          } else if (counter == 2) {
            $('#next').attr('disabled', true);
          }
          $('#counter').val(counter);

          let fdtrue = Set.finalDrop.some(fd => fd.stage == stage),
            fd = Set.finalDrop.find(fd => fd.stage == stage),
            index,
            index2;

          if (fdtrue) {
            index = Number(
              Set.finalDrop.findIndex(fds => fds.predId == predId)
            );
            index2 = index + 1;
            if (index != 0) {
              Set.finalDrop.splice(index, index);
            } else {
              Set.finalDrop.splice(index, index2);
            }
          }
        }
      } else if (ndrop == 3) {
        if (id) {
          $('#holder' + dataNum).droppable('enable');
          let counter = $('#counter').val(),
            totalWeight,
            a = 0,
            cdId;
          cdId = counter;
          counter = counter - 1;
          // console.log('.choosen-holder' + id);
          $('.choosen-holder' + id).html('Drag Predictor Here');
          console.log(counter);
          if (counter == 1) {
            // delete pred

            $('#single-predictor').attr('disabled', false);
            $('#multi-hurdle').attr('disabled', false);
            $('#next').attr('disabled', false);
            // $('#weight' + counter).val(0);
          } else {
            $('#next').attr('disabled', true);
            // $('#weight' + counter).val(0);
          }

          for (let z = 1; z <= 4; z++) {
            totalWeight = $('#weight' + z).val();
            if (typeof totalWeight !== 'undefined') {
              a = a + Number($('#weight' + z).val());
            }
          }
          a = a - Number($('#weight' + id).val());

          if (a < 100 || a > 100) {
            $('#percentage').removeClass('text-primary');
            $('#percentage').addClass('text-danger');
            $('#percentage').html(a + '%');
          } else {
            $('#percentage').removeClass('text-danger');
            $('#percentage').addClass('text-primary');
            $('#percentage').html(a + '%');
          }

          $('#weight' + id).val(0);
          $('.method').val(0);
          $('#counter').val(counter);
        }
      }

      Set.Predictors[0][predId - 1].status = 1;
      removeDropped(Set.Predictors[0][predId - 1].predId);
      revertPredictor(ui.draggable);
      id = ui.draggable;
      id = id[0].dataset.num;
      setBack(id);
      ui.draggable.addClass('col-md-6');

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

function setBack(id) {
  let drop = Set.drop,
    counter = id;
  if (id) {
    //for single method
    if (drop == 1) {
      console.log('drop1 ' + id);
      $('.method').html(`<option value="0" selected>Select the Score</option>`);

      //set method btn to not active
      $('.btn-method').removeClass('btn-active');
      $('.btn-method').attr('disabled', true);
    } else if (drop == 2) {
      console.log('drop2 ' + id);
      $('.method' + counter).html(
        `<option value="0" selected>Select the Score</option>`
      );

      //set method btn to not active
      $('#topdown' + counter)
        .removeClass('btn-active')
        .attr('disabled', true);
      $('#minimum' + counter)
        .removeClass('btn-active')
        .attr('disabled', true);
    } else if (drop == 3) {
      console.log('drop3 ' + id);
      $('.btn-method').removeClass('btn-active');
      $('.method').html(`<option value="0" selected>Select the Score</option>`);
      $('.weight' + counter).html(
        `<option value="0" selected>Select the Weightage</option>`
      );
      //set method btn to not active
      console.log($('#counter').val());
      if ($('#counter').val() <= 2) {
        $('#topdown').removeClass('btn-active').attr('disabled', true);
        $('#minimum').removeClass('btn-active').attr('disabled', true);
      }
    }
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
