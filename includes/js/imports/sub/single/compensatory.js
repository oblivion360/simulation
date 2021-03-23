const Compensatory = () => {
  // for any change on method

  $('.weight').on('change', function (res) {
    let predId = res.target.dataset['predid'],
      id = res.target.id,
      predType = $('#predType').val(),
      counter = $('#counter').val(),
      a = 0,
      totalWeight,
      value = Number($('#' + id).val());
    console.log(id);
    for (let z = 1; z <= 4; z++) {
      totalWeight = $('#weight' + z).val();
      if (typeof totalWeight !== 'undefined') {
        a = a + Number($('#weight' + z).val());
      }
    }

    if (a < 100 || a > 100) {
      $('#percentage').removeClass('text-primary');
      $('#percentage').addClass('text-danger');
      $('#percentage').html(a + '%');
    } else {
      $('#percentage').removeClass('text-danger');
      $('#percentage').addClass('text-primary');
      $('#percentage').html(a + '%');
    }

    Set.dropped.map(drop => {
      if (drop.predId == predId) {
        drop.value = value;
        Set.Stages.map(st => {
          if (st.status == 1) {
            drop.stage = st.stageId;
          }
        });
        // drop.methodType = y;
        drop.predType = Number(predType);
      }
    });
    $('#next').removeClass('btn-stage-active').attr('disabled', true);
    $('.btn-method').removeClass('btn-active');
    $('.method').html(`<option value="0" selected>Select the Score</option>`);
  });

  $('.method').on('change', function (res) {
    let y = $('#methodType').val(),
      stage = $('#stage').val(),
      a = 0,
      totalWeight,
      counter = $('#counter').val(),
      value = $('.method').val();

    Set.dropped.map(drop => {
      drop.weightValue = value;

      drop.methodType = y;
    });
    for (let z = 1; z <= 4; z++) {
      totalWeight = $('#weight' + z).val();
      if (typeof totalWeight !== 'undefined') {
        a = a + Number($('#weight' + z).val());
      }
    }
    if (a == 100) {
      if (counter > 2) {
        if (stage == 1) {
          $('#next').addClass('btn-stage-active').attr('disabled', false);
        } else {
          $('.nav-btn').attr('disabled', false).addClass('btn-stage-active');
        }
      }
    }

    // console.log(Set.dropped);
  });

  //choosing top-down
  $(document).click(event => {
    let type = event.target.dataset.type,
      counter = $('#counter').val(),
      id = event.target.id;

    if (type == 'minimum') {
      // let predId = $('.' + method).attr('data-predid');
      // showMethod(predId, method);
      $('.btn-method').removeClass('btn-active');
      $('.method').html(`<option value="0" selected>Select the Score</option>`);
      $('#' + id).addClass('btn-active');
      $('#methodType').val(1);
      for (let x = 1; x <= 10; x++) {
        $('.method').append(`<option value="${x}">${x}</option>`);
      }
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
      $('.method').html(`<option value="0" selected>Select the Score</option>`);
      let start = 5,
        add = 5,
        end = 100;
      do {
        $('.method').append(`<option value="${start}">${start}%</option>`);
        start = start + add;
      } while (start <= end);

      $('.btn-method').removeClass('btn-active');
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
  $('.' + method).html(`<option value="0" selected>Select the Score</option>`);
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

export default Compensatory;
