const Multiple = () => {
  // for any change on method
  // $(document).change(event => {});
  $('.method').on('change', function (res) {
    let predId = res.target.dataset['predid'],
      stage = $('#stage').val(),
      y = $('#methodType').val(),
      counter = $('#counter').val(),
      clss = res.target.dataset['class'],
      value = Number($('.' + clss).val());
    if (isNaN(value)) {
      value = $('.' + clss).val();
    }
    console.log(value);
    Set.dropped.map(drop => {
      if (drop.predId == predId) {
        drop.value = value;
        drop.stage = stage;
        drop.methodType = y;
      }
      drop.predType = 2;
    });
    if (counter > 2) {
      if (stage == 1) {
        $('#next').addClass('btn-stage-active').attr('disabled', false);
      } else {
        $('.nav-btn').attr('disabled', false).addClass('btn-stage-active');
      }
    }
    console.log(Set.dropped);
  });

  //choosing top-down
  $(document).click(event => {
    let method = event.target.dataset.method,
      type = event.target.dataset.type,
      counter = $('#counter').val(),
      otherId = event.target.dataset.counter,
      id = event.target.id;

    if (type == 'minimum') {
      let predId = $('.' + method).attr('data-predid');
      showMethod(predId, method);
      $('#' + otherId).removeClass('btn-active');
      $('#' + id).addClass('btn-active');
      $('#methodType').val(1);

      if (counter > 2) {
        if (stage == 1) {
          $('.nav-btn').attr('disabled', true).removeClass('btn-stage-active');
        } else {
          $('.nav-btn').removeClass('btn-stage-active');
          $('#prev').attr('disabled', false);
          $('#next').attr('disabled', true);
        }
      }
    } else if (type == 'topdown') {
      $('.' + method).html(`<option value="0" selected>Pls Choose</option>`);
      let start = 5,
        add = 5,
        end = 100;
      do {
        $('.' + method).append(
          `<option value="${start}">Top ${start}%</option>`
        );
        start = start + add;
      } while (start <= end);

      $('#' + otherId).removeClass('btn-active');
      $('#' + id).addClass('btn-active');
      $('#methodType').val(2);

      if (counter > 2) {
        if (stage == 1) {
          $('.nav-btn').attr('disabled', true).removeClass('btn-stage-active');
        } else {
          $('.nav-btn').removeClass('btn-stage-active');
          $('#prev').attr('disabled', false);
          $('#next').attr('disabled', true);
        }
      }
    }
  });
};

function showMethod(predId, method) {
  $('.' + method).attr('data-predid', predId);
  $('.' + method).html(`<option value="0" selected>Pls Choose</option>`);
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
            $('.' + method).append(`
              <option value="${start}" >${start} ${res.textSingular}</option>
              `);
          } else {
            $('.' + method).append(`
              <option value="${start}" >${start} ${res.textPlural}</option>
              `);
          }
          start = start + add;
        } while (start <= end);
      } else if (typeof res.start == 'string') {
        let start = res.start,
          end = res.end;
        $('.' + method).append(`
              <option value="${start}" >${start}</option>
              `);
        $('.' + method).append(`
              <option value="${end}" >${end}</option>
              `);
      }
    }
  });
}

export default Multiple;
