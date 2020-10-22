$(() => {


  /* request data from api/sneakers */

  queries.listSneakers(20);

  /* sneakerExchange Button to go back to main */

  $(document).on('click', '#logo', e => {
    e.preventDefault();
    queries.listSneakers(20);
  });















});
