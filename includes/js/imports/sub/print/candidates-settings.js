import Final from '../../final.js';
let CandidatesSettings = () => {
  $('#button-stage').html(`
        <div class="col-md-6">&nbsp;</div>
        <div class="col-md-6">
        <button
            type="button"
            class="btn bg-button nav-btn btn-stage-active"
            id="prev"
        >
            <span data-feather="chevrons-left"></span> RETRY
        </button>
        
        <button
            type="button"
            class="btn bg-button nav-btn btn-stage-active"
            id="download-pdf"
        >
            DOWNLOAD <span data-feather="chevrons-right"></span>
        </button>
        </div>
        <input type="hidden" id="stage" value="6" />
    `);
  $('#yesSimulation').on('click', function () {
    $('#startSimulation').modal('hide');
    showCandidates();
  });

  $('#download-pdf').on('click', function () {
    console.log('download');
    downloadCandidates();
  });
};

function showCandidates() {
  $.ajax({
    type: 'GET',
    crossDomain: true,
    url: 'components/pages/candidates.html',
    dataType: 'html',
    success: function (res) {
      // show page
      $('#content').html(res);
      // for menu active
      $('.nav-link').removeClass('active');
      $('#final').addClass('active');
      Final();
    },
  });
}

function downloadCandidates() {
  $.ajax({
    type: 'GET',
    crossDomain: true,
    url: 'components/pages/print.html',
    dataType: 'html',
    success: function (res) {
      // show page
      $('#change-all').html(res);
    },
  });
}

export default CandidatesSettings;
