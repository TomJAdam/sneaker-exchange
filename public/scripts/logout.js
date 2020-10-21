$(() => {
  $("nav-logout-button").on("click", function() {

    $.post({
      url: "/user/logout"
    })
  });




})

