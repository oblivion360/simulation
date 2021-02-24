import displayPredTable from './displaypredtable.js';
import holderCompensatory from './holdercompensatory.js';
import holderMultiple from './holdermultiple.js';

let subPredBtn = () => {
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

      displayPredTable(3);

      holderMultiple();
    }
  });
};

export default subPredBtn;
