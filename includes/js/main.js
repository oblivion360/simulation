import mainPredBtn from './imports/mainpredbtn.js';
import subPredBtn from './imports/subpredbtn.js';
import displayPredTable from './imports/displaypredtable.js';

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
            // feather.replace();
          },
        });
      } else if (stageId == 5) {
      } else if (stageId == 6) {
      }
    }
  });
}
