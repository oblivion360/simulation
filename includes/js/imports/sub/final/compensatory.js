let Compensatory = (num, fd, id) => {
  // for Single and Multi PredType
  let Pred,
    value,
    value1,
    weightValue,
    weightValue2,
    total = 0,
    total2 = 0,
    rx = 0,
    mtype,
    z = 0,
    start,
    maxScores = [],
    maxScore;

  Set.Predictors[0].map(pred => {
    if (pred.predId == fd.predId && fd.stage == num) {
      Pred = pred.name;
      start = pred.start;
    }
  });
  weightValue = fd.weightValue;
  if (fd.methodType == 1) {
    mtype = 'Min. Competency';
    weightValue2 = weightValue + '/10';
  } else {
    mtype = 'Top-Down';
    weightValue2 = weightValue + '%';
  }
  $('#finalHeader' + num).html(`
      <tr>
            <th scope="row" colspan='12' class='text-align-center'>Compensatory Model (${mtype}: ${weightValue2})</th>
            
      </tr>
  `);
  value = fd.value;
  $('#finalBody' + num).append(`
      <tr id='finalScore${id}${num}'>
            <th scope="row">${Pred} (${value}%)</th>
            
      </tr>
  `);
  $('#finalTotal' + num).html(`
  <tr id='finalTotal${id}${num}'>
        <th scope="row">TOTAL (100%)</th>
        
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
    total2 = Number(scored) * (Number(value) / 100);
    // console.log(
    //   'Name: ' + res.name + ' Scored: ' + scored + ' Value: ' + value
    // );
    total = total + Number(total2.toFixed(2));
    if (Set.totalArray.length == 0) {
      console.log('first add');
      Set.data.Total(res.name, total);
    } else {
      // Set.totalArray[t].total = Set.totalArray[t].total + total;
      for (let t = 0; t < Set.totalArray.length; t++) {
        if (Set.totalArray[t].name == res.name) {
          console.log('if Update ' + Set.totalArray.length);
          Set.totalArray[t].total = Set.totalArray[t].total + total;
          z = 0;
        } else {
          console.log('rx ' + rx);
          if (rx == Set.totalArray.length - 1) {
            console.log('z add ' + Set.totalArray.length);
            Set.data.Total(res.name, total);
          }
          rx = rx + 1;
        }
      }
    }

    $('#finalScore' + id + '' + num).append(`
        <td class='text-align-center'>${scored}</td>
      `);
  });
  //console.log(Set.totalArray);
  $('#finalScore' + num).html(`
      <tr id='Score${id}${num}'>
            <th scope="row">STATUS</th>
            
      </tr>
  `);
};

export default Compensatory;
