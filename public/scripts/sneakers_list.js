$(() => {

    //append sneakers to list
    window.appendSneakers = data => {
        const $listGrid = $('#list-grid');
        const {
            thumbnail_photo_url,
            title,
            price
        } = data;

        const $sneaker = $(`
<div class="w3-quarter">
      <img src=${thumbnail_photo_url}>
      <div class='info'>
      <h3>${title}</h3>
      <p>${price}</p>
      </div>
  </div>
`);
        $listGrid.append($sneaker);
    };










});
