const router = require('express').Router();
const db = require('../../data/dbconfig.js');
const isEmpty = require('../utils/');

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
    try {
        const upvote = await upvoteByDiscussionId(user_id, discussion_id)
        return res.status(201).json(upvote)
    } catch (error) {
        return res.status(500).json(error)
    }
})

// removes user id from upvote table where discussion matches
router.delete('/subtract', async (req, res) => {
    const { user_id, discussion_id } = req.body;

    if (isEmpty(user_id) || isEmpty(discussion_id)) {
        return res.status(400).json('missing user_id or discussion_id')
    }
    try {
        const downvote = await downvoteByDiscussionId(user_id, discussion_id)
        return res.status(200).json(downvote)
    } catch (error) {
        return res.status(500).json(error)
    }
})

module.exports = router;