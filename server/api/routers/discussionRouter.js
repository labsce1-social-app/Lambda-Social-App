const router = require('express').Router();
const db = require('../../data/dbconfig.js');
const { discussionHelper } = require('../helpers/index.js');

/*
GET ROUTE get all discussions
@PARAM = NONE
ROUTE = '/api/discussions
returns = all discussions
TESTS: {
    1) RETURNS LIST OF discussions > 1
}
*/

router.get('/', (req, res) => {
  discussionHelper
    .joinUsersAndSubtopic()
    .then(discussions => {
      res.status(200).json(discussions);
    })
    .catch(err => {
      res.status(500).json({ error: err });
    });
});

module.exports = router;
