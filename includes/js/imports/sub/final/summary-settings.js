// import CandidatesSettings from './candidates-settings.js';
let SummarySettings = () => {
  $('#prev').html(`
    <span data-feather="chevrons-left"></span> AMEND
  `);

  $('#next').html(
    `START SIMULATION <span data-feather="chevrons-right"></span>`
  );
  // $('#nextBtn').html(`
  //   <button
  //     type="button"
  //     class="btn bg-button nav-btn btn-stage-active next"
  //     id="nextSimulation"
  //   >
  //     START SIMULATION <span data-feather="chevrons-right"></span>
  //   </button>
  // `);

  $('#stage').val(5);

  // insert modal
  // $.ajax({
  //   type: 'GET',
  //   crossDomain: true,
  //   url: 'components/content/modal/simulation.html',
  //   dataType: 'html',
  //   success: function (res) {
  //     // show page
  //     $('#modal').html(res);
  //   },
  // });

  $('#nextSimulation').on('click', function () {
    $('#startSimulation').modal('show');
    CandidatesSettings();
  });
};

export default SummarySettings;
