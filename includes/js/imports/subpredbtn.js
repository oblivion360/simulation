import displayPredTable from './displaypredtable.js';
import holderCompensatory from './holdercompensatory.js';
import holderMultiple from './holdermultiple.js';

let subPredBtn = () => {
  let stage = $('#stage').val();
  $('.subPred-btn').on('click', e => {
    let btn = e.target.id;
    if (btn == 'compensatory') {
      $('.subPred-btn').removeClass('subBtn-active');
      $('#compensatory').addClass('subBtn-active');
      setBackPredictors('compensatory');
      displayPredTable(1);

      holderCompensatory();
      if (stage == 1) {
        $('#prev').attr('disabled', true).removeClass('btn-stage-active');
        $('#next').attr('disabled', false).addClass('btn-stage-active');
      } else {
        // $('.nav-btn').removeClass('btn-stage-active');
        // $('#prev').attr('disabled', false).addClass('btn-stage-active');
        // $('#next').attr('disabled', true);
        $('.nav-btn').attr('disabled', false).addClass('btn-stage-active');
      }
    } else {
      setBackPredictors('multiple');
      $('.subPred-btn').removeClass('subBtn-active');
      $('#multi-hurdle').addClass('subBtn-active');

      displayPredTable(3);

      holderMultiple();
      if (stage == 1) {
        $('#prev').attr('disabled', true).removeClass('btn-stage-active');
        $('#next').attr('disabled', false).addClass('btn-stage-active');
      } else {
        // $('.nav-btn').removeClass('btn-stage-active');
        // $('#prev').attr('disabled', false).addClass('btn-stage-active');
        // $('#next').attr('disabled', true);
        $('.nav-btn').attr('disabled', false).addClass('btn-stage-active');
      }
    }
  });
};

function setBackPredictors(type) {
  if (type == 'multiple') {
    Set.dropped.map(res => {
      // console.log(res);
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
    Set.dropped.map(res => {
      Set.Predictors[0].map(pred => {
        if (pred.predId == res.predId) {
          pred.status = 1;
        }
      });
    });
    Set.dropped = [];
    displayPredTable(1);
    $('#single-predictor').attr('disabled', false);
    $('#multi-hurdle').attr('disabled', false);
    $('#counter').val(1);
  }
}

export default subPredBtn;
