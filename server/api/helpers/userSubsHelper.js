const db = require('../../data/dbconfig.js');

const getUsersFavSubtopics = id => {
  return db
    .raw(
      `SELECT
      subtopic_users.id as favorite_id,
      subtopic_users.subtopic_id as id,
      subtopic_users.user_id as user_id,
      subtopic.title as title,
      users.username as username
      FROM subtopic_users
      inner JOIN subtopic
      on subtopic.id = subtopic_users.subtopic_id
      inner JOIN users on subtopic.creater_id = users.id
      WHERE subtopic_users.user_id = '${id}'`
    )
    .then(res => res.rows)
    .catch(err => {
      console.log(err);
    });
};

const addFavoriteSubtopicToUser = body => {
  console.log('WE ARE INSERTING: ', body);
  return db('subtopic_users')
    .insert(body, ['id', 'user_id', 'subtopic_id'])
    .then(res => {
      console.log(res)
      return res
    })
    .catch(err => {
      console.log(err);
      res.json({ error: err });
    });
};

const unFavoriteSubtopicById = (subId, userId) => {
  return db
    .raw(
      `DELETE FROM subtopic_users
      WHERE subtopic_users.subtopic_id = '${subId}' AND
      subtopic_users.user_id = '${userId}'`
    )
    .then(res => {
      console.log('DELETED AND THEN: ', res);
    });
};

const canFavorite = async sub => {
  console.log(sub);
  let valid = true;
  await db
    .raw(
      `SELECT subtopic_users.subtopic_id,
    subtopic_users.user_id
    FROM subtopic_users
    WHERE subtopic_users.subtopic_id = '${sub.subtopic_id}' AND
    subtopic_users.user_id  = '${sub.user_id}' `
    )
    .then(res => {
      if (res.rows.length >= 1) valid = false;
    })
    .catch(err => {
      console.log(err);
    });

  return valid;
};

module.exports = {
  getUsersFavSubtopics,
  addFavoriteSubtopicToUser,
  unFavoriteSubtopicById,
  canFavorite
};
