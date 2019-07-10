const db = require('../../data/dbconfig.js');
const isEmpty = require('../utils/');

// takes in user id and discussion id to insert the user
const upvoteByDiscussionId = (user_id, discussion_id) => {
    return db('upvote').returning('*').insert({ user_id, discussion_id })

}

module.exports = {
    upvoteByDiscussionId
}