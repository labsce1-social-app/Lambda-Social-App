const router = require('express').Router();
const {
  canInsertUser,
  getUserById,
  updateUserById,
  deleteUserById,
  addUser
} = require('../helpers/index.js');
const db = require('../../data/dbconfig.js');

/*
GET ROUTE get all users
@PARAM = NONE
ROUTE = '/users
returns = [all users]
*/

router.get('/', (req, res) => {
  db('users')
    .then(users => {
      res.status(200).json(users);
    })
    .catch(err => {
      res.status(500).json({ error: err });
    });
});

/*
POST (works as a GET) ROUTE get single user
@PARAM = id
ROUTE = '/users/profile
returns = a single user object
*/

router.post('/profile', async (req, res) => {
  const { userData } = req.body;

  let getUser;
  if (await canInsertUser(userData.id)) {
    getUser = await addUser(userData);
  } else {
    getUser = await getUserById(userData.id);
  }

  return res.status(200).json(getUser[0]);
});

/*
PUT ROUTE update a user
@BODY = {
    username: String!
}
@PARAM = id
ROUTE = '/users/:id
returns = returns new user info
*/

router.put('/', async (req, res) => {
  const user = req.body;
  console.log(user)
  const updatedUser = await updateUserById(user);
  return res.status(200).json(updatedUser[0]);
});

/*
DELETE ROUTE delete a user
@PARAM = id
ROUTE = '/users/:id
returns = returns success if valid
*/

// this delete route is for dev purposes only
// TODO: Protect delete route behind login middleware
router.delete('/:id', async (req, res) => {
  const { id } = req.params;
  const del = await deleteUserById(id);
  return res.status(200).json(del);
});

module.exports = router;
