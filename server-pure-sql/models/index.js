var db = require('../db');
var promise = require('bluebird');

module.exports = {
  messages: {
    get: function (callback) {
        //do something with database
        //get messages from database
        db.messages.findAll({
          // attributes: ['text', 'createdAt', 'roomname', 'objectId'],
          include: [db.users]
        })
        .then(function(result){
          console.log(JSON.stringify(result));
          callback(null, JSON.stringify(result));
        })
        // db.connection.query('SELECT m.objectId, m.createdAt, m.text, m.roomname, u.username FROM messages m inner join users u on(m.id_users=u.id);', function(error, results, fields){
        //   //logic here
        //   if(error){ console.log("Couldn't get messages")}
        //   else {
        //     var response = {results: results}
        //     callback(null, JSON.stringify(response))

        //   }
        // })
          //select messages table, get all messages
        //stringify JSON
        //callback(err, data)
    }, // a function which produces all the messages
    post: function (data, callback) {
      //capture current time, createdat
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
    // Ditto as above.
    get: function (callback) {
      // db.users.sync({force: true})
      // .success(function() {
        db.users.findAll({
          where: {
            id : {
              gt: 0
            } 
          }
        })
        .then(function(users) {
          // callback(null, users);
          callback(null, JSON.stringify(users))  
        })
        .error(function(err) {
          callback(err);
          console.log('There is an error')
        })
      
    },
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

