$(() => {


    $(document).on("click", "#my-listings", () => {
        queries.getAPIListings(20, 1, 'mylistings');
    });


    // mark sold
    $(document).on("click", "#mark-sold-button", function() {

        $.post({
            url: "api/sneakers/marksold",
            data: $(this).closest(".w3-quarter").data("userData").sneakerId
        })
    })

    // delete
    $(document).on('click', '#delete-listing', function() {
        console.log('delete button')
    })

});
