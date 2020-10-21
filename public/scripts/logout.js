function logOut() {
  return $.ajax({
    method: "POST",
    url: "/user/logout",
  })
}

$(() => {


  $(document).on("click", "#nav-logout-button", function() {
    $.post({
      url: "/user/logout"
    })
    .then(() => {
      const $noUserNav = `
      <nav>
      <div class="w3-top">
          <div class="w3-white w3-xlarge">
              <div class="w3-bar">
                  <a href="#" id="logo" class="w3-bar-item w3-button w3-hover-none w3-border-white w3-bottombar w3-hover-border-black w3-left w3-padding-16">Sneaker<b>Exchange</b></a>
                  <a id="search" class="w3-bar-item w3-button w3-hover-none w3-border-white w3-bottombar w3-hover-border-black w3-padding-16">search</a>
                  <a id="nav-login-button" href="/user/login" class="w3-bar-item w3-button w3-hover-none w3-border-white w3-bottombar w3-hover-border-black w3-right w3-padding-16">login</a>
                  <a id="nav-register-button" href="/user/register" class="w3-bar-item w3-button w3-hover-none w3-border-white w3-bottombar w3-hover-border-black w3-right w3-padding-16">register</a>
              </div>
              </div>
          </div>
      </nav>
      `
      $(".w3-top").append($noUserNav);
    })
  });




})

