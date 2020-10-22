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

    const login = (email, password) => {
        return dataHelpers.getUserWithEmail(email)
            .then(user => {
                console.log('user :', user);
                if (password === user.password) {
                    return user;
                }
                return null;
            })
            .catch(console.log);
    }

    router.post('/login', (req, res) => {
      console.log("coming to login ");
        const email = req.body.email;
        const password = req.body.password;
        // console.log('req.body :', req.body);
        login(email, password)
            .then(user => {
                if (!user) {
                    res.send({ error: "error" });
                    return;
                }
                console.log('logged in!')
                req.session.userId = user.id;
                res.send({ user: { name: user.name, email: user.email, phone: user.phone, id: user.id } })
            })
    })

    router.get('/checkLogin', (req, res) => {
        const userId = req.session.userId;
        if (!userId) {
            //  res.send({error: "error"});
            console.log("inside the error not signed condition");
            res.status(401).send("Not logged in!");
            return;
        }
        //userId from session is only an integer, take integer and look for user in database using that id.

        dataHelpers.getUserWithID(userId)
            .then(user => {
                res.send({
                    user: { name: user.name, email: user.email, phone: user.phone, id: user.id }
                })

            })
            .catch(console.log);
        // console.log("user is: ", user);
    })

    //logout
    router.post('/logout', (req, res) => {
        console.log("logout test");
        req.session = null;
        res.send({});
    });

    // register

    router.post('/register', (req, res) => {



        dataHelpers.addUser(req.body)
            .then((user) => {
                console.log('user :', user);
                if (!user) {

                    res.send({ error: "error" });
                    return;
                }
                req.session.userId = user.id
                res.send({ user: { name: user.name, email: user.email, phone: user.phone, id: user.id } })
                console.log("successful user creation")
            })
    })

    // get email from user
    router.get('/email', (req, res) => {
      console.log('req.query.ownerId :', req.query.ownerId);
      return dataHelpers.getUserWithOwnerId(req.query.ownerId)
      .then(data => {
        res.send(data);
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
