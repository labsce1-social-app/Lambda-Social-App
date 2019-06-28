const db = require('../../data/dbconfig.js');

// add's user column to discussion
const joinUsersAndSubtopic = () => {
  return db.raw(`
  SELECT discussion.title, discussion.image, discussion.created_at, discussion.updated_at, user.username, discussion.id
  FROM discussion
  JOIN user, subtopic WHERE discussion.subtopic_id = subtopic.id`);
};

// defaults sort to upvotes, can also take comments
const topDiscussions = (sortBy = 'upvotes') => {
  return db.raw(`
  SELECT
(select user.username from user where user.id = discussion.creater_id) as username,
discussion.id as id,
discussion.content,
discussion.title,
discussion.image,
discussion.created_at,
discussion.updated_at,
(select count( comment.comment_post) from comment where discussion.id = comment.discussion_id) as comments,
(select count( upvote.user_id) from upvote where upvote.discussion_id = discussion.id) as upvotes
FROM discussion
inner join subtopic
on discussion.subtopic_id = subtopic.id
inner join user
on user.id = discussion.creater_id
inner join comment
on comment.user_id = user.id
inner join upvote
on upvote.discussion_id = discussion.id
GROUP BY discussion.id
ORDER BY ${sortBy} DESC
LIMIT 10
`);
};

const getCommentedDiscussionsbyUserId = id => {
  return db.raw(`
  SELECT distinct
(select user.username from user where user.id = discussion.creater_id) as username,
discussion.id as id,
discussion.content,
discussion.title,
discussion.image,
discussion.created_at,
discussion.updated_at,
(select count( comment.comment_post) from comment where discussion.id = comment.discussion_id) as comments,
(select count( upvote.user_id) from upvote where upvote.discussion_id = discussion.id) as upvotes
FROM discussion
inner join subtopic
on discussion.subtopic_id = subtopic.id
inner join user
on user.id = discussion.creater_id
inner join comment
on comment.user_id = '${id}'
inner join upvote
on upvote.discussion_id = discussion.id
group by discussion.creater_id
ORDER BY discussion.updated_at DESC
`)
}

getHashTagsByDiscussionId = id => {
  return db.raw(`
  select hashtag.hashtag, hashtag.discussion_id from hashtag where hashtag.discussion_id = ${id}
  `)
}

// add's user column to discussion at id
const joinUsersAndSubtopicAtId = id => {
  return db.raw(`
    SELECT discussion.title, discussion.image, discussion.created_at, discussion.updated_at, user.username, discussion.id
    FROM discussion
    JOIN user, subtopic WHERE discussion.subtopic_id = subtopic.id AND discussion.id = ${id}`);
};

const joinUsersAtSubtopicId = id => {
  return db.raw(`SELECT discussion.id, discussion.subtopic_id, discussion.title, discussion.content, discussion.image, discussion.creater_id, user.username, discussion.created_at, discussion.updated_at
  FROM discussion
  JOIN user
  WHERE discussion.subtopic_id = ${id} and discussion.creater_id = user.id`);
};

// checks to see if discussion title has been used
const canInsertDisucssion = async title => {
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

// checks to see if subtopic exists
const checkValidSubtopic = async id => {
  let isValid = false;

  await db('subtopic')
    .where('id', id)
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

// checks to see if the creater_id, discussion id, subtopic_id match so they can edit
const userCanEditDiscussion = async (id, creater_id, subtopic_id) => {
  let canDelete = false;

  await db('discussion')
    .where(id)
    .then(row => {
      if (
        row[0].creater_id === creater_id &&
        row[0].id == id.id &&
        row[0].subtopic_id == subtopic_id
      ) {
        canDelete = true;
      }
    })
    .catch(err => {
      console.log(err);
    });

  return canDelete;
};

// checks to see if discussion exists
const checkValidDiscussion = async id => {
  let isValid = false;

  await db('discussion')
    .where('id', id.id)
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

// checks to see if the creater_id and discussion id match so they can delete
const userCanDeleteDiscussion = async (id, creater_id) => {
  let canDelete = false;

  await db('discussion')
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

module.exports = {
  joinUsersAndSubtopic,
  joinUsersAndSubtopicAtId,
  canInsertDisucssion,
  checkValidSubtopic,
  checkValidUser,
  userCanEditDiscussion,
  checkValidDiscussion,
  userCanDeleteDiscussion,
  joinUsersAtSubtopicId,
  topDiscussions,
  getHashTagsByDiscussionId,
  getCommentedDiscussionsbyUserId
};
