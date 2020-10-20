// post_item form javascript/jquery

$(() => {

  $(".post-item form").submit(function(e) {
    e.preventDefault();
    const data = $(this).serialize();
    console.log('data :', data);
    $('.post-item form').trigger("reset");
    $.post({
      url: "api/sneakers/new",
      data: data
    })
  })

})
