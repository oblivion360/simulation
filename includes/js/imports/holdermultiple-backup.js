let holderMultiple = () => {
  $.ajax({
    type: 'GET',
    crossDomain: true,
    url: 'components/content/holder-multi-hurdle.html',
    dataType: 'html',
    success: function (res) {
      // show page
      $('#predictor-holder').html(res);
      multiHurdle();
    },
  });
};

let multiHurdle = () => {
  let id = 0;
  id++;
  $.ajax({
    type: 'GET',
    crossDomain: true,
    url: 'components/content/multi-hurdle.html',
    dataType: 'html',
    success: function (res) {
      // show page
      $('#holder-button').append(res);
    },
  });
};

export default holderMultiple;
