const router = require('express').Router();
const db = require('../../data/dbconfig.js');
const {
  checkValidUser,
  canInsertSubtopic,
  userCanDeleteAndEditSubtopic,
  checkValidSubtopic,
  getAllSubtopicsWithCreator,
} = require('../helpers/index.js');
const { isEmpty } = require('../utils/index');
/*
GET ROUTE get single subtopic
@PARAM = ID
ROUTE = '/subtopics/:id
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
ROUTE = '/subtopics/create
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

  if (isEmpty(body.title) || body.title.length > 50 || isEmpty(body.title) ||
    isEmpty(body.creater_id)) {
    return res.status(400).json('title must be between 0 and 50 charecters, creater_id must be valid');
  }

  if ((checkValidUser(body.creater_id)) === true) {
    return res.status(404).json('valid user not found, check creater_id');
  }

  if (await canInsertSubtopic(body.title) === false) {
    return res.status(409).json(`${title} already exists`)
  }

  const subtopic = await db('subtopic')
    .insert(body, ['id', 'title', 'creater_id']);
  return res.status(201).json({subtopic, message: 'Successfully created subtopic'})
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
ROUTE = '/subtopics/:id
returns = success if valid
TESTS: {
    1) SHOULD RETURN ERROR IF SUBTOPIC_ID AND USER_ID AREN'T VALID PAIRS IN SUBTOPIC_USERS TABLE
    2) SHOULD RETURN ERROR IF CREATER_ID IS NOT VALID
    3) SHOULD RETURN ERROR IF CREATER_ID IS NOT VALID MATCH TO ID IN SUBTOPIC TABLE
}
*/
router.delete('/:id', async (req, res) => {
  const id = req.params;
  const creater_id = req.body.creater_id;

  if ((await checkValidUser(creater_id)) === false) {
    res.status(500).json({ message: 'valid user not found, check creater_id' });
  } else if ((await checkValidSubtopic(id)) === false) {
    res.status(500).json({ message: 'subtopic not found' });
  } else if ((await userCanDeleteAndEditSubtopic(id, creater_id)) === false) {
    res
      .status(500)
      .json({ message: 'user not authorized to delete this subtopic' });
  } else {
    db('subtopic')
      .where(id)
      .del()
      .then(count => {
        if (count === 0) {
          res.status(401).json({ message: 'subtopic not found' });
        } else {
          res
            .status(200)
            .json({ message: `subtopic id: ${id.id} succesfully deleted` });
        }
      })
      .catch(err => {
        res.status(500).json({ error: err });
      });
  }
});

/*
PUT ROUTE update a subtopic
TODO: Add middleware to ensure user is logged in, check if user is valid subtopic_users pair
@BODY = {
    creater_id: !INT
    title: !STRING >= 50 characters
}
@PARAMS = {
    id: !INT
}
ROUTE = '/subtopics/:id
returns = success if valid
TESTS: {
    1) SHOULD RETURN ERROR IF SUBTOPIC_ID AND USER_ID AREN'T VALID PAIRS IN SUBTOPIC_USERS TABLE
    2) SHOULD RETURN ERROR IF CREATER_ID IS NOT VALID
    3) SHOULD RETURN ERROR IF CREATER_ID IS NOT VALID MATCH TO ID IN SUBTOPIC TABLE
    4) SHOULD RETURN ERROR IF TITLE IS EMPTY, TITLE IS 0 CHARECTERS, TITLE IS GREATER THAN 50 CHARECTERS, CREATER_ID IS UNDEFINED OR NOT PRESENT
    5) SHOULD RETURN ERROR IF SUBTOPIC ALREADY EXISTS
}
*/

router.put('/:id', async (req, res) => {
  const body = req.body;
  const id = req.params;

  if (
    body.title == null ||
    body.title == undefined ||
    body.title.length === 0 ||
    body.title.length > 50 ||
    body.title === '' ||
    body.creater_id == null ||
    body.creater_id == undefined
  ) {
    res.status(400).json({
      error:
        'title must be between 0 and 50 charecters, creater_id must be valid'
    });
  } else if ((await checkValidUser(body.creater_id)) === false) {
    res.status(500).json({ error: 'valid user not found, check creater_id' });
  } else if ((await checkValidSubtopic(id)) === false) {
    res.status(500).json({ message: 'subtopic not found' });
  } else if (
    (await userCanDeleteAndEditSubtopic(id, body.creater_id)) === false
  ) {
    res
      .status(500)
      .json({ message: 'user not authorized to edit this subtopic' });
  } else {
    if (await canInsertSubtopic(body.title)) {
      db('subtopic')
        .where(id)
        .insert(body)
        .then(subtopic => {
          res
            .status(201)
            .json({ id: subtopic, message: 'Succesfully updated subtopic' });
        })
        .catch(err => {
          res.status(500).json({ error: err });
        });
    } else {
      res.status(500).json({ error: 'subtopic already exists' });
    }
  }
});

router.get('/', (req, res) => {
  getAllSubtopicsWithCreator()
    .then(subtopics => {
      res.status(200).json(subtopics);
    })
    .catch(err => {
      res.status(500).json({ error: 'Server error' });
    });
});

module.exports = router;
