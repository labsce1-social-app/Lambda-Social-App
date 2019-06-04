const router = require('express').Router();
const db = require('../../data/dbconfig.js');
const { subtopicHelper } = require('../helpers/index.js');

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

router.get('/subtopics/:id', (req, res) => {
  const id = req.params;

  db('subtopic')
    .where(id)
    .then(subtopic => {
      res.status(200).send(subtopic);
    })
    .catch(err => {
      res.status(500).json({ error: err });
    });
});

/*
POST ROUTE create a subtopic
@BODY = {
    title: !STRING >= 50 characters
    creater_id: !INT
}
ROUTE = '/api/subtopics/create
returns = [single subtopic]
*/

router.post('/subtopics/create', async (req, res) => {
  const body = req.body;

  if (
    body.title.length === 0 ||
    body.title.length > 50 ||
    body.title === '' ||
    body.creater_id === null
  ) {
    res.status(400).json({
      message:
        'title must be between 0 and 50 charecters, creater_id must be valid'
    });
  } else if ((await subtopicHelper.checkValidUser(body.creater_id)) === false) {
    res.status(500).json({ error: 'no valid user found' });
  } else {
    if (await subtopicHelper.canInsertSubtopic(body.title)) {
      db('subtopic')
        .insert(body)
        .then(subtopic => {
          res
            .status(201)
            .json({ id: subtopic, message: 'Succesfully created subtopic' });
        })
        .catch(err => {
          res.status(500).json({ error: err });
        });
    } else {
      res.status(500).json({ message: 'subtopic already exists' });
    }
  }
});

module.exports = router;
