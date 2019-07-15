const router = require('express').Router();
const db = require('../../data/dbconfig.js');

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
      console.log('SUBS', subs);
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
  // console.log('REQ.BODY: ', req.body);

  if (await canFavorite(req.body)) {
    addFavoriteSubtopicToUser(req.body)
      .then(ret => {
        console.log('SUCCESS ADDING: ', ret);
        getUsersFavSubtopics(ret[0].user_id).then(favSubs => {
          res.status(200).json(favSubs);
        });
      })
      .catch(err => {
        console.log('COULDNT INSERT ', err);
        res.status(500).json({ error: err });
      });
  } else {
    res.status(500).json({ Message: 'Already favorited this subtopic' });
  }
});

/**
 * unsubscribe from a subtopic with subtopic_id
 */
router.post('/unfavorite', (req, res) => {
  const { subId, userId } = req.body;

  unFavoriteSubtopicById(subId, userId)
    .then(ret => {
      // console.log('DELTED IN ROUTER: ', ret);
      if (ret) res.json({ Message: 'Nothing to unfavorite' });

      res.status(200).json({ message: `Successfully unfavorited` });
    })
    .catch(err => {
      res.status(500).json({ error: err });
    });
});

module.exports = router;
