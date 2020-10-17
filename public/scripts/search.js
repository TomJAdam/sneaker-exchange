// search bar jquery interactions

$(document).ready(function() {

  $("#search").click(function() {
    $(".search-bar").slideDown('fast');
  });

    $("#search").click(function() {
    $([document.documentElement, document.body]).animate({
      scrollTop: $("header").offset().top
    }, 500);
  });

  $("#hide-button").click(function() {
    $(".search-bar").slideUp('fast');
  });
ß
});
