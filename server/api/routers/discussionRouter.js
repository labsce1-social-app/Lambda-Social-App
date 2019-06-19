const router = require('express').Router();
const db = require('../../data/dbconfig.js');
const {
  joinUsersAndSubtopic,
  joinUsersAndSubtopicAtId,
  canInsertDisucssion,
  checkValidSubtopic,
  checkValidUser,
  userCanEditDiscussion,
  checkValidDiscussion,
  userCanDeleteDiscussion,
  topDiscussions,
  joinUsersAtSubtopicId
} = require('../helpers/index.js');

// used for updated timestamps
const moment = require('moment');
let timestamp = moment().format('YYYY-MM-DD HH:mm:ss');

/*
GET ROUTE get top 10 discussions
@PARAM = NONE
ROUTE = '/discussions
returns = top 10 discussions
TESTS: {
    1) RETURNS TOP 10 DISCUSSIONS BASED ON UPVOTES
}
*/

router.get('/?', (req, res) => {
  const { sort } = req.query;
  topDiscussions(sort)
    .then(discussions => {
      res.status(200).json(discussions);
    })
    .catch(err => {
      res.status(500).json({ error: err });
    });
});

/*
GET ROUTE get all discussions
@PARAM = NONE
ROUTE = '/discussions/all
returns = all discussions
TESTS: {
    1) RETURNS LIST OF discussions > 1
}
*/

router.get('/all', (req, res) => {
  joinUsersAndSubtopic()
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
  joinUsersAndSubtopicAtId(id)
    .then(discussion => {
      if (discussion.length > 0) {
        res.status(200).json(discussion);
      } else {
        res.status(401).json({ error: 'discussion not found' });
      }
    })
    .catch(err => {
      res.status(500).json({ error: err });
    });
});

/*
GET ALL DISCUSSION ROUTE BY SUBTOPIC_ID - gets all routes by subtopic_id
@PARAM = {
    id: !INT
}
ROUTE = '/discussions/s/:id
returns = all discussions with subtopic_id
TESTS: {
    1) RETURNS DISCUSSIONS BY SUBTOPIC_ID
}
*/

router.get('/s/:id', (req, res) => {
  const { id } = req.params;

  joinUsersAtSubtopicId(id)
    .then(discussion => {
      if (discussion.length > 0) {
        res.status(200).json(discussion);
      } else {
        res.status(401).json({ error: 'discussion not found' });
      }
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
  } else if ((await checkValidUser(creater_id)) === false) {
    res.status(500).json({ error: 'valid user not found, check creater_id' });
  } else if (
    (image === null && content === null) ||
    (image === undefined && content === undefined) ||
    (image === '' && content === '')
  ) {
    res.status(400).json({ error: 'must contain either an image or content' });
  } else if ((await canInsertDisucssion(title)) === false) {
    res.status(500).json({ error: 'subtopic already exists' });
  } else if ((await checkValidSubtopic(subtopic_id)) === false) {
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
    7) SHOULD RETURN ERROR IF SUBTOPIC_ID, ID, AND CREATER_ID AREN'T VALID MATCHES IN DISCUSSION TABLE
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
  } else if ((await canInsertDisucssion(title)) === false) {
    res.status(500).json({ error: 'subtopic already exists' });
  } else if ((await checkValidSubtopic(subtopic_id)) === false) {
    res.status(500).json({ error: 'valid subtopic not found' });
  } else if ((await checkValidUser(creater_id)) === false) {
    res.status(500).json({ error: 'valid user not found, check creater_id' });
  } else if (
    (await userCanEditDiscussion(id, creater_id, subtopic_id)) === false
  ) {
    res
      .status(500)
      .json({ message: 'user not authorized to edit this discussion' });
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

/*
DELETE ROUTE delete a discussion
TODO: Add middleware to ensure user is logged in
@BODY = {
    creater_id: !INT
}
@PARAMS = {
    id: !INT
}
ROUTE = '/discussions/:id
returns = success if valid
TESTS: {
    1) SHOULD RETURN ERROR IF SUBTOPIC_ID, ID, AND CREATER_ID AREN'T VALID MATCHES IN DISCUSSION TABLE
    2) SHOULD RETURN ERROR IF CREATER_ID IS NOT VALID
    3) SHOULD RETURN ERROR IF ID IS NOT VALID MATCH TO ID IN DISCUSSION TABLE
}
*/

router.delete('/:id', async (req, res) => {
  const id = req.params;
  const { creater_id } = req.body;

  if ((await checkValidUser(creater_id)) === false) {
    res.status(500).json({ message: 'valid user not found, check creater_id' });
  } else if ((await checkValidDiscussion(id)) === false) {
    res.status(500).json({ message: 'discussion not found, check id' });
  } else if ((await userCanDeleteDiscussion(id, creater_id)) === false) {
    res
      .status(500)
      .json({ message: 'user not authorized to delete this discussion' });
  } else {
    db('discussion')
      .where(id)
      .del()
      .then(count => {
        if (count === 0) {
          res.status(401).json({ message: 'discussion not found' });
        } else {
          res
            .status(200)
            .json({ message: `discussion id: ${id.id} succesfully deleted` });
        }
      })
      .catch(err => {
        res.status(500).json({ error: err });
      });
  }
});

module.exports = router;
