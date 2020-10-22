$(() => {


  /* mylistings button click event */

  $(document).on("click", "#my-listings", () => {
    queries.getAPIListings(20, 1, 'mylistings');
  });



  /* mylistings mark sold click event */

  $(document).on("click", "#mark-sold-button", function(e) {

    let id = $(this).attr('data-sneaker-id');
    $.post({
      url: "api/sneakers/marksold",
      data: { sneakerId: id }
    });

  });


  /* mylistings delete event */

  $(document).on('click', '#delete-listing', function() {

    let id = $(this).attr('data-sneaker-id');
    $(this).closest(".w3-quarter").remove();
    $.post({
      url: "api/sneakers/delete",
      data: { sneakerId: id }
    });
  });

});
