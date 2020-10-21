$(() => {


    $(document).on("click", "#nav-login-button", function(e) {
        e.preventDefault();
        console.log("nav");
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


        if ($(".login-register-forms").is(':empty')) {
            $(".login-register-forms").append($loginForm);
        } else {
            $(".login-register-forms").empty();
        }

    })
    const $loginAfter = (user) => {
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
  `)
    };
    $("#nav-logout-button").click(e => console.log("HEY"));

    $(document).on("submit", "#login-form", function(e) {
        e.preventDefault();
        const data = $(this).serialize();
        console.log('data :', data);
        $('.post-item form').trigger("reset");
        $.post({
                url: "/user/login",
                data: data
            })
            .then((response) => {
                // console.log("resposense.data", response);
                $("main").toggle();
                $(".login-register-forms").empty();
                $("#nav-login-button").hide();
                $("#nav-register-button").hide();
                $(".w3-top").append($loginAfter(response));


            })
    })


  $.get({
    url: "/user/checkLogin",

      })
  .then((response) => {
    console.log("resposense.data",response);
    // $("main").toggle();
    $(".login-register-forms").empty();
    $("#nav-login-button").hide();
    $("#nav-register-button").hide();
    $(".w3-top").html($loginAfter(response));
  }, () => {
    // in case of error do javascript here, there is no session.
    // return res.status(401).send("No session key!");
  })



  //exit button ! needs work !
  $(document).on("click", "#hide-button", () => {
    $("main").show();
    $(".login-register-forms").empty();
  })


});

