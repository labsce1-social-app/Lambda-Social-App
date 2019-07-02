// const {
//     genUsers,
//     genSubtopics,
//     genSubtopicUsers,
//     genDiscussions,
//     genComments,
//     genUpvotes,
//     genHashtags,
// } = require('../utils');
const users = require('../temp/001-User');
const subtopics = require('../temp/002-Subtopics');
const subtopic_users = require('../temp/003-Subtopic_users');
const discussions = require('../temp/004-Discussions.js');
const comments = require('../temp/005-Comments');
const upvotes = require('../temp/006-Upvotes');
const hashtags = require('../temp/007-Hashtags');

exports.seed = async (knex) => {
    const data = await
        knex('users')
            .del()
            .then(() => knex.raw(users))
            .then(() => knex.raw(subtopics))
            .then(() => knex.raw(subtopic_users))
            .then(() => knex.raw(discussions))
            .then(() => knex.raw(comments))
            .then(() => knex.raw(upvotes))
            .then(() => knex.raw(hashtags))
    return data;
}