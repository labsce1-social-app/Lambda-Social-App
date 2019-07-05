const router = require('express').Router();
const db = require('../../data/dbconfig.js');
const {
  getCommentsByDiscussionId,
  getCommentsAndJoinUser,
  getCommentsAndJoinUserById,
  getPostDetailByDiscussionId,
  getCommentsTotal,
  checkValidUserComments,
  checkValidDiscussionComments,
  checkMatchInComments,
  getRepliesByCommentId
} = require('../helpers/index.js');
const isEmpty = require('../utils/');
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

router.get('/d/:id', async (req, res) => {
  const { id } = req.params;
  // get a single discussions details by it's id
  // create an empty object to build based on values
  const obj = {};
  // get all post head details
  // step one: add creator details to object
  try {
    console.log('1')
    // need reduce to accumulate (iterate through values)
    await getCommentsByDiscussionId(id)
      .reduce(async (acc, curr) => {
        // add comments to object
        obj.comments = await [curr, acc];
      })
    console.log('2')
    // map to iterate through replies
    await obj.comments.map((comment) => {
      //TODO: find out why this isn't returning
      return getRepliesByCommentId(comment.id)
        // compare replies to comments by parent id (FK) and comment id (PK)
        .reduce((acc, curr) => {
          console.log('3')
          const replies = []
          obj.comments.map((item) => {
            console.log("4")
            if (item.id === curr.parent_id) {
              console.log("5")
              replies.push(acc, curr)
            }
          })
          for (let i = 0; i < Object.keys(obj.comments).length; i++) {
            obj.comments[i].replies;
            console.log("6")
            if (Number(obj.comments[i].id) === Number(curr.parent_id)) {
              console.log("7")
              obj.comments[i].replies = replies;
            } else {
              console.log("8")
              obj.comments[i].replies = null;
            }
          }
          return res.status(200).json(obj)
        }
        );
      // return the built out object
    })
    // console.log(obj)
    return await res.status(200).json(obj);
  } catch (err) {
    console.log(err);
  }

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

/*
POST ROUTE create a comment
TODO: Add middleware to ensure user is logged in
@BODY = {
    comment_post: !STRING - required
    discussion_id: !INT - required (discussion_id from discussion table)
    comment_id: !INT - required (same as id)
    user_id: !INT - required (user_id from user table)
    created_at: required (timestamp)
    updated_at: required (timestamp)
}
ROUTE = '/comments/create
returns = id of created comment
TESTS: {
    1) SHOULD RETURN ERROR IF COMMENT_POST, DISCUSSION_ID, COMMENT_ID OR USER_ID IS MISSING
    2) USER_ID SHOULD BE VALID
    3) DISCUSSION_ID SHOULD BE VALID
}
*/

router.post('/create', async (req, res) => {
  const { comment_post, discussion_id, user_id } = req.body;

  if (
    comment_post === null ||
    comment_post === undefined ||
    comment_post.length < 1 ||
    discussion_id === null ||
    discussion_id === undefined ||
    user_id === null ||
    user_id === undefined
  ) {
    res.status(400).json({
      error: 'comment_post, discussion_id, and user_id must be present'
    });
  } else if ((await checkValidUserComments(user_id)) === false) {
    res.status(500).json({ error: `invalid user_id: ${user_id} sent` });
  } else if ((await checkValidDiscussionComments(discussion_id)) === false) {
    res
      .status(500)
      .json({ error: `invalid discussion_id: ${discussion_id} sent` });
  } else {
    const commentTotal = await getCommentsTotal();

    db('comment')
      .insert({
        comment_post,
        discussion_id,
        user_id,
        created_at: timestamp,
        updated_at: timestamp,
        comment_id: commentTotal[0]['COUNT(*)'] + 1
      })
      .then(comment => {
        res
          .status(201)
          .json({ id: comment, message: 'Succesfully created comment' });
      })
      .catch(err => {
        res.status(500).json({ error: 'server error' });
      });
  }
});

/*
DELETE ROUTE delete a comment
TODO: Add middleware to ensure user is logged in
@BODY = {
    user_id: !STRING - required
}
ROUTE = '/comments/:id
returns = success on deletion
TESTS: {
    1) SHOULD RETURN ERROR IF USER_ID IS INVALID
    2) SHOULD RETURN ERROR IF USER_ID DOESN'T MATCH COMMENT USER_ID
}
*/

router.delete('/:id', async (req, res) => {
  const { user_id } = req.body;
  const { id } = req.params;

  if (user_id === null || user_id === undefined) {
    res.status(400).json({ error: 'user_id must be present' });
  } else if ((await checkValidUserComments(user_id)) === false) {
    res.status(500).json({ error: `user_id: ${user_id} is invalid` });
  } else if ((await checkMatchInComments(id, user_id)) === false) {
    res
      .status(500)
      .json({ error: 'user_id and comment primary id do not match' });
  } else {
    db('comment')
      .where({ id })
      .del()
      .then(count => {
        if (count === 0) {
          res.status(401).json({ error: 'comment not found' });
        } else {
          res
            .status(200)
            .json({ message: `comment id: ${id} successfully deleted` });
        }
      })
      .catch(err => {
        res.status(500).json({ error: 'server error', err });
      });
  }
});

module.exports = router;
