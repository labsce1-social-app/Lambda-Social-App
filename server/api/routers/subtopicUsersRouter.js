const router = require('express').Router();

const {
  getUsersFavSubtopics,
  addFavoriteSubtopicToUser,
  unFavoriteSubtopicById,
  canFavorite
} = require('../helpers/userSubsHelper');

/**
 **** ROUTE /subtopic_users
 */

// Takes in user_id get all favorited subtopics
router.get('/:id', (req, res) => {
  const { id } = req.params;

  getUsersFavSubtopics(id)
    .then(subs => {
      res.status(200).json(subs);
    })
    .catch(err => {
      console.log(err);
      res.json({ err });
    });
});

/**
 * Favorites a subtopic and returns their list.
 * Takes in user_id and subtopic_id
 */
router.post('/favorite', async (req, res) => {

  if (await canFavorite(req.body)) {
    addFavoriteSubtopicToUser(req.body)
      .then(ret => {
        getUsersFavSubtopics(ret[0].user_id).then(favSubs => {
          res.status(200).json(favSubs);
        });
      })
      .catch(err => {
        res.status(500).json({ error: err });
      });
  } else {
    res.status(500).json({ Message: 'Already favorited this subtopic' });
  }
});

/**
 * unsubscribe from a subtopic with subtopic_id
 */
router.post('/unfavorite', async (req, res) => {
  const { subId, userId } = req.body;
  const unfav = await unFavoriteSubtopicById(subId, userId);
  return res.status(200).json(unfav);
});

module.exports = router;
