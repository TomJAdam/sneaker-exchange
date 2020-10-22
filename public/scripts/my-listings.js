$(() => {


    $(document).on("click", "#my-listings", () => {
        queries.getAPIListings(20, 1, 'mylistings');
    });


    // mark sold
    $(document).on("click", "#mark-sold-button", function(e) {
      let id = $(this).attr('data-sneaker-id');
      $.post({
        url: "api/sneakers/marksold",
        data: {sneakerId: id}
      })
    })

    // delete
    $(document).on('click', '#delete-listing', function() {
      let id = $(this).attr('data-sneaker-id');
      $.post({
        url: "api/sneakers/delete",
        data: {sneakerId: id}
      })
    })

});
