let Multi = (num, fd, id) => {
  // for Single and Multi PredType
  let Pred,
    value,
    value1,
    scores,
    weightValue,
    totalResult,
    displayResult,
    mtype,
    start,
    failed,
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
    failed = Set.failedCandidates.some(fc => fc.cId == res.cId);
    if (failed == true && num != 1) {
      scored = '';
    }
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
  $('#finalScore' + num).html(`
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
      console.log(
        'Name: ' +
          res.name +
          ' Scored: ' +
          scored +
          ' Value: ' +
          value +
          ' TypeOf: ' +
          typeof scored
      );
      if (typeof scored == 'number') {
        if (scored >= value) {
          displayResult = 1;
        } else {
          displayResult = 2;
        }
      } else {
        // value = value;

        if (value.toLowerCase() == scored.toLowerCase()) {
          displayResult = 1;
        } else {
          displayResult = 2;
        }

        if (scored == 'Fail' || scored == 'No') {
          scored = 0;
          // console.log('Failed ID: ' + res.cId + 'SCORE: ' + sc.score);
        } else {
          // console.log('Passed ID: ' + res.cId + 'SCORE: ' + sc.score);
          scored = 1;
        }
      }
      // Set.data.InsertFinal(res.cId, displayResult);

      Set.data.InsertMultiResult(res.cId, scored, num, displayResult, num);
    });
  } else {
    let displayResult,
      scored,
      a = 1;
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
          // console.log('ID: ' + res.cId + 'SCORE: ' + sc.score);
          if (sc.score == 'Fail' || sc.score == 'No') {
            scored = 0;
            // console.log('Failed ID: ' + res.cId + 'SCORE: ' + sc.score);
          } else {
            // console.log('Passed ID: ' + res.cId + 'SCORE: ' + sc.score);
            scored = 1;
          }
        }
      });

      Set.data.InsertMulti(res.cId, scored, num, value, id);
    });

    Set.data.InsertFinalMulti();
  }
  totalResult = Set.FinalMulti.sort(function (x, y) {
    var n = x.stage - y.stage;
    if (n !== 0) {
      return n;
    }
    return x.cId - y.cId;
  });

  totalResult.map(tr => {
    // console.log('tr.Stage: ' + tr.stage);
    failed = Set.failedCandidates.some(fc => fc.cId == tr.cId);
    if (tr.stage == num) {
      if (tr.result == 1 && tr.scored != 0) {
        if (failed == true && num != 1) {
          displayResult = '<span class="text-danger">N/A</span>';
        } else {
          displayResult = 'Pass';
        }
        Set.data.InsertFinal(tr.cId, 1);
      } else if (tr.result == 1 && tr.scored == 0) {
        if (failed == true && num != 1) {
          displayResult = '<span class="text-danger">N/A</span>';
        } else {
          displayResult = '<span class="text-danger">Failed</span>';
        }

        Set.data.InsertFinal(tr.cId, 2);
      } else {
        if (failed == true && num != 1) {
          displayResult = '<span class="text-danger">N/A</span>';
        } else {
          displayResult = '<span class="text-danger">Failed</span>';
        }
        Set.data.InsertFinal(tr.cId, 2);
      }
      // console.log('FinalScore2: ' + id + ' Stage:' + num);
      $('#Score' + id + '' + num).append(`
        <td class='text-align-center'>${displayResult}</td>
       `);
    }
    if (tr.result == 2) {
      Set.data.InsertFailedCandidates(tr.cId);
    }
  });
};

export default Multi;
