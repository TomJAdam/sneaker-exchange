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
    });


  //sell button on nav
  $(document).on("click", "#sell-item", () => {
    $(".post-item").show('fast');
  })

  $(document).on("click", "#hide-button", () => {
    $(".post-item").hide();
  })

});
