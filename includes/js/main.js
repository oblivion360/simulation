import mainPredBtn from './imports/mainpredbtn.js';
import subPredBtn from './imports/subpredbtn.js';
import showDrop from './imports/show-dropped.js';
import displayPredTable from './imports/displaypredtable.js';
import Summary from './imports/summary.js';
import SummarySettings from './imports/sub/final/summary-settings.js';
import CandidatesSettings from './imports/sub/final/candidates-settings.js';

$(function () {
  let user = Set.user,
    userLocal = JSON.parse(localStorage.getItem('user'));

  if (user.length != 0) {
    $('#welcome').html('Welcome, ' + user + '!');
    stageActive();
  } else {
    // window.open('introduction.html', '_self');
    if (userLocal) {
      if (userLocal.length == 0) {
        window.open('introduction.html', '_self');
      } else {
        user = userLocal;
        $('#welcome').html('Welcome, ' + user + '!');
        stageActive();
      }
    } else {
      window.open('introduction.html', '_self');
    }
  }

  $.Shortcuts.start('default');
  $.Shortcuts.add({
    type: 'down',
    mask: 'CTRL + F5',
    handler: function () {
      $('#compWarning').modal('show');
      $('#warningFooter').html(`
        <button
          type="button"
          class="btn btn-secondary"
          data-dismiss="modal"
        >
          Stay
        </button>
        <button type="button" class="btn btn-warning" id="wrefresh">
          Continue
        </button>      
      `);
    },
  });
  $.Shortcuts.add({
    type: 'down',
    mask: 'F5',
    handler: function () {
      $('#compWarning').modal('show');
      $('#warningFooter').html(`
        <button
          type="button"
          class="btn btn-secondary"
          data-dismiss="modal"
        >
          Stay
        </button>
        <button type="button" class="btn btn-warning" id="wrefresh">
          Continue
        </button>      
      `);
    },
  });
  $.Shortcuts.start();
});

function stageActive() {
  // set witch stage are we now
  Set.Stages.map(({ other, status, stageId }) => {
    // this is for the active stage
    if (status == 1) {
      // for menu active
      $('.nav-link').removeClass('active');

      $(`#${other}`).addClass('active');
      $('#stage').val(stageId);

      // choose page
      if (stageId == 1 || stageId == 2 || stageId == 3 || stageId == 4) {
        // add page
        $.ajax({
          type: 'GET',
          crossDomain: true,
          url: 'components/pages/stage.html',
          dataType: 'html',
          success: function (res) {
            // show page
            $('#content').html(res);
            $('#predictors-table').droppable({
              accept: '#trash li',
              classes: {
                'ui-droppable-active': 'custom-state-active',
              },
              drop: function (event, ui) {
                recycleImage(ui.draggable);
              },
            });

            //mainPredBtn Click
            mainPredBtn();

            //subPredBtn Click
            subPredBtn();

            // display predictor table
            displayPredTable(0);
            // Settings();
            disabledBtn();

            // feather.replace();
            if (stageId == 1) {
              $('#prev').attr('disabled', true).removeClass('btn-stage-active');
              $('#next').attr('disabled', false).addClass('btn-stage-active');
            } else {
              $('.nav-btn')
                .attr('disabled', false)
                .addClass('btn-stage-active');
            }
          },
        });
      } else if (stageId == 5) {
        $.ajax({
          type: 'GET',
          crossDomain: true,
          url: 'components/pages/summary.html',
          dataType: 'html',
          success: function (res) {
            // show page
            $('#content').html(res);

            Summary();
            SummarySettings();
          },
        });
      }
    }
  });
}

