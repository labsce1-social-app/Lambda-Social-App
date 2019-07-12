const router = require('express').Router();
const db = require('../../data/dbconfig.js');

const {
  getUsersFavSubtopics,
  addFavoriteSubtopicToUser
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
      res.status(200).json(ret[0]);
    })
    .catch(err => {
      console.log('COULDNT INSERT ', err);
      res.status(500).json({ error: err });
    });
});

module.exports = router;
