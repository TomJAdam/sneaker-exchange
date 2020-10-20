// register

$(() => {

  $("#nav-register-button").click(function(e) {
    e.preventDefault();
    $("main").toggle();

    const $registerForm = $(`
    <div class="signup-header">
    <h3>Create Account</h3>
    <i id="hide-button" class="fas fa-times-circle"></i>
    </div>
    <form id="register-form" class="form-group mb-2" action="/register" method="POST">
      <div>

        <label for="name">Full name</label>
        <input class="form-control" type="text" name="name" placeholder="Enter name"  >
        <label for="email">Email address</label>
        <input class="form-control" type="email" name="email" placeholder="Enter email"  >
        <label for="email">Phone</label>
        <input class="form-control" type="tel" name="phone" placeholder="phone"  >
        <label for="email">Password</label>
        <input class="form-control" type="password" name="password" placeholder="Password">
        <button type="submit" class="btn btn-primary">Register</button>
      </div>
    </form>
    `)

    if($(".login-register-forms").is(':empty')) {
      $(".login-register-forms").append($registerForm);
    } else {
      $(".login-register-forms").empty();
    }

  })

  $(document).on("submit", "#register-form", function(e) {
    e.preventDefault();
    const data = $(this).serialize();
    console.log('data :', data);
    $('.post-item form').trigger("reset");
    $.post({
      url: "/user/register",
      data: data
    })
    .then(() => {
      $("main").toggle();
      $(".login-register-forms").empty();
    })
  })

  //exit button ! needs work !
  $(document).on("click", "#hide-button", () => {
    $("main").show();
    $(".login-register-forms").empty();
  })

})
