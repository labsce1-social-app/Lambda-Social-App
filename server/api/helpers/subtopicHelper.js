const db = require('../../data/dbconfig.js');

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

// checks to see if subtopic title has been used
const canInsertSubtopic = async title => {
  let canInsert = false;

  await db('subtopic')
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

// checks to see if the creater_id and subtopic id match so they can delete
const userCanDeleteAndEditSubtopic = async (id, creater_id) => {
  let canDelete = false;

  await db('subtopic')
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

// checks to see if subtopic exists
const checkValidSubtopic = async id => {
  let isValid = false;

  await db('subtopic')
    .where(id)
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
const joinUsersAndSubtopic = () => {
  return db.raw(`SELECT
user.username,
discussion.id as id,
discussion.content,
discussion.title,
discussion.image,
discussion.created_at,
discussion.updated_at,
SUM(upvote.user_id = user.id) as upvotes
FROM discussion
JOIN user, subtopic, upvote
WHERE discussion.subtopic_id = subtopic.id
AND user.id = upvote.user_id
AND upvote.discussion_id == discussion.id
GROUP BY discussion.id
ORDER BY upvotes DESC
LIMIT 10`);
};

module.exports = {
  checkValidUser,
  canInsertSubtopic,
  userCanDeleteAndEditSubtopic,
  checkValidSubtopic,
  joinUsersAndSubtopic
};
