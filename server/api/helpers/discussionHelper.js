const db = require('../../data/dbconfig.js');

// add's user column to discussion
const joinUsersAndSubtopic = () => {
  return db.raw(`
  SELECT discussion.title, discussion.image, discussion.created_at, discussion.updated_at, user.username, discussion.id
  FROM discussion
  JOIN user, subtopic WHERE discussion.subtopic_id = subtopic.id`);
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

module.exports = {
  joinUsersAndSubtopic,
  joinUsersAndSubtopicAtId,
  canInsertDisucssion,
  checkValidSubtopic,
  checkValidUser
};
