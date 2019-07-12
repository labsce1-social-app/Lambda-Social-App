const router = require('express').Router();
const db = require('../../data/dbconfig.js');

const { getUsersFavSubtopics } = require('../helpers/userSubsHelper');

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

module.exports = router;
