$(function () {
  stageActive();
});

function stageActive() {
  // set witch stage are we now
  Set.Stages.map(({ other, status, stageId }) => {
    // this is for the active stage
    if (status == 1) {
      // for menu active
      $(`#${other}`).addClass('active');

      // choose page
      if (stageId == 1 || stageId == 2 || stageId == 3 || stageId == 4) {
        // add page
        $.ajax({
          type: 'GET',
          crossDomain: true,
          url: 'components/pages/stage.html',
          dataType: 'html',
          success: function (res) {
            // show page
            $('#content').html(res);

            //mainPredBtn Click
            mainPredBtn();

            //subPredBtn Click
            subPredBtn();

            // display predictor table
            displayPredTable('');
          },
        });
      } else if (stageId == 5) {
      } else if (stageId == 6) {
      }
    }
  });
}

function mainPredBtn() {
  // choosing a Predictor btn
  $('.pred-btn').on('click', e => {
    let btn = e.target.dataset.btn;
    $('.btn').removeClass('btn-active');
    $('#' + btn).addClass('btn-active');

    displayPredTable(2);

    if (btn == 'multiple-predictor') {
      $('.subPred-btn').attr('disabled', false);
      $('#multi-hurdle').addClass('subBtn-active');
    } else {
      $('.subPred-btn').attr('disabled', true);
      $('.subPred-btn').removeClass('subBtn-active');
    }
  });
}

function subPredBtn() {
  $('.subPred-btn').on('click', e => {
    let btn = e.target.id;
    if (btn == 'compensatory') {
      $('.subPred-btn').removeClass('subBtn-active');
      $('#compensatory').addClass('subBtn-active');
      displayPredTable(1);
    } else {
      $('.subPred-btn').removeClass('subBtn-active');
      $('#multi-hurdle').addClass('subBtn-active');
      displayPredTable(2);
    }
  });
}

function displayPredTable(val) {
  $('#predictors-table').html('');
  Set.Predictors.map(({ name, type, status }) => {
    let x = val,
      state = '',
      newType = '';

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
    <div class="col-md-6 ${newType}" style='margin-bottom: 10px'>
        <button class="btn btn-block btn-info" ${state}>
           ${name}
        </button>
    </div>`);
  });
}
