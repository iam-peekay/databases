var db = require('../db');

module.exports = {
  messages: {
    get: function (callback) {
        db.connection.query('SELECT m.objectId, m.createdAt, m.text, m.roomname, u.username FROM messages m inner join users u on(m.id_users=u.id);', function(error, results, fields){
          if(error){ console.log("Couldn't get messages")}
          else {
            var response = {results: results};
            callback(null, JSON.stringify(response));

          }
        })
    }, // a function which produces all the messages
    post: function (data, callback) {
      data = JSON.parse(data);
      var currentTime = (new Date()).toString()
      //insert new row into messages table
      data.createdAt = currentTime;
      var post = {
        text: data.text,
        createdAt: data.createdAt,
        roomname: data.roomname
      };
      module.exports.users.post(data.username, function(){
        var queryString = "SELECT id FROM users WHERE username='"+ data.username +"';";
        db.connection.query(queryString, function(err, res) {
          if (err) {
            throw err;
          } else {
            post.id_users = res[0].id;
            db.connection.query('INSERT INTO messages SET ?', post, function(err, res){
              if(err) { 
                console.log(err.message);
                callback(err);
              }
              else {
                callback(null, res);
              }  
            });
          }
        });
        
      });
    } 
  },

  users: {
    // Ditto as above.
    get: function (callback) {
      // query the database for user table and get all users
      db.connection.query('SELECT username FROM users', function(error, results, fields) {
        if (error) {
          console.log("Couldn't get users");
        } else {
          // return callback with results
          results = JSON.stringify(results);
          callback(null, results);
        }
      });
    },
    post: function (data, callback) {
      //check if username exists in table
      db.connection.query("SELECT username FROM users WHERE username='"+data+"';", function(err, results, fields){
        if(results.length === 0){
          var username = {username: data};
          db.connection.query('INSERT IGNORE INTO users SET ?', username, function(err, res){
            if(err){
              throw err;
            } else {
              callback();
            }
          });
        } else {
          callback();
        }
      });
    }
  }
};

