import holderCompensatory from './sub/back/holdercompensatory.js';
import holderSingle from './sub/back/holdersingle.js';
import holderMultiple from './sub/back/holdermultiple.js';

let showDrop = (predType, stageId) => {
  // single predictor
  let fd = Set.finalDrop.filter(fd => fd.stage == stageId);
  if (predType == 1) {
    holderSingle(fd, stageId);
  } else if (predType == 2) {
    holderMultiple(fd, stageId);
  } else if (predType == 3) {
    holderCompensatory(fd, stageId);
  }
};
export default showDrop;
