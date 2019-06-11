const router = require('express').Router();
const db = require('../../data/dbconfig.js');
const { discussionHelper } = require('../helpers/index.js');

// used for updated timestamps
const moment = require('moment');
let timestamp = moment().format('YYYY-MM-DD HH:mm:ss');

/*
GET ROUTE get all discussions
@PARAM = NONE
ROUTE = '/discussions
returns = all discussions
TESTS: {
    1) RETURNS LIST OF discussions > 1
}
*/

router.get('/', (req, res) => {
  discussionHelper
    .joinUsersAndSubtopic()
    .then(discussions => {
      res.status(200).json(discussions);
    })
    .catch(err => {
      res.status(500).json({ error: err });
    });
});

/*
GET ROUTE get single discussion
@PARAM = {
    id: !INT
}
ROUTE = '/discussions/:id
returns = single discussion
TESTS: {
    1) RETURNS SINGLE SPECIFIED DISCUSSION
}
*/

router.get('/:id', (req, res) => {
  const { id } = req.params;

  discussionHelper
    .joinUsersAndSubtopicAtId(id)
    .then(disucssion => {
      res.status(200).json(disucssion);
    })
    .catch(err => {
      res.status(500).json({ error: err });
    });
});

/*
POST ROUTE create a discussion
TODO: Add middleware to ensure user is logged in
NOTE: content or image must be present
@BODY = {
    title: !STRING >= 50 characters - REQUIRED
    subtopic_id: !INT - REQUIRED
    creater_id: !INT - REQUIRED
    image: !STRING - OPTIONAL
    content: !STRING - OPTIONAL
}
ROUTE = '/discussions/create
returns = id of created discussion
TESTS: {
    1) SHOULD RETURN ERROR IF TITLE OR SUBTOPIC_ID OR CREATER_ID IS NOT PRESENT
    2) SHOULD RETURN ERROR IF SUBTOPIC_ID IS NOT VALID
    3) SHOULD RETURN ERROR IF TITLE HAS ALREADY BEEN USED 
    4) SHOULD RETURN ERROR IF TITLE IS EMPTY OR 0 CHARACTERS OR GREATER THAN 50 CHARECTERS
    5) SHOULD RETURN ERROR IF BOTH IMAGE AND CONTENT ARE MISSING 
    6) SHOULD RETURN ERROR IF CREATER_ID IS NOT VALID
}
*/

router.post('/create', async (req, res) => {
  const { subtopic_id, title, image, content, creater_id } = req.body;

  if (
    title == null ||
    title == undefined ||
    title.length === 0 ||
    title.length > 50 ||
    title === '' ||
    subtopic_id == null ||
    subtopic_id == undefined ||
    creater_id == null ||
    creater_id == undefined
  ) {
    res.status(400).json({
      error:
        'title must be between 0 and 50 charecters, subtopic_id must be valid'
    });
  } else if ((await discussionHelper.checkValidUser(creater_id)) === false) {
    res.status(500).json({ error: 'valid user not found, check creater_id' });
  } else if (
    (image === null && content === null) ||
    (image === undefined && content === undefined) ||
    (image === '' && content === '')
  ) {
    res.status(400).json({ error: 'must contain either an image or content' });
  } else if ((await discussionHelper.canInsertDisucssion(title)) === false) {
    res.status(500).json({ error: 'subtopic already exists' });
  } else if (
    (await discussionHelper.checkValidSubtopic(subtopic_id)) === false
  ) {
    res.status(500).json({ error: 'valid subtopic not found' });
  } else {
    db('discussion')
      .insert({
        subtopic_id,
        title,
        image,
        content,
        creater_id
      })
      .then(discussion => {
        res
          .status(201)
          .json({ id: discussion, message: 'Succesfully created discussion' });
      })
      .catch(err => {
        res.status(500).json({ error: err });
      });
  }
});

/*
PUT ROUTE update a discussion
TODO: Add middleware to ensure user is logged in
@BODY = {
    title: !STRING >= 50 characters - REQUIRED
    subtopic_id: !INT - REQUIRED
    creater_id: !INT - REQUIRED
    image: !STRING - OPTIONAL
    content: !STRING - OPTIONAL
}
@PARAMS = {
  id: !INT
}
ROUTE = '/discussions/:id
returns = success if valid
TESTS: {
    1) SHOULD RETURN ERROR IF TITLE OR SUBTOPIC_ID IS NOT PRESENT
    2) SHOULD RETURN ERROR IF SUBTOPIC_ID IS NOT VALID
    3) SHOULD RETURN ERROR IF TITLE HAS ALREADY BEEN USED 
    4) SHOULD RETURN ERROR IF TITLE IS EMPTY OR 0 CHARACTERS OR GREATER THAN 50 CHARECTERS
    5) SHOULD RETURN ERROR IF BOTH IMAGE AND CONTENT ARE MISSING 
    6) SHOULD RETURN ERROR IF CREATER_ID IS NOT VALID
}
*/

router.put('/:id', async (req, res) => {
  const id = req.params;
  const { subtopic_id, title, image, content, creater_id } = req.body;

  if (
    title == null ||
    title == undefined ||
    title.length === 0 ||
    title.length > 50 ||
    title === '' ||
    subtopic_id == null ||
    subtopic_id == undefined ||
    creater_id == null ||
    creater_id == undefined
  ) {
    res.status(400).json({
      error:
        'title must be between 0 and 50 charecters, subtopic_id must be valid'
    });
  } else if (
    (image === null && content === null) ||
    (image === undefined && content === undefined) ||
    (image === '' && content === '')
  ) {
    res.status(400).json({ error: 'must contain either an image or content' });
  } else if ((await discussionHelper.canInsertDisucssion(title)) === false) {
    res.status(500).json({ error: 'subtopic already exists' });
  } else if (
    (await discussionHelper.checkValidSubtopic(subtopic_id)) === false
  ) {
    res.status(500).json({ error: 'valid subtopic not found' });
  } else if ((await discussionHelper.checkValidUser(creater_id)) === false) {
    res.status(500).json({ error: 'valid user not found, check creater_id' });
  } else {
    db('discussion')
      .where(id)
      .update({
        subtopic_id,
        title,
        image,
        content,
        creater_id,
        updated_at: timestamp
      })
      .then(discussion => {
        res
          .status(201)
          .json({ id: discussion, message: 'Succesfully updated discussion' });
      })
      .catch(err => {
        res.status(500).json({ error: err });
      });
  }
});

module.exports = router;
