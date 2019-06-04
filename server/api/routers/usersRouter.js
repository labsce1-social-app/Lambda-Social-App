const router = require('express').Router();
const { usersHelper } = require('../helpers/index.js');
const db = require('../../data/dbconfig.js');

// Router test route
router.get('/', (req, res) => {
  res.status(200).send('working!');
});

/*
GET ROUTE get all users
@PARAM = NONE
ROUTE = '/api/users
returns = [all users]
*/

router.get('/users', (req, res) => {
  db('user')
    .then(users => {
      res.status(200).send(users);
    })
    .catch(err => {
      res.status(500).json({ error: err });
    });
});

/*
GET ROUTE get single user
@PARAM = id
ROUTE = '/api/users/:id
returns = a single user object
*/

router.get('/users/:id', (req, res) => {
  const id = req.params;

  db('user')
    .where(id)
    .then(user => {
      res.status(200).send(user);
    })
    .catch(err => {
      res.status(500).json({ error: err });
    });
});

/*
POST ROUTE create a user
@BODY = {
   username: String!
}
ROUTE = '/api/users
returns = returns new user id
*/

router.post('/users', async (req, res) => {
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
    if (await usersHelper.canInsertUser(user)) {
      db('user')
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
ROUTE = '/api/users/:id
returns = returns new user info
*/

router.put('/users/:id', async (req, res) => {
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
    if (await usersHelper.canInsertUser(user)) {
      db('user')
        .where(id)
        .update(user)
        .then(user => {
          res
            .status(201)
            .json({ id: user, message: 'Succesfully updated user' });
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
DELETE ROUTE delete a user
@PARAM = id
ROUTE = '/api/users/:id
returns = returns success if valid
*/

// this delete route is for dev purposes only
// TODO: Protect delete route behind login middleware
router.delete('/users/:id', (req, res) => {
  const id = req.params;

  db('user')
    .where(id)
    .del()
    .then(count => {
      if (count === 0) {
        res.status(401).json({ message: 'user not found' });
      } else {
        res
          .status(200)
          .json({ message: `user id: ${id.id} successfuly deleted` });
      }
    })
    .catch(err => {
      res.status(500).json({ error: err });
    });
});

module.exports = router;
