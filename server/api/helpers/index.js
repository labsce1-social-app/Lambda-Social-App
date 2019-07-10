const discussionHelper = require('./discussionHelper.js');
const commentHelper = require('./commentHelper.js');
const subtopicHelper = require('./subtopicHelper.js');
const upvoteHelper = require('./upvoteHelper.js');
const usersHelper = require('./usersHelper.js');

module.exports = {
  ...commentHelper,
  ...discussionHelper,
  ...subtopicHelper,
    upvoteHelper,
  ...usersHelper
};
