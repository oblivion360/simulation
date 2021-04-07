import FinalPrint from './imports/final-print.js';
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
      fc = JSON.parse(localStorage.getItem('finalCandidates'));

    fd.map(fld => {
      Set.finalDrop.push(fld);
    });

    // fld.map(fldc => {
    //   Set.failedCandidates.push(fldc);
    // });

    fc.map(flc => {
      Set.finalCandidates.push(flc);
    });

    $('#change-all').html(res);
    FinalPrint();
  },
});
