let Setting = () => {
  $('#next').on('click', function () {
    let type = Set.drop,
      length = Set.dropped.length,
      dropped = Set.dropped,
      stage,
      newStage,
      counter = $('#counter').val();

    // set all alert
    if ((type == 2 || type == 3) && counter == 1) {
      alert('Need at Least two drop');
    } else {
      Set.finalDrop.push(dropped);
      Set.Stages.map((stageId, status) => {
        if (status == 1) {
          stage = Number(stageId);
          newStage = Number(stageId + 1);
        }
      });
      Set.Stages.map((stageId, status) => {
        if (stageId == stage) {
          status = 2;
        } else if (stageId == newStage) {
          status = 1;
        }
      });
      stageActive();
    }
  });
};

function stageActive() {}

export default Setting;
