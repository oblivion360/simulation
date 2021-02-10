$(function () {
  stageActive();
});

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
      $('#compensatory').removeClass('subBtn-active');
      holderMultiple();
    } else {
      $('.subPred-btn').attr('disabled', true);
      $('.subPred-btn').removeClass('subBtn-active');
      holderSingle();
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

      holderCompensatory();
    } else {
      $('.subPred-btn').removeClass('subBtn-active');
      $('#multi-hurdle').addClass('subBtn-active');

      displayPredTable(2);

      holderMultiple();
    }
  });
}

function holderSingle() {
  $.ajax({
    type: 'GET',
    crossDomain: true,
    url: 'components/content/holder-single-predictor.html',
    dataType: 'html',
    success: function (res) {
      // show page
      $('#predictor-holder').html(res);
    },
  });
}

function holderMultiple() {
  $.ajax({
    type: 'GET',
    crossDomain: true,
    url: 'components/content/holder-multi-hurdle.html',
    dataType: 'html',
    success: function (res) {
      // show page
      $('#predictor-holder').html(res);
      multiHurdle();
    },
  });
}

function multiHurdle() {
  $.ajax({
    type: 'GET',
    crossDomain: true,
    url: 'components/content/multi-hurdle.html',
    dataType: 'html',
    success: function (res) {
      // show page
      $('#holder-button').append(res);
    },
  });
}

function holderCompensatory() {
  $.ajax({
    type: 'GET',
    crossDomain: true,
    url: 'components/content/holder-compensatory-predictor.html',
    dataType: 'html',
    success: function (res) {
      // show page
      $('#predictor-holder').html(res);
    },
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
