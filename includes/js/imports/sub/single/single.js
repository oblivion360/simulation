const Single = () => {
  // for any change on method
  $('.method').on('change', function (res) {
    let predId = res.target.dataset['predid'],
      value = $('.method').val();
    Set.dropped.map(drop => {
      if (drop.predId == predId) {
        drop.value = value;
        Set.Stages.map(st => {
          if (st.status == 1) {
            drop.stage = st.stageId;
          }
        });
      }
    });
    console.log(Set.dropped);
  });

  //choosing top-down
  $('#topdown').on('click', function () {
    $('.method').html(`<option value="0" selected>Pls Choose</option>`);
    let start = 5,
      add = 5,
      end = 100;
    do {
      $('.method').append(`<option value="${start}">${start}%</option>`);
      start = start + add;
    } while (start <= end);

    $('.btn-method').removeClass('btn-active');
    $('#topdown').addClass('btn-active');
  });

  $('#minimum').on('click', function () {
    let predId = $('.method').attr('data-predid');
    showMethod(predId);
    $('.btn-method').removeClass('btn-active');
    $('#minimum').addClass('btn-active');
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
