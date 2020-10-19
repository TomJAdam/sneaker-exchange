$(() => {

    const listSneakers = (limit, currentPage = 1, filters) => {
        $.get({
                url: `api/sneakers?${filters ? filters + '&' : ''}&page=${currentPage}`,
            })
            .then(res => {
                console.log(filters);
                const { count, data } = res;
                const lastPage = Math.ceil(count / limit);
                $('#list-grid').empty();
                data.forEach(row => {
                    appendSneakers(row);
                });
                $('#page-anchor').empty();
                pagination(currentPage, lastPage, filters);
            });
    };

    const sortSneakers = (limit, filters) => {
        $.post({
                url: "api/sneakers",
                data: filters
            })
            .then(res => {
                const { count, data } = res;
                const lastPage = Math.ceil(count / limit);
                $('#list-grid').empty();
                data.forEach(row => {
                    appendSneakers(row);
                });
                $('#page-anchor').empty();
                pagination(1, lastPage, filters);
            });
    };



    window.queries = {
        listSneakers,
        sortSneakers
    };



});
