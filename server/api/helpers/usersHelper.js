const db = require('../../data/dbconfig.js');

const canInsertUser = async function(user) {
  let canAdd = false;

  await db('user')
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

module.exports = {
  canInsertUser
};
