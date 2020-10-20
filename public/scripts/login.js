$(() => {

  $("#nav-login-button").click(function(e) {
    e.preventDefault();
    $("main").toggle();

    const $loginForm = $(`
    <div class="signup-header">
    <h3>Login</h3>
    <i id="hide-button" class="fas fa-times-circle"></i>
    </div>
      <form id="login-form" class="form-group mb-2" action="/login" method="POST">
        <div>

          <label for="email">Email address</label>
          <input class="form-control" type="email" name="email" placeholder="Enter email">
          <label for="email">Password</label>
          <input class="form-control" type="password" name="password" placeholder="Password">
          <button type="submit" class="btn btn-primary">Login</button>
        </div>
      </form>
    `)

    if($(".login-register-forms").is(':empty')) {
      $(".login-register-forms").append($loginForm);
    } else {
      $(".login-register-forms").empty();
    }

  })

  $(document).on("submit", "#login-form", function(e) {
    e.preventDefault();
    const data = $(this).serialize();
    console.log('data :', data);
    $('.post-item form').trigger("reset");
    $.post({
      url: "/user/login",
      data: data
    })
    .then(() => {
      $("main").toggle();
      $(".login-register-forms").empty();
    })
  })

  //exit button
  $(document).on("click", "#hide-button", () => {
    if($("main").is(':empty')) {
      $("main").toggle();
      $(".login-register-forms").empty();
    }
  })

})
