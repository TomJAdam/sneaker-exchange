module.exports = (db) => {
  //This is just an query example to request from database
  const dealingWithData = () => {
    return db.query(`SELECT * FROM users`)
      .then(res => res.rows)
      .catch(err => {
        console.log(`Error found: `, err);
      });
  };

  return { dealingWithData };
};
