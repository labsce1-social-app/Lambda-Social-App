const db = require('../../data/dbconfig.js');
const { isEmpty } = require('../utils/');

// takes in user id and discussion id to insert the user
const upvoteByDiscussionId = (user_id, discussion_id) => {
    return db.raw(`
        INSERT INTO upvote (user_id, discussion_id, vote)
        values ('${user_id}', ${discussion_id}, 1)
        ON CONFLICT (user_id, discussion_id)
        DO UPDATE SET vote = 1
    `)
}

// takes in user id and discussion id to delete from upvote
const downvoteByDiscussionId = (user_id, discussion_id) => {
    return db.raw(`
        INSERT INTO upvote (user_id, discussion_id, vote)
        values ('${user_id}', ${discussion_id}, -1)
        ON CONFLICT (user_id, discussion_id)
        DO UPDATE SET vote = -1
    `)
}

module.exports = {
    upvoteByDiscussionId,
    downvoteByDiscussionId
}