const db = require('../../data/dbconfig.js');

const getCommentsByDiscussionId = discussion_id => {
  return db.raw(`
    SELECT
    user.username,
    comment.id,
    comment.comment_post,
    comment.user_id, 
    comment.created_at, 
    comment.updated_at, 
    comment.discussion_id,
    comment.comment_id
    FROM comment
    JOIN user
    WHERE comment.user_id = user.id
    AND comment.discussion_id = ${discussion_id}
    `);
};

const getCommentsAndJoinUser = () => {
  return db.raw(`
    SELECT
    user.username,
    comment.id,
    comment.comment_post,
    comment.user_id, 
    comment.created_at, 
    comment.updated_at, 
    comment.discussion_id,
    comment.comment_id
    FROM comment
    JOIN user
    WHERE comment.user_id = user.id
    `);
};

const getCommentsAndJoinUserById = id => {
  return db.raw(`
      SELECT
      user.username,
      comment.id,
      comment.comment_post,
      comment.user_id, 
      comment.created_at, 
      comment.updated_at, 
      comment.discussion_id,
      comment.comment_id
      FROM comment
      JOIN user
      WHERE comment.user_id = user.id
      AND comment.id = ${id}
      `);
};

module.exports = {
  getCommentsByDiscussionId,
  getCommentsAndJoinUser,
  getCommentsAndJoinUserById
};
