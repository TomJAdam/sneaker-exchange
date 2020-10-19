module.exports = (db) => {



    //listing limited numbers of shoes in terms of different browsing pages
    const sneakersListings = (limit, data = {}) => {
        let queryString = limit ? `SELECT * FROM sneakers` :
            `SELECT COUNT(*) AS count FROM sneakers`;
        let queryParams = [];

        const {
            brand,
            size,
            city,
            min_price,
            max_price,
            page
        } = data;
        if (brand) {
            queryString += queryParams.length ? ` AND` : ` WHERE`;
            queryParams.push(`%${brand}%`);
            queryString += ` brand LIKE $${queryParams.length}`;
        }
        if (city) {
            queryString += queryParams.length ? ` AND` : ` WHERE`;
            queryParams.push(`%${city}%`);
            queryString += ` city LIKE $${queryParams.length}`;
        }
        if (min_price) {
            queryString += queryParams.length ? ` AND` : ` WHERE`;
            queryParams.push(min_price);
            queryString += ` price >= $${queryParams.length}`;
        }
        if (max_price) {
            queryString += queryParams.length ? ` AND` : ` WHERE`;
            queryParams.push(max_price);
            queryString += ` price <= $${queryParams.length}`;
        }
        if (size) {
            queryString += queryParams.length ? ` AND` : ` WHERE`;
            queryParams.push(size);
            queryString += ` size = $${queryParams.length}`;
        }
        if (limit) {
            queryParams.push(limit);
            queryString += ` LIMIT $${queryParams.length}`;
            if (page) {
                const offset = limit * (page - 1);
                queryParams.push(offset);
                queryString += ` OFFSET $${queryParams.length}`;
            }
        }
        queryString += `;`;
        return db.query(queryString, queryParams)
            .then(res => res.rows)
            .catch(err => {
                console.log(`Error found: `, err);
            });
    };
    return {
        sneakersListings
    };


};
