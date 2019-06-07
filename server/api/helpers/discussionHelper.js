const db = require('../../data/dbconfig.js');

//
const joinUsersAndSubtopic = () => {
  return db.raw(`
  SELECT discussion.title, discussion.image, discussion.created_at, discussion.updated_at, user.username, discussion.id
  FROM discussion
  JOIN user, subtopic WHERE discussion.subtopic_id = subtopic.id
  `);
};

module.exports = {
  joinUsersAndSubtopic
};
