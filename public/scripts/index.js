$(() => {

    console.log('working');

    //append sneakers to list
    const appendSneakers = data => {
        const $listGrid = $('#list-grid');
        const {
            thumbnail_photo_url,
            title,
            price
        } = data;

        const $sneaker = $(`
<div class="w3-quarter">
            <img src=${thumbnail_photo_url}>
            <h3>${title}</h3>
            <p>${price}</p>
        </div>
`);
        $listGrid.append($sneaker);
    };


    //request data from api/sneakers
    $.get({
            url: 'api/sneakers'
        })
        .then(res => {
            res.forEach(data => {
                appendSneakers(data);
            });
        });














});
