let Summary = () => {
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
  let stage1 = Set.finalDrop.some(fd => fd.stage == 1),
    stage2 = Set.finalDrop.some(fd => fd.stage == 2),
    stage3 = Set.finalDrop.some(fd => fd.stage == 3),
    stage4 = Set.finalDrop.some(fd => fd.stage == 4);

  let pred1 = Set.finalDrop.find(fd => fd.stage == 1),
    pred2 = Set.finalDrop.find(fd => fd.stage == 2),
    pred3 = Set.finalDrop.find(fd => fd.stage == 3),
    pred4 = Set.finalDrop.find(fd => fd.stage == 4);

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

  if (pred1) {
    if (pred1.predType == 1) {
      $('#pred1').html('Single Predictor');
    } else if (pred1.predType == 2) {
      $('#pred1').html('Multiple Predictors: Multi-Hurdle Model');
    } else if (pred1.predType == 3) {
      $('#pred1').html('Multiple Predictors: Compensatory Model');
    }
  }

  if (pred2) {
    if (pred2.predType == 1) {
      $('#pred2').html('Single Predictor');
    } else if (pred2.predType == 2) {
      $('#pred2').html('Multiple Predictors: Multi-Hurdle Model');
    } else if (pred2.predType == 3) {
      $('#pred2').html('Multiple Predictors: Compensatory Model');
    }
  }

  if (pred3) {
    if (pred3.predType == 1) {
      $('#pred3').html('Single Predictor');
    } else if (pred3.predType == 2) {
      $('#pred3').html('Multiple Predictors: Multi-Hurdle Model');
    } else if (pred3.predType == 3) {
      $('#pred3').html('Multiple Predictors: Compensatory Model');
    }
  }

  if (pred4) {
    if (pred4.predType == 1) {
      $('#pred4').html('Single Predictor');
    } else if (pred4.predType == 2) {
      $('#pred4').html('Multiple Predictors: Multi-Hurdle Model');
    } else if (pred4.predType == 3) {
      $('#pred4').html('Multiple Predictors: Compensatory Model');
    }
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
        $('#resultInitial').append(`
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

        if (x1 == st1.length) {
          $('#resultInitial').append(`
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
          $('#resultInitial').append(`
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
        $('#resultSubstantive').append(`
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

        if (x2 == st2.length) {
          $('#resultSubstantive').append(`
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
          $('#resultSubstantive').append(`
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
        $('#resultDiscretionary').append(`
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

        if (x3 == st3.length) {
          $('#resultDiscretionary').append(`
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
          $('#resultDiscretionary').append(`
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
        $('#resultContingent').append(`
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

        if (x4 == st4.length) {
          $('#resultContingent').append(`
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
          $('#resultContingent').append(`
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
