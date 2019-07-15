const db = require('../../data/dbconfig.js');

const getUsersFavSubtopics = id => {
  return db
    .raw(
      `SELECT  
      subtopic_users.user_id as user_id, 
      subtopic_users.subtopic_id as id, 
      subtopic.title as title, 
      users.username as username
      FROM subtopic_users
      inner JOIN subtopic
      on subtopic.id = subtopic_users.subtopic_id
      inner JOIN users on subtopic.creater_id = users.id
      WHERE subtopic_users.user_id = '${id}'`
    )
    .then(res => res.rows);
};

const addFavoriteSubtopicToUser = body => {
  console.log('WE ARE INSERTING: ', body);
  return db('subtopic_users')
    .insert(body, ['id', 'user_id'])
    .then(row => row);
};

const unFavoriteSubtopicById = id => {
  return db
    .raw(`DELETE FROM subtopic_users WHERE subtopic_users.id = '${id}'`)
    .then(res => {
      console.log('DELETED AND THEN: ', res);
    });
};

module.exports = {
  getUsersFavSubtopics,
  addFavoriteSubtopicToUser,
  unFavoriteSubtopicById
};
