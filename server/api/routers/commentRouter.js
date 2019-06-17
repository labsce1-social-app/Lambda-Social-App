const router = require('express').Router();
const {
  getCommentsByDiscussionId,
  getCommentsAndJoinUser,
  getCommentsAndJoinUserById,
  getPostDetailByDiscussionId
} = require('../helpers/index.js');

// used for updated timestamps
const moment = require('moment');
let timestamp = moment().format('YYYY-MM-DD HH:mm:ss');

/*
GET ROUTE get all comments
ROUTE = '/comments
returns = array of all comments
TESTS: {
    1) RETURNS ALL COMMENTS
}
*/

router.get('/', (req, res) => {
  getCommentsAndJoinUser()
    .then(comments => {
      res.status(200).json(comments);
    })
    .catch(err => {
      res.status(500).json({ error: 'server error', err });
    });
});

/*
GET ROUTE get comments by discussion_id
@PARAM = {
    id: !INT
}
ROUTE = '/comments/d/:id
returns = array of comments by discussion_id
TESTS: {
    1) RETURNS ALL COMMENTS BY DISCUSSION_ID
}
*/

router.get('/d/:id', (req, res) => {
  const { id } = req.params;
  // get a single discussions details by it's id
  getPostDetailByDiscussionId(id)
    .then(creator => {
      // check if the creator came back through promise
      if (creator.length > 0) {
        // attempt to get comments
        getCommentsByDiscussionId(id)
          .then(comments => {
            // if comments came back, send them with creator detail
            if (comments.length > 0) {
              res.status(200).json({ creator, comments });
            } else {
              // else send just the creator
              res.status(200).json({ creator })
            }
          })
          .catch(err => {
            res.status(500).json({ message: 'no post creator', err })
          })
      } else {
        res.status(404).json({ message: 'no comments yet' });
      }
    })
    .catch(error => {
      res.status(500).json({ error: 'Server error', error });
    });
});

/*
GET ROUTE get comment by id
@PARAM = {
    id: !INT
}
ROUTE = '/comments/:id
returns = a single comment by id
TESTS: {
    1) RETURNS A SINGLE COMMENT BY ID
}
*/

router.get('/:id', (req, res) => {
  const { id } = req.params;

  getCommentsAndJoinUserById(id)
    .then(comment => {
      if (comment.length > 0) {
        res.status(200).json(comment);
      } else {
        res.status(404).json({ message: 'comment not found' });
      }
    })
    .catch(err => {
      res.status(500).json({ error: 'server error', err });
    });
});

module.exports = router;
