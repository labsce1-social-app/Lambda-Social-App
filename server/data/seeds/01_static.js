// const {
//     genUsers,
//     genSubtopics,
//     genSubtopicUsers,
//     genDiscussions,
//     genComments,
//     genUpvotes,
//     genHashtags,
// } = require('../utils');
const genUsers = require('../utils/json/users.json');
const genSubtopics = require('../utils/json/subtopics.json');
const genSubtopicUsers = require('../utils/json/subtopics_users.json');
const genDiscussions = require('../utils/json/discussions.json');
const genComments = require('../utils/json/comments.json');
const genUpvotes = require('../utils/json/upvotes.json');
const genHashtags = require('../utils/json/hashtags.json');

exports.seed = async (knex) => {
    const data = await
        knex('users')
            .del()
            .then(() => knex('users')
                .del()
                .then(() => knex('users')
                    .insert(genUsers)))
            .then(() => knex('subtopic')
                .del()
                .then(() => knex('subtopic')
                    .insert(genSubtopics)))
            .then(() => knex('subtopic_users')
                .del().
                then(() => knex('subtopic_users')
                    .insert(genSubtopicUsers)))
            .then(() => knex('discussion')
                .del().then(() => knex('discussion')
                    .insert(genDiscussions)))
            .then(() => knex('comment')
                .del()
                .then(() => knex('comment')
                    .insert(genComments)))
            .then(() => knex('upvote')
                .del()
                .then(() => knex('upvote')
                    .insert(genUpvotes)))
            .then(() => knex('hashtag')
                .del()
                .then(() => knex('hashtag')
                    .insert(genHashtags)))
    return data;
}