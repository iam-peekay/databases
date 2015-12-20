var db = require('../db');
var promise = require('bluebird');

module.exports = {
  messages: {
    // Gets all user messages
    get: function (callback) {

        db.messages.findAll({
          include: [db.users]
        })
        .then(function(result){
          callback(null, JSON.stringify(result));
        })
    },
    // Posts new messages for a particular user
    post: function (data, callback) {
      data = JSON.parse(data);
      var post = {
        text: data.text,
        roomname: data.roomname
      };
      module.exports.users.post(data.username, function(){
        db.users.findOne({
          where: {
            username: data.username
          }
        })
        .then(function(result){
          post.usersId = result.id;
          db.messages.create(post);
        })
        .then(function(){
          callback(null);
        })
        .error(function(err){
          callback(err);
        })

      });
    }
  },

  users: {
    // Gets all users
    get: function (callback) {

        db.users.findAll({
          where: {
            id : {
              gt: 0
            }
          }
        })
        .then(function(users) {
          callback(null, JSON.stringify(users))
        })
        .error(function(err) {
          callback(err);
          console.log('There is an error')
        })

    },
    // Creates a new user
    post: function (data, callback) {
      db.users.findOrCreate({
        where: {username: data}
      })
      .then(function() {
          callback();
        })
      .error(function(err) {
        callback(err);
      })
    }

  }
};
