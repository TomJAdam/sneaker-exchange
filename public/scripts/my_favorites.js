$(() => {

  /* favorites list button event handler */
  $(document).on('click', '#favourites', (e) => {
    e.preventDefault();
    queries.getAPIListings(20, 1, 'favorites');
  });
});
