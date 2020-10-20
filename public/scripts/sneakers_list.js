$(() => {

    //append sneakers to list
    window.appendSneakers = data => {
        const $listGrid = $('#list-grid');
        const {
            id,
            thumbnail_photo_url,
            title,
            price
        } = data;

        const $sneaker = $(`
<div class="w3-quarter">
      <img src=${thumbnail_photo_url}>
      <div class='info'>
      <h4>${title}</h4>
      <h3><b>$${price}</b></h3>
      <footer>
      <button class="w3-button w3-white w3-border w3-border-green w3-hover-green w3-round-large">buy now</button>
      <i class="fab fa-gratipay"></i>
      </footer>
      </div>
  </div>
`);
        $sneaker.on('click', e => {
            e.preventDefault();
            queries.getDetails(id);
        });
        $listGrid.append($sneaker);
    };










});
