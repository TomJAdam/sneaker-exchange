$(() => {

  /* listing all the sneakers matching the current page (and the filter results if exists) */

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

  /* filter search request to get relevant results and pagination */

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



  /* request to get the sneakers' details page */

  const getDetails = (id, href) => {

    $.get({
      url: `api/sneakers/${id}`
    })
      .then(res => {
        $('#list-grid').empty();
        $('#page-anchor').empty();

        sneakersDetails(res[0], href);
      });

  };


  /* listing sneakers tha matching the related API(ex. favorites || mylistings) */

  const getAPIListings = (limit, currentPage = 1, endpoint) => {

    $.get({
      url: `api/sneakers/${endpoint}?&page=${currentPage}`,
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
        pagination(currentPage, lastPage, null, endpoint);

      });

  };

  /* post request to add sneakers to my favorites list */

  const addToMyFavorites = sneaker_id => {

    $.post({
      url: `api/sneakers/favorites`,
      data: { sneaker_id }
    })
      .then(res => {
        alert(res);
      });
  };



  window.queries = {
    listSneakers,
    sortSneakers,
    getDetails,
    getAPIListings,
    addToMyFavorites
  };



});
