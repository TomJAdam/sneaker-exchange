$(() => {



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
          <div class='info'>
          <h3>${title}</h3>
          <p>${price}</p>
          </div>
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

    // const insertPageLink = content => {
    //     $(`<a href="#" class="w3-bar-item w3-button w3-hover-black">${content}</a>`).insertBefore($('#next'));
    // };
    const paginator = (current, last) => {
        let range = [],
            rangeWithDots = [],
            delta = 1,
            left = current - delta,
            right = current + delta + 1,
            l;

        for (let i = 1; i <= last; i++) {
            if (i === 1 || i === last || (i >= left && i < right)) {
                range.push(i);
            }
        }
        let length = range.length;
        range.forEach(page => {
            if (l) {
                if (range.length < 5) {
                    while (page - l >= 2 && length < 5) {
                        rangeWithDots.push(++l);
                        length++;
                    }
                } else if (page - l !== 1) {
                    rangeWithDots.push('...');
                }
            }
            rangeWithDots.push(page);
            l = page;
        });
        return rangeWithDots;


    };

    for (let i = 1; i <= 20; i++) {
        console.log(paginator(i, 20));
    }












});
