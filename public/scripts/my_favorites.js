$(() => {
  $(document).on('click', '#favourites', (e) => {
    e.preventDefault();
    queries.getFavourites(20);
  });
});
