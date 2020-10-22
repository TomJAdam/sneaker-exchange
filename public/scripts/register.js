// register

$(() => {

  $(document).on("click", "#nav-register-button", function(e) {
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
    `);

    if ($(".login-register-forms").is(':empty')) {
      $(".login-register-forms").append($registerForm);
    } else {
      $(".login-register-forms").empty();
    }

  });


  const $registerAfter = (user) => {
    return $(`
<nav>
<div class="w3-top">
    <div class="w3-white w3-xlarge">
        <div class="w3-bar">
            <a href="#" id="logo" class="w3-bar-item w3-button w3-hover-none w3-border-white w3-bottombar w3-hover-border-black w3-left w3-padding-16">Sneaker<b>Exchange</b></a>

            <a id="search" class="w3-bar-item w3-button w3-hover-none w3-border-white w3-bottombar w3-hover-border-black w3-padding-16">search</a>

            <a id="favourites" class="w3-bar-item w3-button w3-hover-none w3-border-white w3-bottombar w3-hover-border-black w3-padding-16">favorites</a>

            <a id="sell-item" class="w3-bar-item w3-button w3-hover-none w3-border-white w3-bottombar w3-hover-border-black w3-padding-16">sell</a>
            <a id="my-listings" class="w3-bar-item w3-button w3-hover-none w3-border-white w3-bottombar w3-hover-border-black w3-padding-16">my listings</a>

            <a id="nav-logout-button" class="w3-bar-item w3-button w3-hover-none w3-border-white w3-bottombar w3-hover-border-black w3-right w3-padding-16">Logout</a>

            <!-- <a id="nav-register-button" href="/user/register" class="nav-item nav-link w3-hover-none w3-border-white w3-right w3-padding-16">Logged in as: ${user["user"]["email"]}</a> -->
        </div>

    </div>
</div>
</nav>
`);
  };

  $(document).on("submit", "#register-form", function(e) {
    e.preventDefault();
    const data = $(this).serialize();
    $('.post-item form').trigger("reset");

    $.post({
      url: "/user/register",
      data: data
    })
      .then((response) => {

        $("main").toggle();
        $(".login-register-forms").empty();
        $("#nav-login-button").hide();
        $("#nav-register-button").hide();
        $(".w3-top").append($registerAfter(response));
      });

  });

  $.get({
    url: "/user/checkLogin",

  })
    .then((response) => {

      $(".login-register-forms").empty();
      $("#nav-login-button").hide();
      $("#nav-register-button").hide();
      $(".w3-top").html($registerAfter(response));
    }, () => {
      // in case of error do javascript here, there is no session.
      // return res.status(401).send("No session key!");
    });

  //exit button
  $(document).on("click", "#hide-button", () => {
    $("main").show();
    $(".login-register-forms").empty();
  });




});
