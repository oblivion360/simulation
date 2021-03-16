$('#finalBody' + num).append(`
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
      value = value - 0.5;
      if (scored >= value) {
        displayResult = 'Pass';
      } else {
        displayResult = '<span class="text-danger">Failed</span>';
      }
    } else {
      value = value;
      console.log(start);
      if (start.toLowerCase() == scored) {
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
  Set.Candidates[0].map(res => {
    // console.log(res.scores);
    let scored, displayResult;
    res.scores.map(sc => {
      if (fd.predId == sc.predId && fd.stage == num) {
        scored = sc.score;
      }
    });

    mtype = 'Top-Down';
    //maxScore = ((value / 100) * maxScore).toFixed(2);

    if (scored >= maxScore) {
      displayResult = 'Pass';
    } else {
      displayResult = '<span class="text-danger">Failed</span>';
    }

    $('#Score' + id + '' + num).append(`
            <td class='text-align-center'>${displayResult}</td>
          `);
  });
}
