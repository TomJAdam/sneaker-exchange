$(() => {

  const listSneakers = function(limit, currentPage = 1, filters) {
    $.get({
      url: `api/sneakers?${filters ? filters + '&' : ''}&page=${currentPage}`,
    })
      .then(res => {
        const { count, data } = res;
        const lastPage = Math.ceil(count / limit);
        $('#sneakers-detail').remove();
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
        $('#sneakers-detail').remove();
        $('#list-grid').empty();
        data.forEach(row => {
          appendSneakers(row);
        });
        $('#page-anchor').empty();
        pagination(1, lastPage, filters);
      });
  };

  const getDetails = (id) => {
    $.get({
      url: `api/sneakers/${id}`
    })
      .then(res => {
        $('#list-grid').empty();
        $('#page-anchor').empty();
        sneakersDetails(res[0]);
      });
  };
  const getFavourites = (limit, currentPage = 1) => {
    $.get({
      url: `api/sneakers/favorites`,
    })
      .then(res => {
        const { count, data } = res;
        const lastPage = Math.ceil(count / limit);
        $('#sneakers-detail').remove();
        $('#list-grid').empty();
        data.forEach(row => {
          appendSneakers(row);
        });
        $('#page-anchor').empty();
        pagination(currentPage, lastPage, null, 'favorites');
      });
  };

  const getMyListings = (limit, currentPage = 1) => {
    $.get({
      url: `api/sneakers/myListings`,
    })
      .then(res => {
        const { count, data } = res;
        const lastPage = Math.ceil(count / limit);
        $('#sneakers-detail').remove();
        $('#list-grid').empty();
        data.forEach(row => {
          appendSneakers(row);
        });
        $('#page-anchor').empty();
        pagination(currentPage, lastPage, null, 'favorites');
      });
  };


  window.queries = {
    listSneakers,
    sortSneakers,
    getDetails,
    getFavourites,
    getMyListings
  };



});
