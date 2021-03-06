const db = require('../../data/dbconfig.js');
const { isEmpty } = require('../utils/');

// takes in user id and discussion id to insert the user
const upvoteByDiscussionId = (user_id, discussion_id) => {
    return db.raw(`
        INSERT INTO upvote (user_id, discussion_id)
        values ('${user_id}', ${discussion_id})
        ON CONFLICT (user_id, discussion_id)
        DO UPDATE SET vote = 1
    `).then(res => db.raw(`
    select sum( upvote.vote) from upvote where upvote.discussion_id = ${discussion_id}`))
        .then(res => res.rows[0].sum)
}

// takes in user id and discussion id to delete from upvote
const downvoteByDiscussionId = (user_id, discussion_id) => {
    return db.raw(`
        INSERT INTO upvote (user_id, discussion_id)
        values ('${user_id}', ${discussion_id})
        ON CONFLICT (user_id, discussion_id)
        DO UPDATE SET vote = -1
    `).then(res => db.raw(`
    select sum( upvote.vote) from upvote where upvote.discussion_id = ${discussion_id}`))
        .then(res => res.rows[0].sum)
}

module.exports = {
    upvoteByDiscussionId,
    downvoteByDiscussionId
}