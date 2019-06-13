const router = require('express').Router();
const db = require('../../data/dbconfig.js');
const { getCommentsByDiscussionId } = require('../helpers/index.js');

router.get('/:id', (req, res) => {
  const { id } = req.params;
  getCommentsByDiscussionId(id)
    .then(comments => {
      if (comments) {
        res.status(200).json(comments);
      } else {
        res.status(404).json({ message: 'no comments yet' });
      }
    })
    .catch(error => {
      res.status(500).json({ error: 'Server error', error });
    });
});

module.exports = router;
