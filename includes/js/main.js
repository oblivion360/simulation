import mainPredBtn from './imports/mainpredbtn.js';
import subPredBtn from './imports/subpredbtn.js';
import displayPredTable from './imports/displaypredtable.js';
import Summary from './imports/summary.js';

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
            $('.nav-btn').attr('disabled', true);
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
          },
        });
      } else if (stageId == 6) {
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
    counter = $('#counter').val();

  newStage = Number(stage + 1);
  console.log(stage);
  if (stage <= 4) {
    // set all alert
    if (type >= 2 && counter == 2 && length == 0) {
      alert('Need at Least two drop');
    } else if (type >= 2 && counter > 2 && length != 0) {
      dropped.map(val => {
        Set.finalDrop.push(val);
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
    } else if (type == 1 && counter >= 1 && length != 0) {
      dropped.map(val => {
        Set.finalDrop.push(val);
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
    } else {
      alert('Need at Least two drop');
    }
  } else if (stage == 5) {
    stageActive();
  }
});
