// search bar jquery interactions

$(() => {

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
    $('.search-bar form').trigger("reset");
  });

  $(".search-bar form").submit(function(e) {
    e.preventDefault();
    const data = $(this).serialize();
    $('.search-bar form').trigger("reset");
    $.post({
      url: "api/sneakers",
      data: data
    })
    .then(res => {
      const { count, data } = res;
      // const lastPage = Math.ceil(count / limit);
      $('#list-grid').empty();
      data.forEach(row => {
          appendSneakers(row);
      })
      // $('#page-anchor').empty();
      // pagination(currentPage, lastPage);
  });

  });

});
