$(() => {

    $(document).on("click", "#my-listings", () => {
      queries.getMyListings(20);
    });

});
