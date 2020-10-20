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


  // login
  router.get('/login', (req, res) => {
    res.render('login');
  });

  const login = (email, password) => {
    return dataHelpers.getUserWithEmail(email)
    .then(user => {
      if (password === user.password) {
        return user;
      }
      return null;
    })
  }

  router.post('/login', (req, res) => {
    const {email, password} = req.body;
    login(email, password)
      .then(user => {
        if (!user) {
          res.send({error: "error"});
          return;
        }
        req.session.userId = user.id;
        res.send({user: {name: user.name, email: user.email, phone: user.phone, id: user.id}})
      })
  })


  // register

  router.get('/register', (req, res) => {
    res.render('register');
  });

  router.post('/register', (req, res) => {
    dataHelpers.addUser(req.body)
    .then((user) => {
      if (!user) {
        res.send({error: "error"});
        return;
      }
      res.session.userId = user.id
      res.send("successful user creation")
    })
  })

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
