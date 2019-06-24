const db = require('../../data/dbconfig.js');

const getCommentsByDiscussionId = discussion_id => {
  // leave the first part commented out for now
  return db.raw(
    // `
    //       SELECT
    // comment.id as comment_id,
    // comment.comment_post as post,
    // user.username as username,
    // user.avatar as avatar,
    // user.id as user_id,
    // comment.created_at as created_date,
    // discussion.id as discussion_id
    // from comment
    // INNER JOIN user
    // ON comment.user_id = user.id
    // INNER JOIN discussion
    // ON comment.discussion_id = discussion.id
    // WHERE discussion.id = ${discussion_id}`
    `
    SELECT distinct
d.id as discussion_id,
c.id as 'original post_id',
c.comment_post as 'original_post',
u.id as 'original_commenter_id',
u.username as 'original_commenter',
u.avatar as 'orignal_commenter_avatar',
c.created_at as 'original_created_date',
reply.id  as 'reply_id',
reply.post  as 'reply_post',
reply.id   as 'reply_commenter_id',
reply.username as 'reply_commenter',
reply.avatar as 'reply_commenter_avatar',
reply.created_date as 'reply_created_date'
FROM comment c
INNER JOIN user as u
ON c.user_id = u.id
INNER JOIN discussion d
ON c.discussion_id = d.id
LEFT OUTER JOIN (
SELECT
c.id   as id,
c.comment_id as parent,
c.comment_post as post,
user.username as username,
user.avatar as avatar,
user.id  as user_id,
c.created_at as created_date,
d.id  as discussion_id
from comment c
INNER JOIN user
ON c.user_id = user.id
INNER JOIN discussion d
ON c.discussion_id = d.id   where 'parent' is not null)reply
on reply.'parent' = c.id
WHERE d.id  = ${discussion_id}
ORDER BY d.id ,reply.'parent'`
  );
};



const getPostDetailByDiscussionId = discussion_id => {
  return db.raw(`
  SELECT distinct
discussion.id as id,
	(select user.username
	from user where user.id = discussion.creater_id) as creator,
discussion.content as discussion_content,
discussion.image as discussion_image,
discussion.created_at as discussion_date,
(select count(upvote.user_id)
	from upvote
			where upvote.discussion_id = ${discussion_id}
) as upvotes
from discussion
inner join user
on discussion.id = ${discussion_id}
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

const getCommentsTotal = () => {
  return db.raw(`
  select COUNT(*) from comment
  `);
};

// checks to see if user_id is a valid user id
const checkValidUserComments = async user_id => {
  let isValid = false;

  await db('user')
    .where('user_id', user_id)
    .then(id => {
      if (id.length > 0) {
        isValid = true;
      }
    })
    .catch(err => {
      console.log(err);
    });

  return isValid;
};

// checks to see if discussion exists
const checkValidDiscussionComments = async id => {
  let isValid = false;

  await db('discussion')
    .where('id', id)
    .then(row => {
      if (row.length > 0) {
        isValid = true;
      }
    })
    .catch(err => {
      console.log(err);
    });

  return isValid;
};

const checkMatchInComments = async (id, user_id) => {
  let isValid = false;

  await db('comment')
    .where({ user_id: user_id, id: id })
    .then(row => {
      if (row.length > 0) {
        isValid = true;
      }
    })
    .catch(err => {
      console.log(err);
    });

  return isValid;
};

module.exports = {
  getCommentsByDiscussionId,
  getCommentsAndJoinUser,
  getCommentsAndJoinUserById,
  getPostDetailByDiscussionId,
  getCommentsTotal,
  checkValidUserComments,
  checkValidDiscussionComments,
  checkMatchInComments
};
