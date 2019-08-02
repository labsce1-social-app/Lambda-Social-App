const db = require('../../data/dbconfig.js');
const { isEmpty } = require('../utils/');

const getCommentsByDiscussionId = (discussion_id) => {
  return db.raw(
    //this returns primary parent comments only (no replies)
    `
      SELECT
      comment.id as id,
      comment.comment_post,
      users.username as username,
      users.avatar as avatar,
      users.id as user_id,
      comment.created_at as created_date,
      discussion.id as discussion_id
      from comment
      INNER JOIN users
      ON comment.user_id = users.id
      INNER JOIN discussion
      ON comment.discussion_id = discussion.id
      where comment.discussion_id = ${discussion_id}
      and comment.comment_id is null
      `
  ).then(next => next.rows);
};

const getRepliesByCommentId = comment_id => {
  if (!isEmpty(comment_id)) {
    return db.raw(
      `
      SELECT
      comment.id,
      comment.comment_id as parent_id,
      comment.comment_post,
      users.username as username,
      users.avatar as avatar,
      users.id as user_id,
      comment.created_at as created_date,
      discussion.id as discussion_id
      from comment
      INNER JOIN users
      ON comment.user_id = users.id
      INNER JOIN discussion
      ON comment.discussion_id = discussion.id
      WHERE comment.comment_id = ${comment_id}
      `
    ).then(next => next.rows);
  }
}



const getPostDetailByDiscussionId = (discussion_id, user_id = null) => {
  return db.raw(`
   SELECT distinct
discussion.id as id,
	(select users.username
	from users where users.id = discussion.creater_id) as creator,
discussion.content as discussion_content,
discussion.image as discussion_image,
discussion.created_at as discussion_date,
(select sum( upvote.vote) from upvote where upvote.discussion_id = ${discussion_id}) as upvotes,
(select exists
 	(
		select upvote.user_id
			from upvote
				where upvote.user_id = '${user_id}'
				and upvote.discussion_id = discussion.id)
	) as voted
from discussion
inner join users
on discussion.id = ${discussion_id}
  `).then(next => next.rows);
};

const getCommentsAndJoinUser = () => {
  return db.raw(`
    SELECT
    users.username,
    comment.id,
    comment.comment_post,
    comment.user_id,
    comment.created_at,
    comment.updated_at,
    comment.discussion_id,
    comment.comment_id
    FROM comment
    JOIN users
    ON comment.user_id = users.id
    `).then(next => next.rows);
};

const getCommentsAndJoinUserById = id => {
  return db.raw(`
      SELECT
      users.username,
      comment.id,
      comment.comment_post,
      comment.user_id,
      comment.created_at,
      comment.updated_at,
      comment.discussion_id,
      comment.comment_id
      FROM comment
      JOIN users
      ON comment.user_id = users.id
      AND comment.id = ${id}
      `).return(next => next.rows);
};

// checks to see if user_id is a valid user id
const checkValidUserComments = async user_id => {
  let isValid = false;

  await db('users')
    .where('users.id', user_id)
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

const createComment = (body, comment_id = null) => {
  const { comment_post, discussion_id, user_id } = body
  return db.raw(`
  with rows as (
    INSERT INTO comment (comment_post, discussion_id, user_id, comment_id)
    values (${comment_post}, ${discussion_id}, ${user_id}, ${comment_id}) RETURNING *
    )
    select
    rows.id,
		comment_post,
		discussion_id,
		user_id,
		comment_id,
		username
	from rows
	INNER JOIN users
	on rows.user_id = users.id
  `)
}

module.exports = {
  getCommentsByDiscussionId,
  getRepliesByCommentId,
  getCommentsAndJoinUser,
  getCommentsAndJoinUserById,
  getPostDetailByDiscussionId,
  checkValidUserComments,
  checkValidDiscussionComments,
  checkMatchInComments,
  createComment
};
