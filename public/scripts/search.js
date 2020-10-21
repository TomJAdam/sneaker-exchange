// search bar jquery interactions

$(() => {

    $(document).on("click", "#search", function() {
        $(".search-bar").slideDown('fast');
    });

    $(document).on("click", "#search", function() {
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
        const filters = $(this).serialize();
        $('.search-bar form').trigger("reset");
        queries.sortSneakers(20, filters);

    });

});
