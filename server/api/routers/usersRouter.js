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

  if (await canInsertUser(userData.username)) {
    getUser = await addUser(userData);
  } else {
    getUser = await getUserById(userData.id);
  }
  console.log('SERVER RESPONSE', getUser);
  return res.status(200).json(getUser[0]);
});

/*
POST ROUTE create a user
@BODY = {
   username: String!
}
ROUTE = '/users
returns = returns new user id
*/

router.post('/', async (req, res) => {
  const user = req.body;

  // Username must not be empty, contains 0-25 characters
  if (
    user.username.length === 0 ||
    user.username.length > 25 ||
    user.username === ''
  ) {
    res.status(400).json({
      message:
        'username must not be blank and must contain up to 25 characters.'
    });
    // Username will be rejected if name already exists
  } else {
    if (await canInsertUser(user)) {
      db('users')
        .insert(user)
        .then(user => {
          res
            .status(201)
            .json({ id: user, message: 'Succesfully created user' });
        })
        .catch(err => {
          res.status(500).json({ error: err });
        });
    } else {
      res.status(500).json({ error: 'user already exists' });
    }
  }
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

router.put('/:id', async (req, res) => {
  const id = req.params;
  const user = req.body;

  // Username must not be empty, contains 0-25 characters
  if (
    user.username.length === 0 ||
    user.username.length > 25 ||
    user.username === ''
  ) {
    res.status(400).json({
      message:
        'username must not be blank and must contain up to 25 characters.'
    });
    // Username will be rejected if name already exists
  } else {
    if (await canInsertUser(user)) {
      const update = await updateUserById(id, user);
      return res.status(200).json(update);
    } else {
      res.status(500).json({ error: 'user already exists' });
    }
  }
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
