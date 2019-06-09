const db = require('../../data/dbconfig.js');

// add's user column to discussion
const joinUsersAndSubtopic = () => {
  return db.raw(`
  SELECT discussion.title, discussion.image, discussion.created_at, discussion.updated_at, user.username, discussion.id
  FROM discussion
  JOIN user, subtopic WHERE discussion.subtopic_id = subtopic.id`);
};

// add's user column to discussion at id
const joinUsersAndSubtopicAtId = id => {
  return db.raw(`
    SELECT discussion.title, discussion.image, discussion.created_at, discussion.updated_at, user.username, discussion.id
    FROM discussion
    JOIN user, subtopic WHERE discussion.subtopic_id = subtopic.id AND discussion.id = ${id}`);
};

// checks to see if discussion title has been used
const canInsertDisuccsion = async title => {
  let canInsert = false;

  await db('discussion')
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

module.exports = {
  joinUsersAndSubtopic,
  joinUsersAndSubtopicAtId,
  canInsertDisuccsion
};
