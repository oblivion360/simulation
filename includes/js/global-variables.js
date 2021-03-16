class Settings {
  drop = '1';
  finalDrop = [];
  dropped = [];
  data = {
    Pred: async () => {
      fetch('includes/js/api/predictors.txt')
        .then(response => response.json())
        .then(data => {
          let pred = data.Predictors;

          this.Predictors.push(pred);
        });
    },
    Dropped: (predId, value, stage, methodType, predType, weightValue) => {
      let drop = {
        predId: Number(predId),
        value: value,
        stage: Number(stage),
        methodType: Number(methodType),
        predType: Number(predType),
        weightValue: Number(weightValue),
      };
      this.dropped.push(drop);
    },
    Cand: async () => {
      fetch('includes/js/api/candidates.txt')
        .then(response => response.json())
        .then(val => {
          let cand = val.Candidates;

          this.Candidates.push(cand);
        });
    },
    Total: (name, total) => {
      let drop = {
        name: name,
        total: Number(total),
      };

      this.totalArray.push(drop);
    },
  };

  Predictors = [];
  Candidates = [];
  totalArray = [];

  Stages = [
    {
      stageId: 1,
      name: 'Stage 1',
      other: 'initial',
      status: 1,
    },
    {
      stageId: 2,
      name: 'Stage 2',
      other: 'substantive',
      status: 2,
    },
    {
      stageId: 3,
      name: 'Stage 3',
      other: 'discretionary',
      status: 2,
    },
    {
      stageId: 4,
      name: 'Stage 4',
      other: 'contingent',
      status: 2,
    },
    {
      stageId: 5,
      name: 'Stage 5',
      other: 'review',
      status: 2,
    },
    {
      stageId: 6,
      name: 'Stage 6',
      other: 'final',
      status: 2,
    },
  ];

  // predId, value, stage
  Computations = [];
}

const Set = new Settings();

Set.data.Pred();
Set.data.Cand();

// Set.data.Dropped(1);
// Set.data.Dropped(2, 3, 4);

// Set.dropped.map(res => {
//   if (res.predId == 1) {
//     console.log(res);
//   }
// });
