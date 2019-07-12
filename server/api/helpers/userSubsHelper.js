const db = require('../../data/dbconfig.js');

const getUsersFavSubtopics = id => {
  return db
    .raw(
      `SELECT subtopic_users.user_id as user_id, subtopic_users.subtopic_id as subtopic_id, subtopic.title as subtopic_title, subtopic.creater_id
      FROM subtopic_users
      inner JOIN subtopic
      on subtopic.id = subtopic_users.subtopic_id
      WHERE subtopic_users.user_id = '${id}'`
    )
    .then(res => res.rows);
};

const addFavoriteSubtopicToUser = body => {
  console.log('WE ARE INSERTING: ', body);
  return db('subtopic_users')
    .insert(body, ['subtopic_id', 'user_id'])
    .then(row => row);
};

module.exports = {
  getUsersFavSubtopics,
  addFavoriteSubtopicToUser
};
