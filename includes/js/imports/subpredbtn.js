import displayPredTable from './displaypredtable.js';
import holderCompensatory from './holdercompensatory.js';
import holderMultiple from './holdermultiple.js';

let subPredBtn = () => {
  $('.subPred-btn').on('click', e => {
    let btn = e.target.id;
    if (btn == 'compensatory') {
      $('.subPred-btn').removeClass('subBtn-active');
      $('#compensatory').addClass('subBtn-active');
      setBackPredictors('compensatory');
      displayPredTable(1);

      holderCompensatory();
    } else {
      setBackPredictors('multiple');
      $('.subPred-btn').removeClass('subBtn-active');
      $('#multi-hurdle').addClass('subBtn-active');

      displayPredTable(3);

      holderMultiple();
    }
  });
};

function setBackPredictors(type) {
  if (type == 'multiple') {
    Set.dropped.map(res => {
      console.log(res);
      Set.Predictors[0].map(pred => {
        if (pred.predId == res.predId) {
          pred.status = 1;
        }
      });
    });
    Set.dropped = [];
    displayPredTable(3);
    $('#single-predictor').attr('disabled', false);
    $('#compensatory').attr('disabled', false);
    $('#counter').val(1);
  } else {
    Set.dropped = [];
  }
}

export default subPredBtn;
