let Summary = () => {
  let predName,
    method,
    score,
    pretext,
    weight,
    x = 0;
  // summary display
  Set.finalDrop.map(fd => {
    x = 0;
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
        x = x + 1;
        if (x <= 1) {
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
        x = x + 1;
        if (x <= 1) {
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
        x = x + 1;
        if (x <= 1) {
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
        x = x + 1;
        if (x <= 1) {
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
      } // last of the predType
    }
  });
};

export default Summary;
