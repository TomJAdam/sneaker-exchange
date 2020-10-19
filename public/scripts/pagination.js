$(() => {


    const insertPageLink = (content, currentPage, lastPage) => {
        const anchorPage = $(`<a class="w3-bar-item w3-button w3-hover-black">${content}</a>`);
        if (content !== '...') {
            if (!Number.isInteger(content)) {
                if (content === '«') {
                    content = currentPage > 1 ? content = currentPage - 1 : currentPage;
                } else {
                    content = currentPage < lastPage ? content = currentPage + 1 : lastPage;
                }
            }
            anchorPage.attr(`href`, `api/sneakers?page=${content}`);
            anchorPage.click(function(e) {
                e.preventDefault();
                queries.listSneakers(20, content);
            });
        } else {
            anchorPage.addClass('ellipsis');
        }
        $('#page-anchor').append(anchorPage);
    };

    window.pagination = (currentPage, lastPage) => {
        const pageArr = paginator(currentPage, lastPage);
        pageArr.forEach(pageIndex => {
            insertPageLink(pageIndex, currentPage, lastPage);
        });
    };









});
