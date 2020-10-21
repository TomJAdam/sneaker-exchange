function logOut() {
  return $.ajax({
    method: "POST",
    url: "/user/logout",
  })
}

$(() => {

  $(document).on("click", "#nav-logout-button", function(e) {
    // e.preventDefault();
    console.log("Testing logout");

      logOut();

  });




})

