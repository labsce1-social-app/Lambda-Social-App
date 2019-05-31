const faker = require('faker');

const fakeIds = [
  1,
  '',
  2,
  3,
  4,
  5,
  6,
  7,
  8,
  9,
  10,
  '',
  '',
  '',
  11,
  12,
  13,
  14,
  15,
  16,
  17,
  '',
  18,
  '',
  19,
  '',
  '',
  20,
  21,
  22,
  '',
  '',
  '',
  '',
  23,
  24,
  25,
  '',
  '',
  26,
  27,
  '',
  28,
  29,
  30
];
function getRandomArbitrary(min, max) {
  return Math.floor(Math.random() * (max - min) + min);
}

const pickOne = item => item[Math.floor(Math.random() * item.length)];

// create a user
function generateUsers() {
  return {
    username: faker.internet.userName()
  };
}

function generateSubtopic_users() {
  return {
    user_id: getRandomArbitrary(1, 10),
    subtopic_id: getRandomArbitrary(1, 20)
  };
}
function generateSubtopics() {
  return {
    title: faker.lorem.text(10),
    creater_id: getRandomArbitrary(1, 10)
  };
}

function generateDiscussions() {
  return {
    subtopic_id: getRandomArbitrary(1, 20),
    title: faker.lorem.text(10),
    image: faker.image.imageUrl()
  };
}

function generateComments() {
  return {
    comment_post: faker.lorem.text(30),
    comment_id: pickOne(fakeIds)
  };
}

function generateUpvotes() {
  return {
    discussion_id: getRandomArbitrary(1, 20),
    user_id: getRandomArbitrary(1, 10)
  };
}

// helper to generate a specified amount of users
//call back will be the users function, iterator will be how many we want to generate
function accumulate(cb, iteration) {
  if (iteration > 0) {
    return [cb()].concat(accumulate(cb, iteration - 1));
  } else {
    // recursive base case
    return [];
  }
}

module.exports = {
  genUsers: accumulate(generateUsers, 10),
  genSubtopics: accumulate(generateSubtopics, 20),
  genSubtopicUsers: accumulate(generateSubtopic_users, 20),
  genDiscussions: accumulate(generateDiscussions, 20),
  genComments: accumulate(generateComments, 50),
  genUpvotes: accumulate(generateUpvotes, 89)
};
