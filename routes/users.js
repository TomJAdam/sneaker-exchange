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
          .json({
            error: err.message
          });
      });
  });

  router.get('/login', (req, res) => {
    res.render('login');
  });
  router.get('/register', (req, res) => {
    res.render('register');
  });


  // send back data to different listing pages
  router.get('/:page', (req, res) => {
    dataHelpers.sneakersListings({}, 5, req.params.page)
      .then(data => {
        res.send(data);
      })
      .catch(err => {
        res
          .status(500)
          .json({
            error: err.message
          });
      });
  });



  return router;
};
