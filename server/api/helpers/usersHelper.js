const db = require('../../data/dbconfig.js');

// function returns true if username doesn't exist in database
const canInsertUser = async function (user) {
  let canAdd = false;

  await db('users')
    .select()
    .where('username', user.username)
    .then(rows => {
      if (rows.length === 0) {
        canAdd = true;
      } else if (rows.length > 0) {
        canAdd = false;
      }
    })
    .catch(err => {
      console.log(err);
    });

  return canAdd;
};

const getUserById = (user_id) => {
  return db('users').where({ 'id': user_id })
}

const updateUserById = (user_id, updates) => {
  return db('users as u').where({ 'u.id': user_id }).update(updates)
}

const deleteUserById = (user_id) => {
  return db('users as u').where({ 'u.id': user_id }).del()
}

module.exports = {
  canInsertUser,
  getUserById,
  updateUserById,
  deleteUserById
};
