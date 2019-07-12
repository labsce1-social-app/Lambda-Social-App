const db = require('../../data/dbconfig.js');

const getUsersFavSubtopics = id => {
  return db
    .raw(
      `SELECT subtopic_users.user_id, subtopic_users.subtopic_id FROM subtopic_users 
WHERE subtopic_users.user_id = '${id}'`
    )
    .then(res => res.rows);
};

module.exports = {
  getUsersFavSubtopics
};
