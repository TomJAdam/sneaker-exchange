/*
 * All routes for Users are defined here
 * Since this file is loaded in server.js into api/users,
 *   these routes are mounted onto /users
 * See: https://expressjs.com/en/guide/using-middleware.html#middleware.router
 */

const express = require('express');
const router = express.Router();

module.exports = (dataHelpers) => {
  //an example to send data back to client
  router.get("/", (req, res) => {
    dataHelpers.dealingWithData()
      .then(data => {
        res.send(data);
      })
      .catch(err => {
        res
          .status(500)
          .json({ error: err.message });
      });
  });





  return router;
};
