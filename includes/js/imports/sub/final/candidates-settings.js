import Final from '../../final.js';

let CandidatesSettings = () => {
  $('#button-stage').html(`
        <div class="col-md-6">&nbsp;</div>
        <div class="col-md-6">
        <button
            type="button"
            class="btn bg-button nav-btn btn-stage-active"
            id="retryModal"
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

  // insert modal
  $.ajax({
    type: 'GET',
    crossDomain: true,
    url: 'components/content/modal/retry.html',
    dataType: 'html',
    success: function (res) {
      // show page
      $('#modal').append(res);
      $('#retry').on('click', function () {
        location.reload();
      });
    },
  });
  $.ajax({
    type: 'GET',
    crossDomain: true,
    url: 'components/content/modal/savepdf.html',
    dataType: 'html',
    success: function (res) {
      // show page
      $('#modal').append(res);
      $('#print').on('click', function () {
        window.print();
      });
    },
  });

  $('#retryModal').on('click', function () {
    $('#retrySimulation').modal('show');
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
  let finalDrop = Set.finalDrop,
    finalCandidates = Set.finalCandidates;
  // Put the object into storage
  localStorage.setItem('finalDrop', JSON.stringify(finalDrop));
  localStorage.setItem('finalCandidates', JSON.stringify(finalCandidates));

  window.open('finalprint.html', '_blank');
}

export default CandidatesSettings;
