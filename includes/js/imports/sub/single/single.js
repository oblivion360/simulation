const Single = () => {
  // for any change on method
  $('.method').on('change', function (res) {
    let predId = res.target.dataset['predid'],
      stage = $('#stage').val(),
      y = $('#methodType').val(),
      value = Number($('.method').val());
    if (isNaN(value)) {
      value = $('.method').val();
    }
    Set.dropped.map(drop => {
      if (drop.predId == predId) {
        drop.value = value;
        drop.stage = stage;
        drop.methodType = y;
      }
      drop.predType = 1;
    });
    if (stage == 1) {
      $('#next').addClass('btn-stage-active').attr('disabled', false);
    } else {
      $('.nav-btn').attr('disabled', false).addClass('btn-stage-active');
    }
    console.log(Set.dropped);
  });

  //choosing top-down
  $('#topdown').on('click', function () {
    $('.method').html(`<option value="0" selected>Pls Choose</option>`);
    let start = 5,
      add = 5,
      stage = $('#stage').val(),
      end = 100;
    $('#methodType').val(2);
    do {
      $('.method').append(`<option value="${start}">Top ${start}%</option>`);
      start = start + add;
    } while (start <= end);

    $('.btn-method').removeClass('btn-active');
    $('#topdown').addClass('btn-active');
    if (stage == 1) {
      $('.nav-btn').attr('disabled', true).removeClass('btn-stage-active');
    } else {
      $('.nav-btn').removeClass('btn-stage-active');
      $('#prev').attr('disabled', false);
      $('#next').attr('disabled', true);
    }
  });

  $('#minimum').on('click', function () {
    let predId = $('.method').attr('data-predid'),
      stage = $('#stage').val();
    $('#methodType').val(1);
    showMethod(predId);
    $('.btn-method').removeClass('btn-active');
    $('#minimum').addClass('btn-active');
    if (stage == 1) {
      $('.nav-btn').attr('disabled', true).removeClass('btn-stage-active');
    } else {
      $('.nav-btn').removeClass('btn-stage-active');
      $('#prev').attr('disabled', false);
      $('#next').attr('disabled', true);
    }
  });
};

function showMethod(predId) {
  $('.method').attr('data-predid', predId);
  $('.method').html(`<option value="0" selected>Pls Choose</option>`);
  Set.Predictors[0].map(res => {
    if (res.predId == predId) {
      // console.log(typeof res.start);
      if (typeof res.start == 'number') {
        let start = res.start,
          end = res.end,
          x = 0,
          add = res.add;

        do {
          x++;
          if (x == 1) {
            $('.method').append(`
              <option value="${start}" >${start} ${res.textSingular}</option>
              `);
          } else {
            $('.method').append(`
              <option value="${start}" >${start} ${res.textPlural}</option>
              `);
          }
          start = start + add;
        } while (start <= end);
      } else if (typeof res.start == 'string') {
        let start = res.start,
          end = res.end;
        $('.method').append(`
              <option value="${start}" >${start}</option>
              `);
        $('.method').append(`
              <option value="${end}" >${end}</option>
              `);
      }
    }
  });
}

export default Single;
