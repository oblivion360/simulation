import CandidatesSettings from './candidates-settings.js';
let SummarySettings = () => {
  $('#button-stage').html(`
        <div class="col-md-6">&nbsp;</div>
        <div class="col-md-6">
        <button
            type="button"
            class="btn bg-button nav-btn btn-stage-active"
            id="prev"
        >
            <span data-feather="chevrons-left"></span> AMEND
        </button>       
        <button
            type="button"
            class="btn bg-button nav-btn btn-stage-active"
            id="next"
        >
            START SIMULATION <span data-feather="chevrons-right"></span>
        </button>
        </div>
        <input type="hidden" id="stage" value="5" />
    `);

  // insert modal
  $.ajax({
    type: 'GET',
    crossDomain: true,
    url: 'components/content/modal/simulation.html',
    dataType: 'html',
    success: function (res) {
      // show page
      $('#modal').html(res);
    },
  });

  $('#next').on('click', function () {
    $('#startSimulation').modal('show');
    CandidatesSettings();
  });
};

export default SummarySettings;
