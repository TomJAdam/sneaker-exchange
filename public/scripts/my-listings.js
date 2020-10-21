$(() => {


    $(document).on("click", "#my-listings", () => {
      queries.getAPIListings(20, 1, 'mylistings')
        $("w3-quarter footer").hide();
    });


});
