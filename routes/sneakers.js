// All routes for Sneakers are defined here

const express = require('express');
const router = express.Router();

module.exports = (dataHelpers) => {


    // send back data to different listing pages
    router.get('/', (req, res) => {
        const dataset = {};
        dataHelpers.sneakersListings(null, req.query)
            .then(data => {
                dataset.count = data[0].count;
                return dataHelpers.sneakersListings(20, req.query);
            })
            .then(data => {
                dataset.data = data;
                res.send(dataset);
            })
            .catch(err => {
                res
                    .status(500)
                    .json({ error: err.message });
            });
    });

    router.post('/', (req, res) => {
        const dataset = {};
        dataHelpers.sneakersListings(null, req.body)
            .then(data => {
                dataset.count = data[0].count;
                return dataHelpers.sneakersListings(20, req.body);
            })
            .then(data => {
                dataset.data = data;
                res.send(dataset);
            })
            .catch(err => {
                res
                    .status(500)
                    .json({ error: err.message });
            });
    });
<<<<<<< HEAD
=======
    })

    //post to sneaker database
    router.post('/new', (req, res) => {
      dataHelpers.addSneaker(req.body)
    .then((newSneaker) => {
      console.log('success!', newSneaker)
    })
    .catch(err => {
      console.log('err:', err)
    })
    })



    //   res.render("login.html");

    // });
>>>>>>> new-stuff

    return router;
};
