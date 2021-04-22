import displayPredTable from './displaypredtable.js';
import holderSingle from './holdersingle.js';
import holderMultiple from './holdermultiple.js';

let mainPredBtn = () => {
  let stage = $('#stage').val();
  // choosing a Predictor btn
  $('.pred-btn').on('click', e => {
    let btn = e.target.dataset.btn;
    $('.btn').removeClass('btn-active');
    $('#' + btn).addClass('btn-active');
    $('#counter').val(1);
    displayPredTable(3);

    if (btn == 'multiple-predictor') {
      // remove the finalDrop
      let fdtrue = Set.finalDrop.some(fd => fd.stage == stage),
        fd = Set.finalDrop.filter(fd => fd.stage == stage),
        index,
        index2;

      if (fdtrue) {
        index = Number(
          Set.finalDrop.findIndex(fds => fds.predId == fd[0].predId)
        );
        index2 = fd.length;
        Set.finalDrop.splice(index, index2);
      }

      $('.subPred-btn').attr('disabled', false);
      $('#multi-hurdle').addClass('subBtn-active');
      $('#compensatory').removeClass('subBtn-active');
      $('.subPred-btn').removeClass('d-none');
      setBackPredictors('multiple');
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
    } else {
      // remove the finalDrop
      let fdtrue = Set.finalDrop.some(fd => fd.stage == stage),
        fd = Set.finalDrop.find(fd => fd.stage == stage),
        index,
        index2;

      if (fdtrue) {
        index = Number(Set.finalDrop.findIndex(fds => fds.predId == fd.predId));
        index2 = index + 1;
        console.log(index + ':' + index);
        if (index != 0) {
          Set.finalDrop.splice(index, index);
        } else {
          Set.finalDrop.splice(index, index2);
        }
      }
      console.log('single');
      $('.subPred-btn').attr('disabled', true);
      $('.subPred-btn').removeClass('subBtn-active');
      $('.subPred-btn').addClass('d-none');

      setBackPredictors('single');
      holderSingle();
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
    //set back button Multiple
    $('#multiple-predictor').attr('disabled', false);
  } else if (type == 'multiple') {
    Set.dropped.map(res => {
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

export default mainPredBtn;
