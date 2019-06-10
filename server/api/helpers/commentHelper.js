const db = require('../../data/dbconfig.js');

const getCommentsByDiscussionId = async (discussion_id) => {
    return db.raw(`
        SELECT
        user.username,
        discussion.id as discussion_id,
        comment.id as comment_id,
        comment.comment_post as post,
        comment.created_at as comment_date,
        comment.updated_at as update_date
        FROM comment
        JOIN user, discussion
        WHERE comment.user_id = user.id AND discussion.id = ${discusson_id}
        ORDER BY comment.id ASC
 `)
}

module.exports = {
    getCommentsByDiscussionId
}