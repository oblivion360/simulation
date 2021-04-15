$(function () {
  let user;
  user = [];
  localStorage.setItem('user', JSON.stringify(user));
});

function animationa() {
  $('.cover').html(`
    <div class="row">
        <div class="col-md-12">
            <div class="embed-responsive embed-responsive-21by9" id="animationa">
                <iframe src="includes/videos/animationa.mp4"
                    class="embed-responsive-item mx-auto"
                    frameborder="0" 
                    marginheight="0" 
                    marginwidth="0" 
                    width="auto" 
                    height="auto" 
                    scrolling="auto">
                </iframe>
            </div>
        </div>
    </div>
  `);

  setTimeout(function () {
    onFinish();
  }, 2500);
}

function onFinish() {
  $('.cover').html(`
        <div class="row">
            <div class="col-md-12 text-center p-auto" id="login">
                <h3 id="login-welcome">WELCOME!</h3>
                <p id="login-text">Please enter your full name.</p>
                <div class="form-group">
                    <input type="text" class="form-control" id="input-text" />
                </div>                
                <button class="btn btn-login rounded-pill" onclick="login()">ENTER</button>
            </div>
        </div>
   `);
}

function login() {
  let user = $('#input-text').val();
  // box-shadow: inset 0 0 5rem rgba(255, 58, 72, 0.5);
  if (user == '') {
    $('#input-text').focus();
    $('#input-text').css({
      'box-shadow': '0 0 5px rgba(255, 58, 72, 0.8)',
      border: '1px solid rgba(255, 58, 72, 0)',
    });
  } else {
    $('#modalWelcome').modal('show');
    $('#modalWelcomeModalLabel').html('Hi ' + user + '!');
    Set.user.push(user);
  }
}

$(document).on('keypress', function (res) {
  if (res.target.id == 'input-text') {
    $('#input-text').css({
      'box-shadow': '0 0 5px rgba(27, 78, 157, 0.8)',
      border: '1px solid rgba(27, 78, 157, 0.8)',
    });
  }
});

function animationb() {
  $('.cover').html(`
      <div class="row">
          <div class="col-md-12">
              <div class="embed-responsive embed-responsive-21by9" id="animationa">
                  <iframe src="includes/videos/animationb.mp4"
                      class="embed-responsive-item mx-auto"
                      frameborder="0" 
                      marginheight="0" 
                      marginwidth="0" 
                      width="100%" 
                      height="100%" 
                      scrolling="auto">
                  </iframe>
              </div>
          </div>
      </div>
    `);

  setTimeout(function () {
    onFinishB();
  }, 2500);
}

function onFinishB() {
  // Put the object into storage
  let user = Set.user;
  localStorage.setItem('user', JSON.stringify(user));
  window.open('index.html', '_self');
}
