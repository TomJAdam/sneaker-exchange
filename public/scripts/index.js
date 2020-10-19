$(() => {


    //request data from api/sneakers
    queries.listSneakers(20);




    $('#filter-sneakers').on('submit', function(e) {
        e.preventDefault();
        const data = $(this).serialize();
        $.post({
                url: 'api/sneakers',
                data
            })
            .then(res => {
                console.log(data, res);
            });
    });















});
