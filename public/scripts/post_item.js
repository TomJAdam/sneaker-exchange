// post_item form javascript/jquery

$(() => {

    $(".post-item form").submit(function(e) {
        e.preventDefault();
        const data = $(this).serialize();
        $('.post-item form').trigger("reset");
        $(".post-item").hide('fast');
        $.post({
            url: "api/sneakers/new",
            data: data
        })
        .then((res) => {
          queries.getAPIListings(20, 1, 'mylistings');
        })
    });


  //sell button on nav
  $(document).on("click", "#sell-item", () => {
    $(".post-item").show('fast');
  })

  $(document).on("click", "#hide-button", () => {
    $(".post-item").hide();
  })

});
