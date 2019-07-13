const db = require('../../data/dbconfig.js');
const { isEmpty } = require('../utils/');

// add's user column to discussion
const joinUsersAndSubtopic = () => {
  return db
    .raw(
      `
  SELECT discussion.title, discussion.image, discussion.created_at, discussion.updated_at, users.username, discussion.id
  FROM discussion
  JOIN users, subtopic WHERE discussion.subtopic_id = subtopic.id`
    )
    .then(res => res.rows);
};

// defaults sort to upvotes, can also take comments
const topDiscussions = (sortBy = 'upvotes') => {
  return db
    .raw(
      `
  SELECT
(select users.username from users where users.id = discussion.creater_id) as username,
discussion.id as id,
discussion.content,
discussion.title,
discussion.image,
discussion.created_at,
discussion.updated_at,
(select count( comment.comment_post) from comment where discussion.id = comment.discussion_id) as comments,
(select count( upvote.user_id) from upvote where upvote.discussion_id = discussion.id) as upvotes
FROM discussion
inner join subtopic
on discussion.subtopic_id = subtopic.id
inner join users
on users.id = discussion.creater_id
inner join comment
on comment.user_id = users.id
inner join upvote
on upvote.discussion_id = discussion.id
GROUP BY discussion.id
ORDER BY ${sortBy} DESC
LIMIT 10
`
    )
    .then(res => res.rows);
};

const getCommentedDiscussionsbyUserId = (id) => {
  return db.raw(`
    SELECT distinct
(select users.username from users where users.id = discussion.creater_id) as username,
discussion.id as id,
discussion.content,
discussion.title,
discussion.image,
discussion.created_at,
discussion.updated_at,
(select count( comment.comment_post) from comment where discussion.id = comment.discussion_id) as comments,
(select count( upvote.user_id) from upvote where upvote.discussion_id = discussion.id) as upvotes
FROM discussion
inner join subtopic
on discussion.subtopic_id = subtopic.id
inner join users
on users.id = discussion.creater_id
inner join upvote
on upvote.discussion_id = discussion.id
inner join comment
on comment.discussion_id = discussion.id
where comment.user_id = '${id}'
GROUP BY discussion.id
ORDER BY discussion.updated_at DESC
`).then(res => res.rows);
};

const getHashTagsByDiscussionId = id => {
  return db
    .raw(
      `
  select hashtag.hashtag, hashtag.discussion_id from hashtag where hashtag.discussion_id = ${id}
  `
    )
    .then(res => res.rows);
};

const addHashTags = (discussion_id, hashtag) => {
  return db('hashtag').insert({ 'discussion_id': discussion_id, 'hashtag': hashtag }).then(res => res).catch(err => console.log(err))
}

// add's user column to discussion at id
const joinUsersAndSubtopicAtId = id => {
  return db
    .raw(
      `
     SELECT
(select users.username from users where users.id = discussion.creater_id) as username,
discussion.id as id,
discussion.content,
discussion.title,
discussion.image,
discussion.created_at,
discussion.updated_at,
(select count( comment.comment_post) from comment where discussion.id = comment.discussion_id) as comments,
(select count( upvote.user_id) from upvote where upvote.discussion_id = discussion.id) as upvotes
FROM discussion
inner join subtopic
on discussion.subtopic_id = ${id}
inner join users
on users.id = discussion.creater_id
inner join comment
on comment.user_id = users.id
inner join upvote
on upvote.discussion_id = discussion.id
GROUP BY discussion.id
ORDER BY discussion.updated_at DESC`
    )
    .then(res => res.rows);
};

const joinUsersAtSubtopicId = id => {
  return db
    .raw(
      `SELECT discussion.id, discussion.subtopic_id, discussion.title, discussion.content, discussion.image, discussion.creater_id, users.username, discussion.created_at, discussion.updated_at,
      (select count( comment.comment_post) from comment where discussion.id = comment.discussion_id) as comments,
(select count( upvote.user_id) from upvote where upvote.discussion_id = discussion.id) as upvotes
  FROM discussion
  JOIN users
  ON discussion.subtopic_id = ${id} and discussion.creater_id = users.id
  ORDER BY discussion.updated_at DESC`
    )
    .then(res => res.rows);
};

// checks to see if discussion title has been used
const canInsertDisucssion = async title => {
  let canInsert = false;

  await db('discussion')
    .where('title', title)
    .then(rows => {
      if (rows.length === 0) {
        canInsert = true;
      }
    })
    .catch(err => {
      console.log(err);
    });

  return canInsert;
};

// checks to see if subtopic exists
const checkValidSubtopic = async id => {
  let isValid = false;

  await db('subtopic')
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

// checks to see if creater_id is a valid user id
const checkValidUser = async creater_id => {
  let isValid = false;

  await db('users')
    .where('id', creater_id)
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

// checks to see if the creater_id, discussion id, subtopic_id match so they can edit
const userCanEditDiscussion = async (id, creater_id, subtopic_id) => {
  let canDelete = false;

  await db('discussion')
    .where(id)
    .then(row => {
      if (
        row[0].creater_id === creater_id &&
        row[0].id == id.id &&
        row[0].subtopic_id == subtopic_id
      ) {
        canDelete = true;
      }
    })
    .catch(err => {
      console.log(err);
    });

  return canDelete;
};

// checks to see if discussion exists
const checkValidDiscussion = async id => {
  let isValid = false;

  await db('discussion')
    .where('id', id.id)
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

// checks to see if the creater_id and discussion id match so they can delete
const userCanDeleteDiscussion = async (id, creater_id) => {
  let canDelete = false;

  await db('discussion')
    .where(id)
    .then(row => {
      if (row[0].creater_id === creater_id && row[0].id == id.id) {
        canDelete = true;
      }
    })
    .catch(err => {
      console.log(err);
    });

  return canDelete;
};

const createDiscussion = (title, creater_id, content, image, subtopic_id) => {
  const body = { title, creater_id, content, image, subtopic_id }

  return db('discussion')
    .insert(body, [
      'id',
      'title',
      'creater_id',
      'content',
      'image',
      'subtopic_id'])
};



module.exports = {
  addHashTags,
  createDiscussion,
  joinUsersAndSubtopic,
  joinUsersAndSubtopicAtId,
  canInsertDisucssion,
  checkValidSubtopic,
  checkValidUser,
  userCanEditDiscussion,
  checkValidDiscussion,
  userCanDeleteDiscussion,
  joinUsersAtSubtopicId,
  topDiscussions,
  getHashTagsByDiscussionId,
  getCommentedDiscussionsbyUserId
};
