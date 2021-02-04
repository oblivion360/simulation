$(function () {
  stageActive();
});

function stageActive() {
  // set witch stage are we now
  Stages.map(({ other, status, id }) => {
    // this is for the active stage
    if (status == 1) {
      // for menu active
      $(`#${other}`).addClass('active');
      // choose page
      if (id == 1 || id == 2 || id == 3 || id == 4) {
        // add page
        $.ajax({
          type: 'GET',
          crossDomain: true,
          url: 'components/pages/stage.html',
          dataType: 'html',
          success: function (res) {
            // show page
            $('#content').html(res);

            // display predictor table
            Predictors.map(({ name, type, status }) => {
              let newStatus = '',
                newType = '';

              if (type != 1) {
                newStatus = 'disabled';
              }
              if (status != 1) {
                newType = 'pred-hide';
              }

              $('#predictors-table').append(` 
              <div class="col-md-6 ${newType}" style='margin-bottom: 10px'>
                  <button class="btn btn-block btn-info" ${newStatus}>
                     ${name}
                  </button>
              </div>`);
            });
          },
        });
      } else if (id == 5) {
      } else if (id == 6) {
      }
    }
  });
}
