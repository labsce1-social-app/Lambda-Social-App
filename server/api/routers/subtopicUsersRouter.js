const router = require('express').Router();
const db = require('../../data/dbconfig.js');

const {
  getUsersFavSubtopics,
  addFavoriteSubtopicToUser,
  unFavoriteSubtopicById
} = require('../helpers/userSubsHelper');

router.get('/:id', (req, res) => {
  const { id } = req.params;

  getUsersFavSubtopics(id)
    .then(subs => {
      console.log('SUBS', subs);
      res.status(200).json(subs);
    })
    .catch(err => {
      console.log(err);
      res.json({ err });
    });
});

router.post('/favorite', (req, res) => {
  console.log('REQ.BODY: ', req.body);
  addFavoriteSubtopicToUser(req.body)
    .then(ret => {
      console.log('SUCCESS ADDING: ', ret);
      getUsersFavSubtopics(ret[0].user_id).then(favSubs => {
        res.status(200).json(favSubs);
      });
    })
    .catch(err => {
      console.log('COULDNT INSERT ', err);
      res.status(500).json({ error: err });
    });
});

router.delete('/unfavorite/:id', (req, res) => {
  const { id } = req.params;

  unFavoriteSubtopicById(id)
    .then(ret => {
      console.log('DELTED IN ROUTER: ', ret);
      res.status(200).json({ message: `Successfully unfavorited` });
    })
    .catch(err => {
      res.status(500).json({ error: err });
    });
});

module.exports = router;
