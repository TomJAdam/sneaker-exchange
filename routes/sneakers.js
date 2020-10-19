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



    return router;
};
