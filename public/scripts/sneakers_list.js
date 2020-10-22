$(() => {


    //append sneakers to list
    window.appendSneakers = (data) => {
        const $listGrid = $('#list-grid');
        const {
            id,
            owner_id,
            userId,
            thumbnail_photo_url,
            title,
            price
          } = data;

          let $sneaker;

          if (userId === owner_id) {
            $sneaker = $(`
            <div class="w3-quarter">
                  <img src=${thumbnail_photo_url}>
                  <div class='info'>
                  <h4>${title}</h4>
                  <h3><b>$${price}</b></h3>
                  <footer>
                  <button data-sneaker-id="${id}" id="mark-sold-button" class="w3-button w3-white w3-border w3-border-red w3-hover-red w3-round-large">mark sold!</button>
                  <i data-sneaker-id="${id}" id="delete-listing" class="fas fa-times-circle"></i>
                  </footer>
                  </div>
              </div>
            `);

          } else {
            $sneaker = $(`
            <div class="w3-quarter">
                  <img src=${thumbnail_photo_url}>
                  <div class='info'>
                  <h4>${title}</h4>
                  <h3><b>$${price}</b></h3>
                  <footer>
                  <button id="buy-now-button" class="w3-button w3-white w3-border w3-border-green w3-hover-green w3-round-large">buy now</button>
                  <i class="fab fa-gratipay"></i>
                  </footer>
                  </div>
              </div>
            `);
          }


        ($sneaker).on('click', '#buy-now-button', e => {
            e.preventDefault();
            queries.getDetails(id);
        });



        $listGrid.append($sneaker);
    };





});
