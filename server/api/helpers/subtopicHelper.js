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

// checks to see if subtopic title has been used
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

// checks to see if the creater_id and subtopic id match so they can delete
const userCanDeleteAndEditSubtopic = async (id, creater_id) => {
  let canDelete = false;

  await db('subtopic')
    .where(id)
    .then(row => {
      if (row[0].creater_id === creater_id && row[0].id == id.id) {
        canDelete = true;
      }
    })
    .catch(err => {
      console.log(err);
    });

  return canDelete;
};

// checks to see if subtopic exists
const checkValidSubtopic = async id => {
  let isValid = false;

  await db('subtopic')
    .where(id)
    .then(row => {
      if (row.length > 0) {
        isValid = true;
      }
    })
    .catch(err => {
      console.log(err);
    });

  return isValid;
};

// return all subtopics with creators
// ordered by created date descending
const getAllSubtopicsWithCreator = () => {
  return db.raw(`
    select
subtopic.id as id,
subtopic.created_at as date,
subtopic.updated_at as updated,
subtopic.title as title,
user.username as username
FROM subtopic
JOIN user
ON subtopic.creater_id = user.id
order by date desc`)
}

module.exports = {
  checkValidUser,
  canInsertSubtopic,
  userCanDeleteAndEditSubtopic,
  checkValidSubtopic,
  getAllSubtopicsWithCreator
};
