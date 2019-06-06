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
  return db.raw(`SELECT creater_id, username, title, content, image, created_at, updated_at
FROM subtopic_users
JOIN user, subtopic WHERE subtopic_users.subtopic_id = subtopic_users.user_id`)
}


module.exports = {
  checkValidUser,
  canInsertSubtopic,
  joinUsersAndSubtopic
};
