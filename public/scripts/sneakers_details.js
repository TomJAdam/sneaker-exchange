$(() => {


window.sneakersDetails = (data) => {
  console.log("the data from databasE:", data);
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

        let userEmail;

        $.get({
          url: "/user/email",
          data: { ownerId: owner_id}
        })
        .then(res => {
        // console.log('res :', res);
        userEmail = res.email;
        console.log('res.email :', res.email);
        const $sneakers = $(`<article id='sneakers-detail'>
        <div class='head'>
            <h1>${title}</h3>

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

          $('main.w3-main.w3-content').prepend($sneakers);

      })






};






});
