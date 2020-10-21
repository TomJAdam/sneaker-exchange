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

  // filter sneakers
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

  //post to sneaker database
  router.post('/new', (req, res) => {
    dataHelpers.addSneaker(req.body)
      .then((newSneaker) => {
        console.log('success!', newSneaker);
      })
      .catch(err => {
        console.log('err:', err);
      });
  });

  //get request for fav
  router.get('/favorites', (req, res) => {
    const userId = req.session.userId;
    if (!userId) {
      res.send('please log in first');
    }
    let dataset = {};
    dataHelpers.getFavouritesForUser(userId)
      .then(data => {
        dataset.count = data[0].count;
        return dataHelpers.getFavouritesForUser(userId, 20);
      })
      .then(data => {
        dataset.data = data;
        res.send(dataset);
      })
      .catch(err => {
        console.log('err:', err);
      });
  });

  //access to specific sneakers by id
  router.get('/:id', (req, res) => {
    dataHelpers.sneakersListings(true, req.params)
      .then(data => {
        res.send(data);
      })
      .catch(err => {
        res
          .status(500)
          .json({ error: err.message });
      });
  });


  router.get('/mylistings', (req, res) => {
    const userId = req.session.userId;
    if (!userId) {
      res.send('please log in first');
    }
    let dataset = {};
    dataHelpers.getMyListings(userId)
      .then(data => {
        dataset.count = data[0].count;
        return dataHelpers.getMyListings(userId, 20);
      })
      .then(data => {
        dataset.data = data;
        res.send(dataset);
      })
      .catch(err => {
        console.log('err:', err);
      });
  })


  return router;
};
