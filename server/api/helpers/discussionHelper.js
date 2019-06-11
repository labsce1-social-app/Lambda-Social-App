const db = require('../../data/dbconfig.js');

// add's user column to discussion
const joinUsersAndSubtopic = () => {
  return db.raw(`
  SELECT discussion.title, discussion.image, discussion.created_at, discussion.updated_at, user.username, discussion.id
  FROM discussion
  JOIN user, subtopic WHERE discussion.subtopic_id = subtopic.id`);
};

// defaults sort to upvotes, can also take comments
const topDiscussions = (sortBy = 'upvotes') => {
  return db.raw(`
  SELECT
user.username,
discussion.id as id,
discussion.content,
discussion.title,
discussion.image,
discussion.created_at,
discussion.updated_at,
SUM(comment.user_id = user.id) as comments,
SUM(upvote.user_id = user.id) as upvotes
FROM discussion
JOIN user, subtopic, upvote, comment
WHERE discussion.subtopic_id = subtopic.id
AND user.id = upvote.user_id
AND upvote.discussion_id ==discussion.id
AND comment.user_id = user.id
GROUP BY discussion.id
ORDER BY ${sortBy} DESC
LIMIT 10
`);
};

// add's user column to discussion at id
const joinUsersAndSubtopicAtId = id => {
  return db.raw(`
    SELECT discussion.title, discussion.image, discussion.created_at, discussion.updated_at, user.username, discussion.id
    FROM discussion
    JOIN user, subtopic WHERE discussion.subtopic_id = subtopic.id AND discussion.id = ${id}`);
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

  await db('user')
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

module.exports = {
  joinUsersAndSubtopic,
  joinUsersAndSubtopicAtId,
  canInsertDisucssion,
  checkValidSubtopic,
  checkValidUser,
  userCanEditDiscussion,
  checkValidDiscussion,
  userCanDeleteDiscussion,
  topDiscussions
};
