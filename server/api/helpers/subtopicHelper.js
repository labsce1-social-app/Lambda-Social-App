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
  return db.raw(`SELECT discussion.content, discussion.title, discussion.image, discussion.created_at, discussion.updated_at, user.username, discussion.id
FROM discussion
JOIN user, subtopic WHERE discussion.subtopic_id = subtopic.id`);
};

module.exports = {
  checkValidUser,
  canInsertSubtopic,
  userCanDeleteAndEditSubtopic,
  checkValidSubtopic,
  joinUsersAndSubtopic
};
