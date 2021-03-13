let Summary = () => {
  let predName, method, score, pretext;
  // summary display
  Set.finalDrop.map(fd => {
    if (fd.stage == 1) {
      score = fd.value;
      Set.Predictors[0].map(pred => {
        if (pred.predId == fd.predId) {
          predName = pred.name;
          if (fd.methodType == 1) {
            if (fd.value > 1) {
              pretext = pred.textSingular + 's';
            } else {
              pretext = pred.textSingular;
            }
          } else {
            pretext = '%';
          }
        }
      });
      if (fd.methodType == 1) {
        method = 'Minimum Cometency Method';
      } else {
        method = 'Top-Down Method';
      }
      $('#resultInitial').append(`
      <div class="row mb-4">
            <div class="col-md-9">
              <div class="row">
                <div class="col-md-3">
                  <button class="btn btn-info btn-block btn-sm">${predName}</button>
                </div>
                <div class="col-md-3">${method}</div>
                <div class="col-md-3">Score: ${score} ${pretext}</div>
              </div>
              <!-- /.row -->
            </div>
          </div>
      `);
    }
  });
};

export default Summary;
