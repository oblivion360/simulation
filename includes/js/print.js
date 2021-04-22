import FinalPrint from './imports/final-print.js';
import Summary from './imports/sub/print/summary.js';
$.ajax({
  type: 'GET',
  crossDomain: true,
  url: 'components/pages/print.html',
  dataType: 'html',
  success: function (res) {
    // show page
    // $('#savePdf').modal('show');
    let fd = JSON.parse(localStorage.getItem('finalDrop')),
      fld = JSON.parse(localStorage.getItem('failedCandidates')),
      fc = JSON.parse(localStorage.getItem('finalCandidates')),
      user = JSON.parse(localStorage.getItem('user'));

    fd.map(fld => {
      Set.finalDrop.push(fld);
    });

    fc.map(flc => {
      Set.finalCandidates.push(flc);
    });

    $('#change-all').html(res);
    FinalPrint();
    Summary(user);
  },
});
