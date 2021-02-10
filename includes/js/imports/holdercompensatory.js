let holderCompensatory = () => {
  $.ajax({
    type: 'GET',
    crossDomain: true,
    url: 'components/content/holder-compensatory-predictor.html',
    dataType: 'html',
    success: function (res) {
      // show page
      $('#predictor-holder').html(res);
    },
  });
};

export default holderCompensatory;
