const db = require('../../data/dbconfig.js');

// function returns true if username doesn't exist in database
const canInsertUser = async function (id) {
  let canAdd = false;

  await db('users')
    .select()
    .where('id', id)
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

const getUserById = user_id => {
  return db('users').where({ id: user_id });
};

const updateUserById = (updates) => {
  console.log("UPDATES: ", updates)
  return db('users as u')
    .where({ 'u.id': updates.id })
    .update(updates)
    .returning('*');
};

const deleteUserById = user_id => {
  return db('users as u')
    .where({ 'u.id': user_id })
    .del();
};

const addUser = user => {
  return db('users').insert(user, [
    'username',
    'id',
    'email',
    'avatar',
    'title'
  ]);
};

module.exports = {
  canInsertUser,
  getUserById,
  updateUserById,
  deleteUserById,
  addUser
};
