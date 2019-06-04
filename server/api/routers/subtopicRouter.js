const router = require('express').Router();
const db = require('../../data/dbconfig.js');

/*
GET ROUTE get all subtopics
@PARAM = NONE
ROUTE = '/api/subtopics
returns = [all subtopics]
*/

router.get('/subtopics', (req, res) => {
  db('subtopic')
    .then(subtopics => {
      res.status(200).send(subtopics);
    })
    .catch(err => {
      res.status(500).json({ error: err });
    });
});

/*
GET ROUTE get single subtopic
@PARAM = ID
ROUTE = '/api/subtopics/:id
returns = [single subtopic]
*/

module.exports = router;
