let Summary = user => {
  console.log(user[0]);
  $('#greeting').html(`
    Name: ${user[0]}
  `);
  let predName,
    method,
    score,
    pretext,
    weight,
    x1 = 0,
    x2 = 0,
    x3 = 0,
    x4 = 0,
    st1 = Set.finalDrop.filter(res => res.stage == 1),
    st2 = Set.finalDrop.filter(res => res.stage == 2),
    st3 = Set.finalDrop.filter(res => res.stage == 3),
    st4 = Set.finalDrop.filter(res => res.stage == 4);

  x1 = st1.length;
  x2 = st2.length;
  x3 = st3.length;
  x4 = st4.length;
  // summary display
  let stage1 = Set.finalDrop.some(fd => fd.stage == 1);
  let stage2 = Set.finalDrop.some(fd => fd.stage == 2);
  let stage3 = Set.finalDrop.some(fd => fd.stage == 3);
  let stage4 = Set.finalDrop.some(fd => fd.stage == 4);

  if (stage1 == false) {
    $('#resultInitial').html(`
      <p class="text-summary">
           No Predictor was selected.
      </p>
    `);
  }

  if (stage2 == false) {
    $('#resultSubstantive').html(`
      <p class="text-summary">
           No Predictor was selected.
      </p>
    `);
  }

  if (stage3 == false) {
    $('#resultDiscretionary').html(`
      <p class="text-summary">
           No Predictor was selected.
      </p>
    `);
  }

  if (stage4 == false) {
    $('#resultContingent').html(`
      <p class="text-summary">
           No Predictor was selected.
      </p>
    `);
  }

  Set.finalDrop.map(fd => {
    //  stage 1

    if (fd.stage == 1) {
      // predType == 1
      if (fd.predType == 1 || fd.predType == 2) {
        score = fd.value;
        Set.Predictors[0].map(pred => {
          if (pred.predId == fd.predId) {
            predName = pred.name;
            if (pred.valueType == 1) {
              if (fd.methodType == 1) {
                if (fd.value > 1) {
                  pretext = pred.textSingular + 's';
                } else {
                  pretext = pred.textSingular;
                }
              } else {
                pretext = '%';
              }
            } else {
              pretext = '';
            }
          }
        });
        if (fd.methodType == 1) {
          method = 'Minimum Competency Method';
        } else {
          method = 'Top-Down Method';
        }
        $('#resultInitial1').append(`
            <div class="row mb-4">
              <div class="col-md-10">
                <div class="row">
                  <div class="col-md-4">
                    <div class="predNames">
                      ${predName}
                    </div>
                  </div>
                  <div class="col-md-3">
                    <div class="methods">
                      ${method}
                    </div>
                  </div>
                  <div class="col-md-3">
                    <div class="scores">
                      Score: <br>${score} ${pretext}
                    </div>
                  </div>
                </div>
                <!-- /.row -->
              </div>
            </div>
          `);
      } // predType == 2
      else if (fd.predType == 3) {
        score = fd.value;
        weight = fd.weightValue;
        Set.Predictors[0].map(pred => {
          if (pred.predId == fd.predId) {
            predName = pred.name;
            if (pred.valueType == 1) {
              if (fd.methodType == 1) {
                if (fd.value > 1) {
                  pretext = pred.textSingular + 's';
                } else {
                  pretext = pred.textSingular;
                }
              } else {
                pretext = '%';
              }
            } else {
              pretext = '';
            }
          }
        });
        if (fd.methodType == 1) {
          method = 'Minimum Competency Method';
        } else {
          method = 'Top-Down Method';
        }

        if (x1 > 1) {
          $('#resultInitial1').append(`
            <div class="row mb-4">
              <div class="col-md-10">
                <div class="row">
                  <div class="col-md-3">
                    <div class="predNames">
                      ${predName}
                    </div>
                  </div>
                  <div class="col-md-3">
                    <div class="weights">
                      Weightage: <br>${score} %
                    </div>
                  </div>
                  <div class="col-md-3">
                    <div class="methods">
                      ${method}
                    </div>
                  </div>
                  <div class="col-md-3">
                    <div class="scores">
                      Score: <br>${weight} ${pretext}
                    </div>
                  </div>
                </div>
                <!-- /.row -->
              </div>
            </div>
          `);
        } else {
          $('#resultInitial1').append(`
            <div class="row mb-4">
              <div class="col-md-10">
                <div class="row">
                  <div class="col-md-3">
                    <div class="predNames">
                      ${predName}
                    </div>
                  </div>
                  <div class="col-md-3">
                    <div class="weights">
                      Weightage: <br>${score} %
                    </div>
                  </div>
                </div>
                <!-- /.row -->
              </div>
            </div>
          `);
        }
        x1 = x1 - 1;
      } // last of the predType
    } // stage 2
    else if (fd.stage == 2) {
      // predType == 1
      if (fd.predType == 1 || fd.predType == 2) {
        score = fd.value;
        Set.Predictors[0].map(pred => {
          if (pred.predId == fd.predId) {
            predName = pred.name;
            if (pred.valueType == 1) {
              if (fd.methodType == 1) {
                if (fd.value > 1) {
                  pretext = pred.textSingular + 's';
                } else {
                  pretext = pred.textSingular;
                }
              } else {
                pretext = '%';
              }
            } else {
              pretext = '';
            }
          }
        });
        if (fd.methodType == 1) {
          method = 'Minimum Competency Method';
        } else {
          method = 'Top-Down Method';
        }
        $('#resultSubstantive1').append(`
                  <div class="row mb-4">
                    <div class="col-md-10">
                      <div class="row">
                        <div class="col-md-4">
                          <div class="predNames">
                            ${predName}
                          </div>
                        </div>
                        <div class="col-md-3">
                          <div class="methods">
                            ${method}
                          </div>
                        </div>
                        <div class="col-md-3">
                          <div class="scores">
                            Score: <br>${score} ${pretext}
                          </div>
                        </div>
                      </div>
                      <!-- /.row -->
                    </div>
                  </div>
                `);
      } // predType == 2
      else if (fd.predType == 3) {
        score = fd.value;
        weight = fd.weightValue;
        Set.Predictors[0].map(pred => {
          if (pred.predId == fd.predId) {
            predName = pred.name;
            if (pred.valueType == 1) {
              if (fd.methodType == 1) {
                if (fd.value > 1) {
                  pretext = pred.textSingular + 's';
                } else {
                  pretext = pred.textSingular;
                }
              } else {
                pretext = '%';
              }
            } else {
              pretext = '';
            }
          }
        });
        if (fd.methodType == 1) {
          method = 'Minimum Competency Method';
        } else {
          method = 'Top-Down Method';
        }

        if (x2 > 1) {
          $('#resultSubstantive1').append(`
                  <div class="row mb-4">
                    <div class="col-md-10">
                      <div class="row">
                        <div class="col-md-3">
                          <div class="predNames">
                            ${predName}
                          </div>
                        </div>
                        <div class="col-md-3">
                          <div class="weights">
                            Weightage: <br>${score} %
                          </div>
                        </div>
                        <div class="col-md-3">
                          <div class="methods">
                            ${method}
                          </div>
                        </div>
                        <div class="col-md-3">
                          <div class="scores">
                            Score: <br>${weight} ${pretext}
                          </div>
                        </div>
                      </div>
                      <!-- /.row -->
                    </div>
                  </div>
                `);
        } else {
          $('#resultSubstantive1').append(`
                  <div class="row mb-4">
                    <div class="col-md-10">
                      <div class="row">
                        <div class="col-md-3">
                          <div class="predNames">
                            ${predName}
                          </div>
                        </div>
                        <div class="col-md-3">
                          <div class="weights">
                            Weightage: <br>${score} %
                          </div>
                        </div>
                      </div>
                      <!-- /.row -->
                    </div>
                  </div>
                `);
        }
        x2 = x2 - 1;
      } // last of the predType
    } // stage 3
    else if (fd.stage == 3) {
      // predType == 1
      if (fd.predType == 1 || fd.predType == 2) {
        score = fd.value;
        Set.Predictors[0].map(pred => {
          if (pred.predId == fd.predId) {
            predName = pred.name;
            if (pred.valueType == 1) {
              if (fd.methodType == 1) {
                if (fd.value > 1) {
                  pretext = pred.textSingular + 's';
                } else {
                  pretext = pred.textSingular;
                }
              } else {
                pretext = '%';
              }
            } else {
              pretext = '';
            }
          }
        });
        if (fd.methodType == 1) {
          method = 'Minimum Competency Method';
        } else {
          method = 'Top-Down Method';
        }
        $('#resultDiscretionary1').append(`
                  <div class="row mb-4">
                    <div class="col-md-10">
                      <div class="row">
                        <div class="col-md-4">
                          <div class="predNames">
                            ${predName}
                          </div>
                        </div>
                        <div class="col-md-3">
                          <div class="methods">
                            ${method}
                          </div>
                        </div>
                        <div class="col-md-3">
                          <div class="scores">
                            Score: <br>${score} ${pretext}
                          </div>
                        </div>
                      </div>
                      <!-- /.row -->
                    </div>
                  </div>
                `);
      } // predType == 2
      else if (fd.predType == 3) {
        score = fd.value;
        weight = fd.weightValue;
        Set.Predictors[0].map(pred => {
          if (pred.predId == fd.predId) {
            predName = pred.name;
            if (pred.valueType == 1) {
              if (fd.methodType == 1) {
                if (fd.value > 1) {
                  pretext = pred.textSingular + 's';
                } else {
                  pretext = pred.textSingular;
                }
              } else {
                pretext = '%';
              }
            } else {
              pretext = '';
            }
          }
        });
        if (fd.methodType == 1) {
          method = 'Minimum Competency Method';
        } else {
          method = 'Top-Down Method';
        }

        if (x3 > 1) {
          $('#resultDiscretionary1').append(`
                  <div class="row mb-4">
                    <div class="col-md-10">
                      <div class="row">
                        <div class="col-md-3">
                          <div class="predNames">
                            ${predName}
                          </div>
                        </div>
                        <div class="col-md-3">
                          <div class="weights">
                            Weightage: <br>${score} %
                          </div>
                        </div>
                        <div class="col-md-3">
                          <div class="methods">
                            ${method}
                          </div>
                        </div>
                        <div class="col-md-3">
                          <div class="scores">
                            Score: <br>${weight} ${pretext}
                          </div>
                        </div>
                      </div>
                      <!-- /.row -->
                    </div>
                  </div>
                `);
        } else {
          $('#resultDiscretionary1').append(`
                  <div class="row mb-4">
                    <div class="col-md-10">
                      <div class="row">
                        <div class="col-md-3">
                          <div class="predNames">
                            ${predName}
                          </div>
                        </div>
                        <div class="col-md-3">
                          <div class="weights">
                            Weightage: <br>${score} %
                          </div>
                        </div>
                      </div>
                      <!-- /.row -->
                    </div>
                  </div>
                `);
        }
        x3 = x3 - 1;
      } // last of the predType
    } // stage 4
    else if (fd.stage == 4) {
      // predType == 1
      if (fd.predType == 1 || fd.predType == 2) {
        score = fd.value;
        Set.Predictors[0].map(pred => {
          if (pred.predId == fd.predId) {
            predName = pred.name;
            if (pred.valueType == 1) {
              if (fd.methodType == 1) {
                if (fd.value > 1) {
                  pretext = pred.textSingular + 's';
                } else {
                  pretext = pred.textSingular;
                }
              } else {
                pretext = '%';
              }
            } else {
              pretext = '';
            }
          }
        });
        if (fd.methodType == 1) {
          method = 'Minimum Competency Method';
        } else {
          method = 'Top-Down Method';
        }
        $('#resultContingent1').append(`
            <div class="row mb-4">
              <div class="col-md-10">
                <div class="row">
                  <div class="col-md-4">
                    <div class="predNames">
                      ${predName}
                    </div>
                  </div>
                  <div class="col-md-3">
                    <div class="methods">
                      ${method}
                    </div>
                  </div>
                  <div class="col-md-3">
                    <div class="scores">
                      Score: <br>${score} ${pretext}
                    </div>
                  </div>
                </div>
                <!-- /.row -->
              </div>
            </div>
          `);
      } // predType == 2
      else if (fd.predType == 3) {
        score = fd.value;
        weight = fd.weightValue;
        Set.Predictors[0].map(pred => {
          if (pred.predId == fd.predId) {
            predName = pred.name;
            if (pred.valueType == 1) {
              if (fd.methodType == 1) {
                if (fd.value > 1) {
                  pretext = pred.textSingular + 's';
                } else {
                  pretext = pred.textSingular;
                }
              } else {
                pretext = '%';
              }
            } else {
              pretext = '';
            }
          }
        });
        if (fd.methodType == 1) {
          method = 'Minimum Competency Method';
        } else {
          method = 'Top-Down Method';
        }

        if (x4 > 1) {
          $('#resultContingent1').append(`
            <div class="row mb-4">
              <div class="col-md-10">
                <div class="row">
                  <div class="col-md-3">
                    <div class="predNames">
                      ${predName}
                    </div>
                  </div>
                  <div class="col-md-3">
                    <div class="weights">
                      Weightage: <br>${score} %
                    </div>
                  </div>
                  <div class="col-md-3">
                    <div class="methods">
                      ${method}
                    </div>
                  </div>
                  <div class="col-md-3">
                    <div class="scores">
                      Score: <br>${weight} ${pretext}
                    </div>
                  </div>
                </div>
                <!-- /.row -->
              </div>
            </div>
          `);
        } else {
          $('#resultContingent1').append(`
            <div class="row mb-4">
              <div class="col-md-10">
                <div class="row">
                  <div class="col-md-3">
                    <div class="predNames">
                      ${predName}
                    </div>
                  </div>
                  <div class="col-md-3">
                    <div class="weights">
                      Weightage: <br>${score} %
                    </div>
                  </div>
                </div>
                <!-- /.row -->
              </div>
            </div>
          `);
        }
        x4 = x4 - 1;
      } // last of the predType
    }
  });
};

export default Summary;
