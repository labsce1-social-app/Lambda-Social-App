const router = require('express').Router();
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
      res.status(404).json({ error: err });
    });
});

/*
GET ROUTE get single user
@PARAM = String! user id
ROUTE = '/api/users/:id
returns = a single user object
*/

/*
POST ROUTE create a user
@PARAM = {
   user id: String!
   username: String!
}
ROUTE = '/api/users
returns = returns created user
*/

/*
PUT ROUTE delete a user
@PARAM = {
    id: String! user id
    username: String!
}
ROUTE = '/api/users/:id
returns = returns new user info
*/

/*
DELETE ROUTE delete a user
@PARAM = String! user id
ROUTE = '/api/users/:id
returns = returns 1 for successful deletion
*/

module.exports = router;
