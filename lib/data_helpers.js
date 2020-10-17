module.exports = (db) => {
  //This is just an query example to request from database
  const dealingWithData = () => {
    return db.query(`SELECT * FROM users`)
      .then(res => res.rows)
      .catch(err => {
        console.log(`Error found: `, err);
      });
  };
    //listing limited numbers of shoes in terms of different browsing pages
  const sneakersListings = (sneakers, limit, page) => {
    // table users for testing
    let queryString = `SELECT * FROM users `; //sneakers
    let queryParams = [];
    const offset = limit * page; //page related to the page anchor index if it is array of <li>
    if (Object.keys(sneakers).length) {
      //more filters
    }
    queryParams.push(limit);
    queryString += `LIMIT $${queryParams.length} `;
    queryParams.push(offset);
    queryString += `OFFSET $${queryParams.length};`;
    return db.query(queryString, queryParams)
      .then(res => res.rows)
      .catch(err => {
        console.log(`Error found: `, err);
      });
  };
  return {
    dealingWithData, //query template
    sneakersListings
  };
};
