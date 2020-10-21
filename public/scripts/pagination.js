$(() => {


  const insertPageLink = (content, currentPage, lastPage, filters, api) => {
    const anchorPage = $(`<a class="w3-bar-item w3-button w3-hover-black">${content}</a>`);
    if (content !== '...') {
      if (!Number.isInteger(content)) {
        if (content === '«') {
          content = currentPage > 1 ? content = currentPage - 1 : currentPage;
        } else {
          content = currentPage < lastPage ? content = currentPage + 1 : lastPage;
        }
      } else {
        anchorPage.data('index', content);
      }
      if (!api) {
        const href = `api/sneakers?${filters ? filters + '&' : ''}page=${content}`;
        anchorPage.attr(`href`, href);
        anchorPage.click(function(e) {
          e.preventDefault();
          queries.listSneakers(20, content, filters);
        });
      } else {
        const href = `api/sneakers/${api}page=${content}`;
        anchorPage.attr(`href`, href);
        anchorPage.click(function(e) {
          e.preventDefault();
          queries.getFavourites(20, content);
        });
      }
    } else {
      anchorPage.addClass('ellipsis');
    }
    $('#page-anchor').append(anchorPage);
  };

  window.pagination = (currentPage, lastPage, filters, api) => {
    const pageArr = paginator(currentPage, lastPage);
    pageArr.forEach(pageIndex => {
      insertPageLink(pageIndex, currentPage, lastPage, filters, api);
    });
    $('#page-anchor a').each(function() {
      if ($(this).data('index') === currentPage) {
        $(this).addClass('current-page');
      }
    });
  };





});
