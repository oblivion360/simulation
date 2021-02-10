let displayPredTable = val => {
  $('#predictors-table').html('');
  Set.Predictors.map(({ name, type, status }) => {
    let x = val,
      state = '',
      newType = '';
    $('.drag-btn').draggable();
    if (status != 1) {
      newType = 'pred-hide';
    }
    if (type == x) {
      state = 'disabled';
    } else {
      state = '';
    }

    if (x == '') {
      state = 'disabled';
    }

    $('#predictors-table').append(` 
      
      <div class="col-md-6 ${newType} drag-btn" style='margin-bottom: 10px'>
          <button class="btn btn-block btn-info" ${state}>
             ${name}
          </button>
      </div>`);
  });
};

export default displayPredTable;
