$(() => {


  window.sneakersDetails = (data, href) => {

    const {
      title,
      owner_id,
      brand,
      price,
      size,
      model_year,
      main_photo_url,
      date_posted,
      country,
      city,
      province,
      sold,
    } = data;


    $.get({
      url: "/user/email",
      data: { ownerId: owner_id }
    })
      .then(res => {

        const userEmail = res.email;
        const $sneakers = $(`<article id='sneakers-detail'>
        <div class='head'>
            <h1>${title}</h3>
            <a id="go-back" href=${href}></a>
            <a class="mail" target="_blank" href="mailto:${res.email}" type="submit" <button>E-Mail me</a>
                <ul>
                    <li>${city}</li>
                    <li>${province}</li>
                    <li>${country}</li>
                </ul>
        </div>
        <div class='main ${sold ? `sold` : ''}'>
            <img src=${main_photo_url} alt="">
        </div>
        <div class='foot'>
            <ul>
                <li><strong>Brand</strong>${brand}</li>
                <li><strong>Size</strong>${size}</li>
                <li><strong>Price</strong>${price}</li>
                <li><strong>In Stock</strong>${sold ? 'N/A' : 'available'}</li>
                <li><strong>Year of Model</strong>${model_year}</li>
                <li><strong>Release Date</strong>${date_posted}</li>
            </ul>
        </div>
        </article>`);

        /* go back button event */
        $sneakers.find('#go-back').on('click', e => {
          e.preventDefault();
          const filters = href.match(/(?<=\?).*(?=page)/)[0];
          const currentPage = Number(href.match(/(?<=page=).*/)[0]);

          if (/(?<=sneakers\/).*(?=\?)/.test(href)) {
            const endpoint = href.match(/(?<=sneakers\/).*(?=\?)/)[0];
            queries.getAPIListings(20, currentPage, endpoint);
          } else {
            queries.listSneakers(20, currentPage, filters);
          }

        });



        $('main.w3-main.w3-content').prepend($sneakers);

      });




  };










  
});
