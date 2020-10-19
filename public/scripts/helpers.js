$(() => {
    window.paginator = (current, last) => {
        let range = [],
            rangeWithDots = [],
            allPageElement = ['«', '»'],
            delta = 1,
            left = current - delta,
            right = current + delta + 1,
            l;

        for (let i = 1; i <= last; i++) {
            if (i === 1 || i === last || (i >= left && i < right)) {
                range.push(i);
            }
        }
        range.forEach(page => {
            if (l) {
                if (range.length < 5 && l !== 1) {
                    let length = range.length;
                    while (page - l >= 2 && length < 5) {
                        rangeWithDots.push(++l);
                        length++;
                    }
                }
                if (page - l !== 1) {
                    rangeWithDots.push('...');
                }
                if (range.length < 5 && l === 1) {
                    let length = range.length;
                    while (page - l >= 2 && length < 5) {
                        rangeWithDots.push(page - 5 + length);
                        length++;
                    }
                }
            }
            rangeWithDots.push(page);
            l = page;
        });

        allPageElement.splice(1, 0, ...rangeWithDots);
        return allPageElement;

    };



});
