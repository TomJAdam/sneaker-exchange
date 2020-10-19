// All routes for Sneakers are defined here

const express = require('express');
const router = express.Router();

module.exports = (dataHelpers) => {
    //an example to send data back to client
    // router.get("/", (req, res) => {
    //   const dataset = {};
    //     dataHelpers.dealingWithData()
    //         .then(data => {
    //             res.send(data);
    //         })
    //         .catch(err => {
    //             res
    //                 .status(500)
    //                 .json({ error: err.message });
    //         });
    // });

    // send back data to different listing pages
    router.get('/', (req, res) => {
        const dataset = {};
        dataHelpers.sneakersListings()
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

<<<<<<< HEAD
    // router.get("/login", (req, res) => {
    //   //get for login page
=======
    //search
    router.post('/', (req, res) => {
      const dataset = {};
      dataHelpers.sneakersListings()
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
    })

>>>>>>> 8137e3ec8e5e21c2462dc96c5908fa9c55da0a7e


    //   res.render("login.html");

    // });

    return router;
};