function backStageActive() {
  let fdlength = Set.finalDrop.length,
    fd;
  // set witch stage are we now
  Set.Stages.map(({ other, status, stageId }) => {
    // this is for the active stage
    if (status == 1) {
      // for menu active
      $('.nav-link').removeClass('active');

      $(`#${other}`).addClass('active');
      $('#stage').val(stageId);

      // choose page
      if (stageId == 1 || stageId == 2 || stageId == 3 || stageId == 4) {
        // add page
        $.ajax({
          type: 'GET',
          crossDomain: true,
          url: 'components/pages/stage.html',
          dataType: 'html',
          success: function (res) {
            // show page
            $('#content').html(res);
            $('#predictors-table').droppable({
              accept: '#trash li',
              classes: {
                'ui-droppable-active': 'custom-state-active',
              },
              drop: function (event, ui) {
                recycleImage(ui.draggable);
              },
            });

            //mainPredBtn Click
            mainPredBtn();

            //subPredBtn Click
            subPredBtn();

            // display predictor table
            if (fdlength == 0) {
              displayPredTable(0);
            } else {
              fd = Set.finalDrop.filter(fd => fd.stage == stageId);
              if (Set.finalDrop.some(fd => fd.stage == stageId)) {
                if (fd[0].predType == 1) {
                  displayPredTable(0);
                } else if (fd[0].predType == 2) {
                  displayPredTable(3);
                } else if (fd[0].predType == 3) {
                  displayPredTable(1);
                }

                showDrop(fd[0].predType, stageId);
              } else {
                displayPredTable(0);
              }
            }

            if (stageId == 1) {
              $('#prev').attr('disabled', true).removeClass('btn-stage-active');
              $('#next').attr('disabled', false).addClass('btn-stage-active');
            } else {
              $('.nav-btn')
                .attr('disabled', false)
                .addClass('btn-stage-active');
            }
          },
        });
      } else if (stageId == 5) {
        $.ajax({
          type: 'GET',
          crossDomain: true,
          url: 'components/pages/summary.html',
          dataType: 'html',
          success: function (res) {
            // show page
            $('#content').html(res);

            Summary();
            SummarySettings();
          },
        });
      }
    }
  });
}

$('#next').on('click', function () {
  let type = Set.drop,
    length = Set.dropped.length,
    dropped = Set.dropped,
    stage = Number($('#stage').val()),
    newStage,
    newDrop,
    counter = $('#counter').val();

  newStage = Number(stage + 1);

  if (stage <= 4) {
    if (length == 0) {
      Set.Stages.map(st => {
        // console.log(stage);
        if (st.stageId == stage) {
          st.status = 2;
        } else if (st.stageId == newStage) {
          st.status = 1;
        }
      });
      if (Set.finalDrop.some(fd => fd.stage == newStage)) {
        backStageActive();
      } else {
        stageActive();
      }
    } else {
      Set.dropped.map(val => {
        newDrop = Set.finalDrop.some(element => element.predId == val.predId);

        if (newDrop == false) {
          Set.finalDrop.push(val);
        }
      });
      Set.Stages.map(st => {
        // console.log(stage);
        if (st.stageId == stage) {
          st.status = 2;
        } else if (st.stageId == newStage) {
          st.status = 1;
        }
      });
      if (Set.finalDrop.some(fd => fd.stage == newStage)) {
        backStageActive();
      } else {
        stageActive();
      }
    }
  } else if (stage == 5) {
    stageActive();
    $('#startSimulation').modal('show');
    CandidatesSettings();
  } else {
    // add the download pard
  }
});

$('#prev').on('click', function () {
  let type = Set.drop,
    length = Set.dropped.length,
    dropped = Set.dropped,
    stage = Number($('#stage').val()),
    newStage,
    newDrop,
    counter = $('#counter').val();

  newStage = Number(stage - 1);
  console.log(newStage);
  //set the dropped empty
  Set.dropped.map(res => {
    Set.Predictors[0].map(pred => {
      if (pred.predId == res.predId) {
        pred.status = 1;
      }
    });
  });
  Set.dropped = [];

  // set the current stage
  Set.Stages.map(st => {
    // console.log(stage);
    if (st.stageId == stage) {
      st.status = 2;
    } else if (st.stageId == newStage) {
      st.status = 1;
    }
  });
  backStageActive();
  if (stage == 5) {
    $('#next').html(`NEXT >>`);
    $('#prev').html(`<< PREV`);

    // $('.next').attr('id', 'next');
  }
});

