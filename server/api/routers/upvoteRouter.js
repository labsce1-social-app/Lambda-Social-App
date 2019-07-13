const router = require('express').Router();
const db = require('../../data/dbconfig.js');
const { isEmpty } = require('../utils/');

const {
    upvoteByDiscussionId,
    downvoteByDiscussionId
} = require('../helpers/index.js');

// adds user id to upvote table where discussion matches
router.post('/add', async (req, res) => {
    const { user_id, discussion_id } = req.body;
    // check if params are empty
    if (isEmpty(user_id) || isEmpty(discussion_id)) {
        return res.status(400).json('missing user_id or discussion_id')
    }
    const upvote = await upvoteByDiscussionId(user_id, discussion_id)
    return res.status(201).json(upvote)

})

// removes user id from upvote table where discussion matches
router.delete('/subtract', async (req, res) => {
    const { user_id, discussion_id } = req.body;

    if (isEmpty(user_id) || isEmpty(discussion_id)) {
        return res.status(400).json('missing user_id or discussion_id')
    }
    const downvote = await downvoteByDiscussionId(user_id, discussion_id)
    return res.status(200).json(downvote)

})

module.exports = router;