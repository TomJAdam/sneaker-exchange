// register

$(() => {

  $("form").submit(function(e) {
    e.preventDefault();
    const data = $(this).serialize();
    console.log('data :', data);
    // $('.post-item form').trigger("reset");
    $.post({
      url: "/user/register",
      data: data
    })
  })

})
