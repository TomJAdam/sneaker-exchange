/* All routes for Sneakers are defined here */

const express = require('express');
const router = express.Router();

module.exports = (dataHelpers) => {


  /* send back data to different listing pages */

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


  /* filter sneakers */

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


  /* post to sneaker database */

  router.post('/new', (req, res) => {
    const data = req.body;
    data.owner_id = req.session.userId;

    dataHelpers.addSneaker(data)
      .then(() => {
        console.log('success!');
      })
      .catch(err => {
        console.log('err:', err);
      });
  });


  /* get request for fav */

  router.get('/favorites', (req, res) => {
    const userId = req.session.userId;
    if (!userId) {
      res.send('please log in first');
    }
    let dataset = {};

    dataHelpers.getFavouritesForUser(userId, null)
      .then(data => {
        dataset.count = data[0].count;
        return dataHelpers.getFavouritesForUser(userId, 20, req.query);
      })
      .then(data => {
        dataset.data = data;
        res.send(dataset);
      })
      .catch(err => {
        console.log('err:', err);
      });
  });


  /* post to favorites database */

  router.post('/favorites', (req, res) => {
    const sneaker_id = req.body.sneaker_id;
    const user_id = req.session.userId;
    if (!user_id) {
      res.send('please login first');
    }
    const id_set = { sneaker_id, user_id };

    dataHelpers.getFavouritesForUser(user_id, null, req.body)
      .then(data => {
        if (Number(data[0].count)) {
          res.send('Adding failed ... Sneakers existing in your favorites!!!');
        } else {
          dataHelpers.addFavouritesForUser(id_set)
            .then(row => {
              res.send('Success! Sneakers added in your favorites');
            })
            .catch(err => {
              console.log(`failed to post into database`);
            });
        }

      });


  });


  /* get mylistings */

  router.get('/mylistings', (req, res) => {
    const userId = req.session.userId;
    if (!userId) {
      res.send('please log in first');
    }
    let dataset = {};

    dataHelpers.getMyListings(userId)
      .then(data => {
        dataset.count = data[0].count;
        return dataHelpers.getMyListings(userId, 20, req.query);
      })
      .then(data => {
        dataset.data = data;
        dataset.data.forEach((item) => item.userId = userId);
        res.send(dataset);
      })
      .catch(err => {
        console.log('err:', err);
      });
  });


  /* mark sold from my listings page */

  router.post('/marksold', (req, res) => {
    dataHelpers.markItemSold(req.body.sneakerId)
      .then(res => {
        console.log(res);
      })
      .catch(console.log);
  });


  /* delete item from mylisting page */

  router.post('/delete', (req, res) => {
    dataHelpers.deleteItem(req.body.sneakerId);
  });


  /* access to specific sneakers by id */

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




  return router;
};
