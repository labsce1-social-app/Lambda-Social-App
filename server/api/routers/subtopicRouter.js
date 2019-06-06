const router = require('express').Router();
const db = require('../../data/dbconfig.js');
const { subtopicHelper, joinUsersAndSubtopic } = require('../helpers/index.js');

/*
GET ROUTE get all subtopics
@PARAM = NONE
ROUTE = '/api/subtopics
returns = all subtopics
TESTS: {
    1) RETURNS LIST OF SUBTOPICS > 1
}
*/

router.get('/', (req, res) => {
  subtopicHelper.joinUsersAndSubtopic()
    .then(subtopics => {
      console.log(subtopics)
      res.status(200).json(subtopics);
    })
    .catch(err => {
      res.status(500).json({ error: err });
    });
});

/*
GET ROUTE get single subtopic
@PARAM = ID
ROUTE = '/api/subtopics/:id
returns = single subtopic
TESTS: {
    1) RETURNS A SINGLE SUBTOPIC
}
*/

router.get('/:id', (req, res) => {
  const { id } = req.params;

  db('subtopic')
    .where({ id })
    .then(subtopic => {
      res.status(200).json(subtopic);
    })
    .catch(err => {
      res.status(500).json({ error: err });
    });
});


/*
POST ROUTE create a subtopic
TODO: Add middleware to ensure user is logged in, link to subtopic_users table
@BODY = {
    title: !STRING >= 50 characters
    creater_id: !INT
}
ROUTE = '/api/subtopics/create
returns = id of created subtopic
TESTS: {
    1) SHOULD RETURN ERROR IF TITLE OR CREATER_ID IS NOT PRESENT
    2) SHOULD RETURN ERROR IF CREATER_ID IS NOT VALID
    3) SHOULD RETURN ERROR IF TITLE HAS ALREADY BEEN USED
    4) SHOULD RETURN ERROR IF TITLE IS EMPTY OR 0 CHARACTERS OR GREATER THAN 50 CHARECTERS
}
*/

router.post('/create', async (req, res) => {
  const body = req.body;

  if (
    body.title.length === 0 ||
    body.title.length > 50 ||
    body.title === '' ||
    body.title == null ||
    body.title == undefined ||
    body.creater_id == null ||
    body.creater_id == undefined
  ) {
    res.status(400).json({
      error:
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
      res.status(500).json({ error: 'subtopic already exists' });
    }
  }
});

/*
DELETE ROUTE delete a subtopic
TODO: Add middleware to ensure user is logged in
@BODY = {
    creater_id: !INT
}
@PARAMS = {
    id: !INT
}
ROUTE = '/api/subtopics/:id
returns = success if valid
TESTS: {
    1) SHOULD RETURN ERROR IF SUBTOPIC_ID AND USER_ID AREN'T VALID PAIRS IN SUBTOPIC_USERS TABLE
    2) SHOULD RETURN ERROR IF CREATER_ID IS NOT VALID
}
*/

module.exports = router;
