const {
    genUsers,
    genSubtopics,
    genSubtopicUsers,
    genDiscussions,
    genComments,
    genUpvotes,
    genHashtags,
} = require('../utils/');

exports.seed = async (knex) => {
    try {
        const del = await knex('users')
            .delete();
        const user = await knex('users')
            .insert(genUsers);
        const subtopic = await knex('subtopic')
            .insert(genSubtopics);
        const subUsers = await knex('subtopic_users')
            .insert(genSubtopicUsers);
        const disc = await knex('discussion')
            .insert(genDiscussions);
        const comm = await knex('comment')
            .insert(genComments);
        const upvotes = await knex('upvote')
            .insert(genUpvotes);
        const hash = await knex('hashtag')
            .insert(genHashtags);

        return {
            del,
            user,
            subtopic,
            subUsers,
            disc,
            comm,
            upvotes,
            hash
        }
    } catch (err) {
        console.log(err)
    }

}