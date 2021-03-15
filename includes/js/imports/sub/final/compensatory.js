let Compensatory = (num, fd, id) => {
  // for Single and Multi PredType
  let Pred,
    value,
    value1,
    weightValue,
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
  } else {
    mtype = 'Top-Down';
  }
  value = fd.value;
  $('#finalBody' + num).append(`
      <tr id='finalScore${id}${num}'>
            <th scope="row">${Pred} (${value}%)</th>
            
      </tr>
  `);

  Set.Candidates[0].map(res => {
    // console.log(res.scores);
    let scored;
    res.scores.map(sc => {
      if (fd.predId == sc.predId && fd.stage == num) {
        scored = sc.score;
      }
    });

    $('#finalScore' + id + '' + num).append(`
        <td class='text-align-center'>${scored}</td>
      `);
  });
  $('#finalTotal' + num).html(`
      <tr id='Score${id}${num}'>
            <th scope="row">TOTAL (100%)</th>
            
      </tr>
  `);
  $('#finalScore' + num).html(`
      <tr id='Score${id}${num}'>
            <th scope="row">STATUS</th>
            
      </tr>
  `);
};

export default Compensatory;
