const db = require('../../data/dbconfig.js');

const getCommentsByDiscussionId = discussion_id => {
  return db.raw(`
    SELECT
comment.id as comment_id,
comment.comment_post as post,
user.username as username,
user.avatar as avatar,
user.id as user_id,
comment.created_at as created_date,
discussion.id as discussion_id
from comment
INNER JOIN user
ON comment.user_id = user.id
INNER JOIN discussion
ON comment.discussion_id = discussion.id
WHERE discussion.id = ${discussion_id}
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
