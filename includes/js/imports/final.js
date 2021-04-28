import SingleMulti from './sub/final/single-multi.js';
import Multi from './sub/final/multi.js';
import Compensatory from './sub/final/compensatory.js';
let Final = () => {
  Set.Stages.map(fd => {
    if (fd.stageId == 1) {
      stage(1);
    } // stage 2
    else if (fd.stageId == 2) {
      stage(2);
    } // stage 3
    else if (fd.stageId == 3) {
      stage(3);
    } // stage 4
    else if (fd.stageId == 4) {
      stage(4);
    }
  });

  finalResult();
};

function stage(num) {
  let id = 0,
    type = 1,
    mType;

  Set.Candidates[0].map(res => {
    $('#finalHead' + num).append(
      `<th scope="col" class='text-align-center'>${res.name}</th>`
    );
  });
  Set.Candidates[0].map(cd => {
    $('#holderTotal' + num).append(`
      <input type='hidden' id='${cd.name}${num}' value='0'/>
    `);
  });

  Set.finalDrop.map(fd => {
    if (fd.stage == num) {
      mType = fd.methodType;
      // console.log('methodType-outside: ' + mType);

      if (fd.predType == 1) {
        SingleMulti(num, fd, id, mType);
        id = id + 1;
        type = 1;
      } else if (fd.predType == 2) {
        Multi(num, fd, id, mType);
        id = id + 1;
        type = 2;
      } else if (fd.predType == 3) {
        Compensatory(num, fd, id, mType);
        id = id + 1;
        type = 2;
      }
    }
  });

  if (num == 1) {
    let stage = Set.finalDrop.some(fd => fd.stage == num);
    if (stage == false) {
      $('#resultInitial').html(`
        <p class="text-summary">
             No Predictor was selected.
        </p>
      `);
    }
  } else if (num == 2) {
    let stage = Set.finalDrop.some(fd => fd.stage == num);
    if (stage == false) {
      $('#resultSubstantive').html(`
        <p class="text-summary">
             No Predictor was selected.
        </p>
      `);
    }
  } else if (num == 3) {
    let stage = Set.finalDrop.some(fd => fd.stage == num);
    if (stage == false) {
      $('#resultDiscretionary').html(`
        <p class="text-summary">
             No Predictor was selected.
        </p>
      `);
    }
  } else if (num == 4) {
    let stage = Set.finalDrop.some(fd => fd.stage == num);
    if (stage == false) {
      $('#resultContingent').html(`
        <p class="text-summary">
             No Predictor was selected.
        </p>
      `);
    }
  }
}

function finalResult() {
  Set.finalDrop.map(fd => {
    Set.Predictors[0].map(pred => {
      if (fd.predId == pred.predId) {
        $('#finalistHead').append(`  
          <th class='text-align-center'>${pred.name}</th>
        `);
      }
    });
  });

  Set.finalCandidates.map(fc => {
    let x = 1;
    Set.Candidates[0].map(cd => {
      if (fc.cId == cd.cId && fc.result != 2) {
        $('#finalistBody').append(`
            <tr id='finalistScore${fc.cId}'>
                  <th scope="row">${cd.name}</th>                  
            </tr>
        `);
        Set.finalDrop.map(fd => {
          cd.scores.map(sc => {
            if (sc.predId == fd.predId) {
              console.log(sc.predId + ' == ' + fd.predId + ' id: ' + fc.cId);
              $('#finalistScore' + fc.cId).append(`  
                <td class='text-align-center'>${sc.score}</td>
              `);
            }
          });
        });
      }
    });
    x = x + 1;
  });
}

export default Final;
