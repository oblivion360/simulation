const Multiple = () => {
  // for any change on method
  // $(document).change(event => {});
  $('.method').on('change', function (res) {
    let predId = res.target.dataset['predid'],
      stage = $('#stage').val(),
      y = $('#methodType').val(),
      x = Number($('#methodCounter').val()),
      counter = $('#counter').val(),
      clss = res.target.dataset['class'],
      value = Number($('.' + clss).val());
    if (isNaN(value)) {
      value = $('.' + clss).val();
    }

    if (value != 0) {
      x = x + 1;
      $('#methodCounter').val(x);
    } else {
      x = x - 1;
      $('#methodCounter').val(x);
    }

    Set.dropped.map(drop => {
      if (drop.predId == predId) {
        drop.value = value;
        drop.stage = stage;
        drop.methodType = y;
      }
      drop.predType = 2;
    });
    if (counter > 2 && x == counter) {
      if (stage == 1) {
        $('#next').addClass('btn-stage-active').attr('disabled', false);
      } else {
        $('.nav-btn').attr('disabled', false).addClass('btn-stage-active');
      }
    }
  });

  //choosing top-down
  $('.btn-method').click(event => {
    let method = event.target.dataset.method,
      type = event.target.dataset.type,
      counter = $('#counter').val(),
      y,
      otherId = event.target.dataset.counter,
      id = event.target.id;

    y = id;
    y = y.split(/([0-9]+)/);
    console.log(y[0]);
    if (y[0] == 'minimum') {
      let predId = $('.method' + y[1]).attr('data-predid');

      showMethod(predId, method, y[1]);
      $('#topdown' + y[1]).removeClass('btn-active');
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
    } else if (y[0] == 'topdown') {
      $('.method' + y[1]).html(
        `<option value="0" selected>Select the Score</option>`
      );
      let start = 10,
        add = 10,
        end = 100;
      do {
        $('.method' + y[1]).append(
          `<option value="${start}">Top ${start}%</option>`
        );
        start = start + add;
      } while (start <= end);

      $('#minimum' + y[1]).removeClass('btn-active');
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

function showMethod(predId, method, y) {
  console.log(y);
  $('.method' + y).attr('data-predid', predId);
  $('.method' + y).html(`<option value="0" selected>Select the Score</option>`);
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
            $('.method' + y).append(`
              <option value="${start}" >${start} ${res.textSingular}</option>
              `);
          } else {
            $('.method' + y).append(`
              <option value="${start}" >${start} ${res.textPlural}</option>
              `);
          }
          start = start + add;
        } while (start <= end);
      } else if (typeof res.start == 'string') {
        let start = res.start,
          end = res.end;
        $('.method' + y).append(`
              <option value="${start}" >${start}</option>
              `);
        $('.method' + y).append(`
              <option value="${end}" >${end}</option>
              `);
      }
    }
  });
}

export default Multiple;
