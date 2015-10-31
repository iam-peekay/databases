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
          console.log(result.id)
          post.usersId = result.id;
          db.messages.create(post);
        })
        .then(function(){
          callback(null);
        })
        .error(function(err){
          callback(err);
        })
        // var queryString = "SELECT id FROM users WHERE username='"+ data.username +"';";
        // db.connection.query(queryString, function(err, res) {
        //   if (err) {
        //     throw err;
        //   } else {
        //     console.log(res)
        //     post.id_users = res[0].id;
        //     db.connection.query('INSERT INTO messages SET ?', post, function(err, res){
        //       if(err) { 
        //         console.log(err.message);
        //         callback(err);
        //       }
        //       else {
        //         console.log('message posted')
        //         callback(null, res);
        //       }  
        //     });
        //   }
        // });
        
      });

      // users.post({username: data.username});
      //populate fields with data for messages table
      //check if user exists
        //if not, add user to users table
        // users.post(//username//)
      //check if room
        //if not add room to rooms table
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
          console.log(users[0].username)
          callback(null, JSON.stringify(users))  
        })
        .error(function(err) {
          callback(err);
          console.log('There is an error')
        })
      
    },
    post: function (data, callback) {
        console.log(data);
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

// User.sync().success(function() {
//   /* This callback function is called once sync succeeds. */

//   // now instantiate an object and save it:
//   var newUser = User.build({username: "Jean Valjean"});
//   newUser.save().success(function() {

//     /* This callback function is called once saving succeeds. */

//     // Retrieve objects from the database:
//     User.findAll({ where: {username: "Jean Valjean"} }).success(function(usrs) {
//       // This function is called back with an array of matches.
//       for (var i = 0; i < usrs.length; i++) {
//         console.log(usrs[i].username + " exists");
//       }
//     });
//   });
// });
        //if yes
          //callback()
        //otherwise add user to user table.
      //posting to user table
      //parse data
      //query insert into users table
      //passback callback
    
  }
};

