let SingleMulti = (num, fd, id) => {
  // for Single and Multi PredType
  let Pred,
    value,
    value1,
    totalResult,
    mtype,
    start,
    maxScores = [],
    maxScore;
  Set.Predictors[0].map(pred => {
    if (pred.predId == fd.predId && fd.stage == num) {
      Pred = pred.name;
      start = pred.start;
    }
  });

  if (fd.methodType == 1) {
    mtype = 'Min. Competency';
    value = fd.value;
    value1 = value;
  } else {
    mtype = 'Top-Down';
    value = fd.value;
    value1 = fd.value + '%';
  }
  //   console.log('methodType: ' + mType);

  $('#finalBody' + num).append(`
      <tr id='finalScore${id}${num}'>
            <th scope="row">${Pred} (${mtype} ${value1})</th>            
      </tr>
  `);

  Set.Candidates[0].map(res => {
    // console.log(res.scores);
    let scored;
    res.scores.map(sc => {
      if (fd.predId == sc.predId && fd.stage == num) {
        scored = sc.score;
        maxScores.push(scored);
      }
    });

    $('#finalScore' + id + '' + num).append(`
        <td class='text-align-center'>${scored}</td>
      `);
  });
  if (fd.methodType == 2) {
    maxScore = Math.max(...maxScores);
    console.log('MaxScore1: ' + maxScore);
    maxScore = (value / 100) * maxScore;
    maxScore = Math.floor(maxScore);
    console.log('MaxScore2: ' + maxScore);
  }
  $('#finalScore' + num).append(`
      <tr id='Score${id}${num}'>
            <th scope="row">Status</th>
            
      </tr>
  `);
  if (fd.methodType == 1) {
    Set.Candidates[0].map(res => {
      // console.log(res.scores);
      let scored, displayResult;
      res.scores.map(sc => {
        if (fd.predId == sc.predId && fd.stage == num) {
          scored = sc.score;
        }
      });

      if (typeof value == 'number') {
        if (scored >= value) {
          displayResult = 'Pass';
        } else {
          displayResult = '<span class="text-danger">Failed</span>';
        }
      } else {
        value = value;
        console.log(start);
        if (start.toLowerCase() == scored.toLowerCase()) {
          displayResult = 'Pass';
        } else {
          displayResult = '<span class="text-danger">Failed</span>';
        }
      }

      $('#Score' + id + '' + num).append(`
            <td class='text-align-center'>${displayResult}</td>
          `);
    });
  } else {
    let displayResult, scored;
    Set.Candidates[0].map(res => {
      res.scores.map(sc => {
        if (
          fd.predId == sc.predId &&
          fd.stage == num &&
          typeof sc.score == 'number'
        ) {
          scored = sc.score;
        } else if (
          fd.predId == sc.predId &&
          fd.stage == num &&
          typeof sc.score != 'number'
        ) {
          console.log('ID: ' + res.cId + 'SCORE: ' + sc.score);
          if (sc.score == 'Fail' || sc.score == 'No') {
            scored = 0;
            console.log('Failed ID: ' + res.cId + 'SCORE: ' + sc.score);
          } else {
            console.log('Passed ID: ' + res.cId + 'SCORE: ' + sc.score);
            scored = 1;
          }
        }
      });
    });

    Set.data.InsertFinalSingle();
    totalResult = Set.FinalSingle.sort(function (x, y) {
      var n = x.stage - y.stage;
      if (n !== 0) {
        return n;
      }
      return x.id - y.id;
    });

    totalResult.map(tr => {
      // console.log('tr.Stage: ' + tr.stage);
      if (tr.stage == num) {
        if (tr.result == 1 && tr.scored != 0) {
          displayResult = 'Pass';
        } else if (tr.result == 1 && tr.scored == 0) {
          displayResult = '<span class="text-danger">Failed</span>';
        } else {
          displayResult = '<span class="text-danger">Failed</span>';
        }
        // console.log('FinalScore2: ' + id + ' Stage:' + num);
        $('#Score' + id + '' + num).append(`
          <td class='text-align-center'>${displayResult}</td>
         `);
      }
    });
  }
};

export default SingleMulti;
