import mainPredBtn from './imports/mainpredbtn.js';
import subPredBtn from './imports/subpredbtn.js';
import displayPredTable from './imports/displaypredtable.js';
import Summary from './imports/summary.js';
import SummarySettings from './imports/sub/final/summary-settings.js';

$(function () {
  stageActive();
});

function stageActive() {
  // set witch stage are we now
  Set.Stages.map(({ other, status, stageId }) => {
    // this is for the active stage
    if (status == 1) {
      // for menu active
      $('.nav-link').removeClass('active');

      $(`#${other}`).addClass('active');
      $('#stage').val(stageId);

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
            $('#predictors-table').droppable({
              accept: '#trash li',
              classes: {
                'ui-droppable-active': 'custom-state-active',
              },
              drop: function (event, ui) {
                recycleImage(ui.draggable);
              },
            });

            //mainPredBtn Click
            mainPredBtn();

            //subPredBtn Click
            subPredBtn();

            // display predictor table
            displayPredTable(0);
            // Settings();

            // feather.replace();
            if (stageId == 1) {
              $('#prev').attr('disabled', true).removeClass('btn-stage-active');
              $('#next').attr('disabled', false).addClass('btn-stage-active');
            } else {
              $('.nav-btn')
                .attr('disabled', false)
                .addClass('btn-stage-active');
            }
          },
        });
      } else if (stageId == 5) {
        $.ajax({
          type: 'GET',
          crossDomain: true,
          url: 'components/pages/summary.html',
          dataType: 'html',
          success: function (res) {
            // show page
            $('#content').html(res);

            Summary();
            SummarySettings();
          },
        });
      }
    }
  });
}

$('#next').on('click', function () {
  let type = Set.drop,
    length = Set.dropped.length,
    dropped = Set.dropped,
    stage = Number($('#stage').val()),
    newStage,
    newDrop,
    counter = $('#counter').val();

  newStage = Number(stage + 1);

  if (stage <= 4) {
    if (length == 0) {
      Set.Stages.map(st => {
        // console.log(stage);
        if (st.stageId == stage) {
          st.status = 2;
        } else if (st.stageId == newStage) {
          st.status = 1;
        }
      });
      stageActive();
    } else {
      Set.dropped.map(val => {
        newDrop = Set.finalDrop.some(element => element.predId == val.predId);

        if (newDrop == false) {
          Set.finalDrop.push(val);
        }
      });
      Set.Stages.map(st => {
        // console.log(stage);
        if (st.stageId == stage) {
          st.status = 2;
        } else if (st.stageId == newStage) {
          st.status = 1;
        }
      });
      stageActive();
    }
  } else if (stage == 5) {
    stageActive();
  } else {
    // add the download pard
  }
});

$('#prev').on('click', function () {
  let type = Set.drop,
    length = Set.dropped.length,
    dropped = Set.dropped,
    stage = Number($('#stage').val()),
    newStage,
    newDrop,
    counter = $('#counter').val();

  newStage = Number(stage - 1);

  if (stage <= 4) {
    if (length == 0) {
      Set.Stages.map(st => {
        // console.log(stage);
        if (st.stageId == stage) {
          st.status = 2;
        } else if (st.stageId == newStage) {
          st.status = 1;
        }
      });
      stageActive();
    } else {
      Set.dropped.map(val => {
        newDrop = Set.finalDrop.some(element => element.predId == val.predId);

        if (newDrop == false) {
          Set.finalDrop.push(val);
        }
      });
      Set.Stages.map(st => {
        // console.log(stage);
        if (st.stageId == stage) {
          st.status = 2;
        } else if (st.stageId == newStage) {
          st.status = 1;
        }
      });
      stageActive();
    }
  } else if (stage == 5) {
    stageActive();
  }
});
