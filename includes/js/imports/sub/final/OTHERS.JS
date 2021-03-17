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

// -------------------------------------------------------------------------------------------------------------------------- //

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
