const router = require('express').Router();
const db = require('../../data/dbconfig.js');
const {
  getCommentsByDiscussionId,
  getCommentsAndJoinUser
} = require('../helpers/index.js');

/*
GET ROUTE get all comments
@PARAM = ID
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
@PARAM = ID
ROUTE = '/comments/d/:id
returns = array of comments by discussion_id
TESTS: {
    1) RETURNS ALL COMMENTS BY DISCUSSION_ID
}
*/

router.get('/d/:id', (req, res) => {
  const { id } = req.params;
  getCommentsByDiscussionId(id)
    .then(comments => {
      if (comments) {
        res.status(200).json(comments);
      } else {
        res.status(404).json({ message: 'no comments yet' });
      }
    })
    .catch(error => {
      res.status(500).json({ error: 'Server error', error });
    });
});

module.exports = router;
