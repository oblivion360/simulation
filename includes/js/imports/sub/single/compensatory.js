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

    for (let z = 1; z <= 4; z++) {
      totalWeight = $('#weight' + z).val();
      if (typeof totalWeight !== 'undefined') {
        a = a + Number($('#weight' + z).val());
      }
    }

    if (a < 100) {
      $('#percentage').removeClass('text-primary');
      $('#percentage').addClass('text-danger');
      $('#percentage').html(a + '%');
    } else if (a > 100) {
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

  $('.comp').on('change', function (res) {
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

    if (a < 100) {
      $('#compBody').html(`        
        <p>Please make sure that the total weightage is 100%</p>        
      `);
      $('#compModal').modal('show');
    } else if (a > 100) {
      $('#compBody').html(`
        <p>Please make sure that the total weightage is 100%</p>       
      `);
      $('#compModal').modal('show');
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
  });

  //choosing top-down
  $(document).click(event => {
    let type = event.target.dataset.type,
      counter = $('#counter').val(),
      id = event.target.id;

    if (type == 'minimum') {
      // let predId = $('.' + method).attr('data-predid');

      $('.btn-method-comp').removeClass('btn-active');
      $('.comp').html(`<option value="0" selected>Select the Score</option>`);
      $('#' + id).addClass('btn-active');
      $('#methodType').val(1);
      for (let x = 1; x <= 10; x++) {
        $('.comp').append(`<option value="${x}">${x}</option>`);
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
      $('.comp').html(`<option value="0" selected>Select the Score</option>`);
      let start = 10,
        add = 10,
        end = 100;
      do {
        $('.comp').append(`<option value="${start}">${start}%</option>`);
        start = start + add;
      } while (start <= end);

      $('.btn-method-comp').removeClass('btn-active');
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

  $('#errorClose').on('click', function () {
    let counter = $('#counter').val();
    $('.btn-method-comp').removeClass('btn-active');
    $('.comp').html(`<option value="0" selected>Select the Score</option>`);
    $('#minimum').addClass('btn-active');
    $('#methodType').val(1);
    for (let x = 1; x <= 10; x++) {
      $('.comp').append(`<option value="${x}">${x}</option>`);
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
  });
};

export default Compensatory;
