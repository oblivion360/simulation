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
      fc = JSON.parse(localStorage.getItem('finalCandidates'));

    fd.map(fld => {
      Set.finalDrop.push(fld);
    });

    fc.map(flc => {
      Set.finalCandidates.push(flc);
    });

    $('#change-all').html(res);
    FinalPrint();
  },
});
