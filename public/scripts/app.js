$(() => {

    const listSneakers = (limit, currentPage = 1) => {
        $.get({
                url: `api/sneakers?page=${currentPage}`,
            })
            .then(res => {
                const { count, data } = res;
                const lastPage = Math.ceil(count / limit);
                $('#list-grid').empty();
                data.forEach(row => {
                    appendSneakers(row);
                });
                $('#page-anchor').empty();
                pagination(currentPage, lastPage);
            });
    };

    // const sortSneakers = (formData, limit) => {
    //     const data = formData.serialize();
    //     $.post({
    //             url: 'api/sneakers',
    //             data
    //         })
    //         .then(res => {
    //             const page = Math.ceil(res.length / limit);
    //             res.forEach(data => {
    //                 appendSneakers(data);
    //             });
    //         })
    //         .catch(err => console.log(`Found Error: `, err));
    // };


    window.queries = {
        listSneakers
    };



});
