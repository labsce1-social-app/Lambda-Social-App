# Lambda-Social-App Server

This is a REST CRUD API with endpoints to create, read, edit and update data in a database.

## RUNNING API

The API can be run in a few different ways the simplest to get it up and running in a fast fasion is to run the server locally. for this you can fork and / clone it to your local machine.

**There are some prerequisites for this however:**

- [git](https://www.linode.com/docs/development/version-control/how-to-install-git-on-linux-mac-and-windows/)
- [nodejs](https://nodejs.org/en/download/)
- [npm](https://docs.npmjs.com/getting-started/installing-node)
- [yarn](https://yarnpkg.com/lang/en/docs/install/#windows-stable) (optional but reccomended)

FORK
`to fork see the link below`
[how to fork](https://help.github.com/articles/fork-a-repo/)

CLONE
`git clone git@github.com:labsce1-social-app/Lambda-Social-App.git`
this will clone the repository locally to your machine.

SETUP
`cd Lambda-Social-App`
`yarn`
this will move you in to the project directory then using yarn you will download and install the dependencies.

RUN
`yarn server`
This will run the development server at `http://localhost:3000/` using nodemon
you can use `yarn start` to run it with node. **for usage see the endpoints**

---

## USAGE

**CRUD OPERATION ENDPOINTS**
The endpoints link you to the functionality of the database and include:

- `C`reate - `POST` endpoint to do `INSERT` on the database
- `R`ead - `GET` endpoint to do `GET` on the database
- `U`pdate - `PUT` endpoint to do `UPDATE` on the database
- `D`elete - `DELETE` endpoint to do `DELETE` on the database

### USERSROUTES

#### CREATE

**create a user**

URI: `http://<server_address:port>`

ENDPOINT: `POST -> /api/users`

URL: `URI/ENDPOINT`

this endpoint takes in a json object as the body of the request that must contain a username (max 25 characters), and an id (automatically generated) :

```
{
  "id": "1",
  "username": "some content"
}
```

(INSERT IMAGE HERE)

### READ

**get a list of all users**

URI: `http://<server_address:port>`

ENDPOINT: `GET -> /api/users`

(INSERT IMAGE HERE)

**read a single note by id**
`GET -> /api/users/:id`

(INSERT IMAGE HERE)

### UPDATE

**update a user by id**
`PUT -> /api/users/:id`

this endpoint takes in a json object as the body of the request that must contain a username :

```
{
  "username": "some content"
}
```

(INSERT IMAGE HERE)

### DELETE

**delete a user by id**
`DELETE -> /api/users/:id`

(INSERT IMAGE HERE)


