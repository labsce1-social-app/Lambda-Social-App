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

const joinUsersAndSubtopic = () => {
  return db.raw(`SELECT discussion.content, discussion.title, discussion.image, discussion.created_at, discussion.updated_at, user.username, discussion.id
FROM discussion
JOIN user, subtopic WHERE discussion.subtopic_id = subtopic.id`)
}


module.exports = {
  checkValidUser,
  canInsertSubtopic,
  joinUsersAndSubtopic
};
