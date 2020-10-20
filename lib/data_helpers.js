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

    // add sneaker to database
    const addSneaker = function(sneaker) {
      const queryParams = [sneaker.owner_id, sneaker.title, sneaker.brand, sneaker.price, sneaker.size, sneaker.model_year, sneaker.thumbnail_photo_url, sneaker.main_photo_url, sneaker.date_posted, sneaker.country, sneaker.city, sneaker.province];
      return db.query(`
      INSERT INTO sneakers (owner_id, title, brand, price, size, model_year, thumbnail_photo_url, main_photo_url, date_posted, country, city, province)
      VALUES ($1, $2, $3, $4, $5, $6, $7, $8, $9, $10, $11, $12);
      `, queryParams)
    }

    // add user to database
    const addUser = function(user) {
      const queryParams = [user.name, user.email, user.phone, user.password];
      return db.query(`
      INSERT INTO users (name, email, phone, password)
      VALUES ($1, $2, $3, $4)
      RETURNING *;
      `, queryParams)
      .then(res => {
      console.log('res :', res);
      res.rows[0];
      })
      .catch(console.log)
    }

    //fetch user with email (login)
    const getUserWithEmail = function(email) {
      return db.query(`
      SELECT *
      FROM users
      WHERE email = $1
      `, [email.toLowerCase()])
      .then(res => {
      console.log('res :', res);
        res.rows[0]
      })
    }

    return {

        sneakersListings,
        addSneaker,
        addUser,
        getUserWithEmail
    };
  };


