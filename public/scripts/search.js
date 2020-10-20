// search bar jquery interactions

$(() => {

    $("#search").click(function() {
        $(".search-bar").slideDown('fast');
    });

    $("#search").click(function() {
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
