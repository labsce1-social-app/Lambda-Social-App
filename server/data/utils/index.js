const faker = require('faker');
const fakeIds = require('./fakedata.js')

// picks a random number from n to k
function getRandomArbitrary(min, max) {
    return Math.floor(Math.random() * (max - min) + min);
}

// picks a random item in an array
const pickOne = item => item[Math.floor(Math.random() * item.length)];

// create a user object
function generateUsers() {
    return {
        username: faker.internet.userName()
    };
}

// create a subtopic_users object for joining tables
function generateSubtopic_users() {
    return {
        user_id: getRandomArbitrary(1, 10),
        subtopic_id: getRandomArbitrary(1, 20),
    };
}

// create a subtopics object
function generateSubtopics() {
    return {
        title: faker.lorem.words(4),
        creater_id: getRandomArbitrary(1, 10),
    };
}

// create a discussions object
function generateDiscussions() {
    return {
        subtopic_id: getRandomArbitrary(1, 20),
        title: faker.lorem.words(4),
        content: faker.lorem.text(40, 100),
        image: faker.image.imageUrl()
    };
}

// creates a comments object
function generateComments() {
    return {
        comment_post: faker.lorem.text(30),
        comment_id: pickOne(fakeIds)
    };
}

// creates an upvote object for keeping user and discussions id
// this will help us see what users have voted on a discussion
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

// export a function with the object and how many you want made
// this will be imported into the seeds files
module.exports = {
    genUsers: accumulate(generateUsers, 10),
    genSubtopics: accumulate(generateSubtopics, 20),
    genSubtopicUsers: accumulate(generateSubtopic_users, 20),
    genDiscussions: accumulate(generateDiscussions, 20),
    genComments: accumulate(generateComments, 50),
    genUpvotes: accumulate(generateUpvotes, 89)
};
