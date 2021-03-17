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
    InsertCompensatory: (id, name, total, stage, weightValue) => {
      let drop = {
        id: Number(id),
        name: name,
        total: Number(total),
        stage: Number(stage),
        weightValue: Number(weightValue),
      };

      if (this.CompensatoryTotal.length <= 0) {
        this.CompensatoryTotal.push(drop);
      } else {
        if (
          this.CompensatoryTotal.some(
            td => td.name === name && td.stage === stage
          )
        ) {
          this.CompensatoryTotal.map(res => {
            if (res.name == name && res.stage == stage) {
              res.total = Number(total);
            }
          });
        } else {
          this.CompensatoryTotal.push(drop);
        }
      }
    },
    CompensatoryFinal: () => {
      let sort,
        wv = 0,
        x = 1,
        nstage = 1,
        limit = 0,
        length = 0,
        result = 0;

      sort = this.CompensatoryTotal.sort(function (x, y) {
        var n = x.stage - y.stage;
        if (n !== 0) {
          return n;
        }

        return y.total - x.total;
      });

      console.log(sort);

      // name, total, stage, result
      sort.map(res => {
        if (nstage != res.stage) {
          nstage = res.stage;
          x = 1;
        }
        wv = res.weightValue / 100;
        length = this.Candidates[0].length;
        limit = Math.round(length * wv);

        // other code
        if (this.totalResult.length <= 0) {
          if (x <= limit) {
            // console.log('if = 0 1: ' + result);
            this.data.InsertTotalResult(
              res.id,
              res.name,
              res.total,
              res.stage,
              result
            );
          } else {
            result = 2;
            // console.log('if = 0 2: ' + result);
            this.data.InsertTotalResult(
              res.id,
              res.name,
              res.total,
              res.stage,
              result
            );
          }
        } else {
          if (
            this.totalResult.some(
              td => td.name === res.name && td.stage === res.stage
            )
          ) {
            // console.log('if = 0 1 name: ' + result);
            if (x <= limit) {
              result = 1;
              // console.log('if = 0 1: ' + result);
              this.totalResult.map(tr => {
                if (tr.name == res.name && tr.stage == res.stage) {
                  tr.result = Number(result);
                  tr.total = Number(res.total);
                }
              });
            } else {
              result = 2;
              // console.log('if = 0 2: ' + result);
              this.totalResult.map(tr => {
                if (tr.name == res.name && tr.stage == res.stage) {
                  tr.result = Number(result);
                  tr.total = Number(res.total);
                }
              });
            }
          } else {
            if (x <= limit) {
              // console.log('else if 0 1: ' + result);
              result = 1;
              this.data.InsertTotalResult(
                res.id,
                res.name,
                res.total,
                res.stage,
                result
              );
            } else {
              // console.log('else else 0 2: ' + result);
              result = 2;
              this.data.InsertTotalResult(
                res.id,
                res.name,
                res.total,
                res.stage,
                result
              );
            }
          }
        }
        // other code

        x = x + 1;
      });
    },
    InsertTotalResult: (id, name, total, stage, result) => {
      let drop = {
        id: Number(id),
        name: name,
        total: Number(total),
        stage: Number(stage),
        result: Number(result),
      };

      this.totalResult.push(drop);
    },
  };

  Predictors = [];
  Candidates = [];
  CompensatoryTotal = [];

  totalResult = [];

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
