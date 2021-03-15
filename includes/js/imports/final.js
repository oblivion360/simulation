import SingleMulti from './sub/final/single-multi.js';
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
};

function stage(num) {
  let id = 1,
    mType;

  Set.Candidates[0].map(res => {
    $('#finalHead' + num).append(
      `<th scope="col" class='text-align-center'>${res.name}</th>`
    );
  });

  Set.finalDrop.map(fd => {
    if (fd.stage == num) {
      mType = fd.methodType;
      // console.log('methodType-outside: ' + mType);

      if (fd.predType == 1) {
        SingleMulti(num, fd, id, mType);
        id = id + 1;
      } else {
        Compensatory(num, fd, id, mType);
        id = id + 1;
      }
    }
  });
}

export default Final;
