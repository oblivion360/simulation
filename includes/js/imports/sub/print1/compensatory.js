let Compensatory = (num, fd, id) => {
  // for Single and Multi PredType
  let Pred,
    value = 0,
    value1 = 0,
    result,
    z = 0,
    weightValue = 0,
    weightValue2,
    total = 0,
    total2 = 0,
    totalResult,
    holder = 0,
    mtype,
    b = 0,
    c = 0,
    scored = 0;

  Set.Predictors[0].map(pred => {
    if (pred.predId == fd.predId && fd.stage == num) {
      Pred = pred.name;
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
  $('#finalScore' + num).html(`
      <tr id='Score${id}${num}'>
            <th scope="row">STATUS</th>            
      </tr>
  `);

  Set.Candidates[0].map(res => {
    res.scores.map(sc => {
      if (fd.predId == sc.predId) {
        scored = sc.score;
      }
    });
    value1 = Number(value) / 100;
    total2 = scored * value1;
    holder = $('#' + res.name + '' + num).val();
    if (holder <= 0) {
      total = total2;
      // console.log(res.name + ' 1: ' + total);
    } else {
      holder = $('#' + res.name + '' + num).val();
      total = Number(holder) + total2;

      // console.log(res.name + ' 2: ' + total);
    }

    $('#' + res.name + '' + num).val(total.toFixed(2));
    $('#finalScore' + id + '' + num).append(`
      <td class='text-align-center'>${scored}</td>
    `);
  });

  Set.Candidates[0].map(cd => {
    holder = $('#' + cd.name + '' + num).val();
    $('#finalTotal' + id + '' + num).append(`
      <td class='text-align-center'>${holder}</td>
    `);
  });

  //console.log(Set.totalArray);

  if (fd.methodType == 1) {
    Set.Candidates[0].map(cd => {
      holder = $('#' + cd.name + '' + num).val();

      if (holder >= weightValue) {
        result = 'Pass';
      } else {
        result = '<span class="text-danger">Failed</span>';
      }
      console.log('FinalScore1: ' + id + ' Stage:' + num);
      $('#Score' + id + '' + num).append(`
        <td class='text-align-center'>${result}</td>
      `);
    });
  } else {
    // name, total, stage, result
    Set.Candidates[0].map(cd => {
      z = z + 1;
      holder = $('#' + cd.name + '' + num).val();
    });
    //Set.CompensatoryFinal(weightValue);

    totalResult = Set.totalResult.sort(function (x, y) {
      var n = x.stage - y.stage;
      if (n !== 0) {
        return n;
      }

      return x.id - y.id;
    });
    Set.finalDrop.map(fds => {
      if (fds.stage == num && fds.predType == 3) {
        b = b + 1;
      }
    });
    c = id + 1;
    totalResult.map(tr => {
      // console.log('tr.Stage: ' + tr.stage);
      if (tr.stage == num) {
        if (tr.result == 1) {
          result = 'Pass';
        } else {
          result = '<span class="text-danger">Failed</span>';
        }
        // console.log('FinalScore2: ' + id + ' Stage:' + num);
        $('#Score' + id + '' + num).append(`
          <td class='text-align-center'>${result}</td>
         `);
      }
    });
  }
};

export default Compensatory;