$('.h-block').on('click', res => {
  let id = res.target['id'];
  $('.h-block').removeClass('h-block-active');
  $('#' + id).addClass('h-block-active');
  if (id == 'hb1') {
    $('#help-a').html(`
      <div class="row">
        <div class="col-md-12" id="help-title">
          <h3>How do I use the simulation?</h3>
        </div>
        <div class="col-md-12" id="help-a">
          <img
            src="includes/images/video.png"
            class="video"
            alt="video"
            data-toggle="modal"
            data-target="#video"
            data-dismiss="modal"
          />
        </div>
        <div class="col-md-12" id="help-b">
          <ol>
            <li>
              Select between “Single Predictor” and “Multiple Predictors”. If you
              select “Multiple Predictors”, decide if you’re using “Multi-Hurdle
              Model” or “Compensatory Model”.
            </li>
            <li>Drag and drop the Predictor(s) into the empty box.</li>
            <li>If you are using “Compensatory Model”, select the weightage.</li>
            <li>Select the Scoring Method, then select the passing score.</li>
            <li>
              Check before continuing to the next page. You are also free to continue
              without selecting a Predictor.
            </li>
          </ol>
        </div>
      </div>
    `);
  } else if (id == 'hb2') {
    $('#help-a').html(`
      <div class="row">
        <div class="col-md-12" id="help-title">
          <h3>What are the “Multi-Hurdle Model” and “Compensatory Model”?</h3>
        </div>
        <div class="col-md-12" id="help-b">
          <h4>Multi-Hurdle Model</h4>
          <ul>
            <li>
              With the multiple hurdles approach, an applicant must achieve a passing
              score on each predictor before advancing in the selection process. This
              approach is useful when each predictor is critical to job success.
            </li>
          </ul>
          <h4>Compensatory Model</h4>
          <ul>
            <li>
              Predictor scores are simply added together to yield a combined score.
              This allows a high score on one predictor to compensate for a low score of
              another predictor.
            </li>
          </ul>
        </div>
      </div>
    `);
  } else if (id == 'hb3') {
    $('#help-a').html(`
      <div class="row">
        <div class="col-md-12" id="help-title">
          <h3>What are the “Minimum Competency Method” and “Top-Down Method”?</h3>
        </div>
        <div class="col-md-12" id="help-b">
          <h4>Minimum Competency Method</h4>
          <ul>
            <li>
              The cut score is determined based on the minimum requirement deemed
              critical to perform the job.
            </li>
          </ul>
          <h4>Top-Down Method</h4>
          <ul>
            <li>
              The cut score is determined by the proportion of applicants required to
              move to the next stage,
            </li>
          </ul>
        </div>
      </div>
    `);
  } else if (id == 'hb4') {
    $('#help-a').html(`
      <div class="row">
        <div class="col-md-12" id="help-title">
          <h3>What do the four stages mean?</h3>
        </div>
        <div class="col-md-12" id="help-b">
          <ol>
            <li>
              <b>Initial</b> assessment methods are used to choose candidates from
              applicants.
            </li>
            <li>
              <b>Substantiative</b> assessment methods are used to make precise
              assessments of the candidates and determine who should be finalists.
            </li>
            <li>
              <b>Discretionary</b> assessment methods may be used to determine who
              among the finalists will get the job offer.
            </li>
            <li>
              <b>Contingent</b> assessment methods may be used depending on the nature
              of the job and legal requirements.
            </li>
          </ol>
        </div>
      </div>
    `);
  } else if (id == 'hb5') {
    $('#help-a').html(`
      <div class="row">
        <div class="col-md-12" id="help-title">
          <h3>Why are some buttons deactivated?</h3>
          <p>Some buttons will be deactivated due to certain conditions.</p>
        </div>
        <div class="col-md-12" id="help-b">
          <ol>
            <li>
            	For <b>non-numerical Predictors</b>, the scoring method “Top-Down Method” will be automatically deactivated, as they do not apply.
            </li>
            <li>
              For <b>Compensatory Model</b>, non-numerical Predictors will be automatically deactivated, as they do not apply.
            </li>
            <li>
              For <b>Compensatory Model</b>, if the total Weightage does not add up to 100%, you will not be able to proceed.
            </li>            
          </ol>
          <p>If you find yourself unable to click “Next”, please check and make sure that all the fields have been filled. The “Next” button will automatically activate once all the required fields have been filled.</p>
        </div>
      </div>
    `);
  }
});

$('#logout').on('click', function () {
  let user = Set.user;
  user = [];
  localStorage.setItem('user', JSON.stringify(user));
  location.reload();
});

function disabledBtn() {
  // let data = $('.btn-method').data();
  // console.log(data);
}

$(document).on('load', function (res) {
  let video = res.target.classList[0];
  console.log('video');
  if (video == 'video') {
    res.currentTarget.fullscreen = true;
  }
});

$(document).on('click', function (res) {
  if (res.target.id == 'wrefresh') {
    location.reload();
  }
  console.log(res);
});
