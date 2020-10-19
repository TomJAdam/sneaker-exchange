module.exports = (db) => {



    //listing limited numbers of shoes in terms of different browsing pages
    const sneakersListings = (limit, data = {}) => {
        let queryString = limit ? `SELECT * FROM sneakers WHERE` :
            `SELECT COUNT(*) AS count FROM sneakers WHERE`;
        let queryParams = [];

        const {
            brand,
            min_price,
            max_price,
            size,
            city,
            page
        } = data;
        if (brand) {
            queryParams.push(`%${brand}%`);
            queryString += ` AND brand LIKE $${queryParams.length}`;
        }
        if (city) {
            queryParams.push(`%${city}%`);
            queryString += ` AND city LIKE $${queryParams.length}`;
        }
        if (min_price) {
            queryParams.push(min_price);
            queryString += ` AND price >= $${queryParams.length}`;
        }
        if (max_price) {
            queryParams.push(max_price);
            queryString += ` AND price <= $${queryParams.length}`;
        }
        if (size) {
            queryParams.push(size);
            queryString += ` AND size = $${queryParams.length}`;
        }
        queryString = queryParams.length ? queryString : queryString.replace(` WHERE`, ``);
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
