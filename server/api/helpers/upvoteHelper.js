const db = require('../../data/dbconfig.js');
const isEmpty = require('../utils/');

// takes in user id and discussion id to insert the user
const upvoteByDiscussionId = (user_id, discussion_id) => {
    return db.raw(`
        INSERT INTO upvote(discussion, user_id)
            VALUES ('${discussion_id}', ${user_id})
    `).then(row => row);
}

module.exports = {
    upvoteByDiscussionId
}