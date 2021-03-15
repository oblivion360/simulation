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
        .then(data => {
          let cand = data.Candidates;
          // console.log(cand);
          cand.map(res => {
            this.Candidates.push(res);
          });
          // this.Predictors.push(pred);
        });
    },
  };

  Predictors = [];
  Candidates = [];

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

  // candidate, predId, value
  Candidates = [
    {
      candidate: 'A',
      score: [
        {
          predId: 1,
          type: 1,
          value: 12,
        },
        {
          predId: 2,
          type: 1,
          value: 4,
        },
        {
          predId: 7,
          type: 2,
          value: 'Pass',
        },
        {
          predId: 8,
          type: 2,
          value: 'Pass',
        },
      ],
    },
    {
      candidate: 'B',
      score: [
        {
          predId: 1,
          type: 1,
          value: 4,
        },
        {
          predId: 2,
          type: 1,
          value: 1,
        },
        {
          predId: 7,
          type: 2,
          value: 'Fail',
        },
        {
          predId: 8,
          type: 2,
          value: 'Fail',
        },
      ],
    },
  ];
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
