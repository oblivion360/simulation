import displayPredTable from './displaypredtable.js';
import holderSingle from './holdersingle.js';
import holderMultiple from './holdermultiple.js';

let mainPredBtn = () => {
  // choosing a Predictor btn
  $('.pred-btn').on('click', e => {
    let btn = e.target.dataset.btn;
    $('.btn').removeClass('btn-active');
    $('#' + btn).addClass('btn-active');

    displayPredTable(3);

    if (btn == 'multiple-predictor') {
      $('.subPred-btn').attr('disabled', false);
      $('#multi-hurdle').addClass('subBtn-active');
      $('#compensatory').removeClass('subBtn-active');
      $('.subPred-btn').removeClass('d-none');
      holderMultiple();
    } else {
      $('.subPred-btn').attr('disabled', true);
      $('.subPred-btn').removeClass('subBtn-active');
      $('.subPred-btn').addClass('d-none');
      setBackPredictors('single');
      holderSingle();
    }
  });
};

function setBackPredictors(type) {
  if (type == 'single') {
    Set.dropped.map(res => {
      Set.Predictors[0].map(pred => {
        if (pred.predId == res.predId) {
          pred.status = 1;
        }
      });
    });
    Set.dropped = [];
    displayPredTable(3);
  } else if (type == 'multiple') {
  } else {
    Set.dropped = [];
  }

  //set back button Multiple
  $('#multiple-predictor').attr('disabled', false);
}

export default mainPredBtn;
