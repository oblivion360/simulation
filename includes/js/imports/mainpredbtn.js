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
      holderMultiple();
    } else {
      $('.subPred-btn').attr('disabled', true);
      $('.subPred-btn').removeClass('subBtn-active');
      holderSingle();
    }
  });
};

export default mainPredBtn;
