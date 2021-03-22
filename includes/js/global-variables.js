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
    InsertMulti: (id, scored, stage, weightValue, a) => {
      let drop = {
        id: Number(id),
        scored: Number(scored),
        stage: Number(stage),
        weightValue: Number(weightValue),
        a: Number(a),
      };

      this.MultiTotal.push(drop);
    },
    InsertFinalMulti: () => {
      let wv = 0,
        z = 1,
        nstage = 1,
        na = 0,
        length = 0,
        limit = 0,
        sort,
        result = 0;

      sort = this.MultiTotal.sort(function (x, y) {
        var n = x.stage - y.stage,
          z = x.a - y.a;
        if (n !== 0) {
          return n;
        }
        if (z !== 0) {
          return z;
        }
        return y.scored - x.scored;
      });

      sort.map(st => {
        if (nstage != st.stage || na != st.a) {
          nstage = st.stage;
          na = st.a;
          z = 1;
        }
        wv = st.weightValue / 100;
        length = this.Candidates[0].length;
        limit = Math.round(length * wv);

        if (this.FinalMulti.length <= 0) {
          if (z <= limit) {
            // console.log('if = 0 1: ' + result);
            result = 1;
            this.data.InsertMultiTotal(st.id, st.scored, st.stage, result);
          } else {
            result = 2;
            // console.log('if = 0 2: ' + result);
            this.data.InsertMultiTotal(st.id, st.scored, st.stage, result);
          }
        } else {
          if (
            this.FinalMulti.some(td => td.id === st.id && td.stage === st.stage)
          ) {
            if (z <= limit) {
              result = 1;

              this.FinalMulti.map(tr => {
                if (tr.id == st.id && tr.stage == st.stage) {
                  if (tr.result == 1) {
                    tr.result = result;
                    console.log(
                      'z: ' +
                        z +
                        ' tr.result: ' +
                        tr.result +
                        ' result: ' +
                        result
                    );
                  }
                  tr.scored = Number(st.scored);
                }
              });
            } else {
              result = 2;

              this.FinalMulti.map(tr => {
                if (tr.id == st.id && tr.stage == st.stage) {
                  if (tr.result == 1) {
                    tr.result = result;
                    console.log(
                      'z: ' +
                        z +
                        ' tr.result: ' +
                        tr.result +
                        ' result: ' +
                        result
                    );
                  }
                  tr.scored = Number(st.scored);
                }
              });
            }
          } else {
            if (z <= limit) {
              // console.log('if = 0 1: ' + result);
              result = 1;
              this.data.InsertMultiTotal(st.id, st.scored, st.stage, result);
            } else {
              result = 2;
              // console.log('if = 0 2: ' + result);
              this.data.InsertMultiTotal(st.id, st.scored, st.stage, result);
            }
          }
        }

        z = z + 1;
      });
    },
    InsertMultiTotal: (id, scored, stage, result) => {
      let drop = {
        id: Number(id),
        scored: Number(scored),
        stage: Number(stage),
        result: Number(result),
      };

      this.FinalMulti.push(drop);
    },
    InsertSingle: (id, scored, stage, weightValue) => {
      let drop = {
        id: Number(id),
        scored: Number(scored),
        stage: Number(stage),
        weightValue: Number(weightValue),
      };

      this.SingleTotal.push(drop);
    },
    InsertFinalSingle: () => {
      let wv = 0,
        z = 1,
        nstage = 1,
        length = 0,
        limit = 0,
        sort,
        result = 0;

      sort = this.SingleTotal.sort(function (x, y) {
        var n = x.stage - y.stage;
        if (n !== 0) {
          return n;
        }
        return y.scored - x.scored;
      });

      sort.map(st => {
        if (nstage != st.stage) {
          nstage = st.stage;
          z = 1;
        }
        wv = st.weightValue / 100;
        length = this.Candidates[0].length;
        limit = Math.round(length * wv);

        if (this.FinalSingle.length <= 0) {
          if (z <= limit) {
            // console.log('if = 0 1: ' + result);
            result = 1;
            this.data.InsertSingleTotal(st.id, st.scored, st.stage, result);
          } else {
            result = 2;
            // console.log('if = 0 2: ' + result);
            this.data.InsertSingleTotal(st.id, st.scored, st.stage, result);
          }
        } else {
          if (
            this.FinalSingle.some(
              td => td.id === st.id && td.stage === st.stage
            )
          ) {
            if (z <= limit) {
              result = 1;
              // console.log('if = 0 1: ' + result);
              this.FinalSingle.map(tr => {
                if (tr.id == st.id && tr.stage == st.stage) {
                  tr.result = Number(result);
                  tr.scored = Number(st.scored);
                }
              });
            } else {
              result = 2;
              // console.log('if = 0 2: ' + result);
              this.FinalSingle.map(tr => {
                if (tr.id == st.id && tr.stage == st.stage) {
                  tr.result = Number(result);
                  tr.scored = Number(st.scored);
                }
              });
            }
          } else {
            if (z <= limit) {
              // console.log('if = 0 1: ' + result);
              result = 1;
              this.data.InsertSingleTotal(st.id, st.scored, st.stage, result);
            } else {
              result = 2;
              // console.log('if = 0 2: ' + result);
              this.data.InsertSingleTotal(st.id, st.scored, st.stage, result);
            }
          }
        }

        z = z + 1;
      });
    },
    InsertSingleTotal: (id, scored, stage, result) => {
      let drop = {
        id: Number(id),
        scored: Number(scored),
        stage: Number(stage),
        result: Number(result),
      };

      this.FinalSingle.push(drop);
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
    InsertMultiResult: (cId, result, stage) => {
      let drop = {
        cId: Number(cId),
        result: Number(result),
        stage: Number(stage),
      };

      if (this.MultiResult.length <= 0) {
        this.MultiResult.push(drop);
      } else {
        if (this.MultiResult.some(td => td.cId == cId && td.stage == stage)) {
          this.MultiResult.map(res => {
            if (res.cId == cId && res.stage == stage) {
              if (res.result == 1) {
                res.result = Number(result);
              }
            }
          });
        } else {
          this.MultiResult.push(drop);
        }
      }
    },
    InsertFinal: (cId, result) => {
      let drop = {
        cId: Number(cId),
        result: Number(result),
      };

      if (this.finalCandidates.length <= 0) {
        this.finalCandidates.push(drop);
      } else {
        if (this.finalCandidates.some(td => td.cId === cId)) {
          this.finalCandidates.map(res => {
            if (res.cId == cId) {
              if (res.result == 1) {
                res.result = Number(result);
              }
            }
          });
        } else {
          this.finalCandidates.push(drop);
        }
      }
    },
  };

  Predictors = [];
  Candidates = [];

  SingleTotal = [];
  FinalSingle = [];

  MultiTotal = [];
  FinalMulti = [];

  CompensatoryTotal = [];
  MultiResult = [];
  totalResult = [];
  finalCandidates = [];

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
