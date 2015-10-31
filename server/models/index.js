var db = require('../db');

module.exports = {
  messages: {
    get: function (callback) {
        //do something with database
        //get messages from database
        db.connection.query('SELECT m.objectId, m.createdAt, m.text, m.roomname, u.username FROM messages m inner join users u on(m.objectId = u.id);', function(error, results, fields){
          //logic here
          if(error){ console.log("Couldn't get messages")}
          else {
            var response = {results: results}
            callback(null, JSON.stringify(response))

          }
        })
          //select messages table, get all messages
        //stringify JSON
        //callback(err, data)
    }, // a function which produces all the messages
    post: function (data, callback) {
      console.log(data);
      //capture current time, createdat
      data = JSON.parse(data);
      var currentTime = (new Date()).toString()
      //insert new row into messages table
      data.createdAt = currentTime;

      var post = {
        text: data.text,
        createdAt: data.createdAt,
        roomname: data.roomname
      };

      db.connection.query('INSERT INTO messages SET ?', post, function(err, res){
        if(err) { 
          console.log(err.message);
          callback(err);
        }
        else {
          console.log('message posted')
          callback(null, res);
        }  
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
    get: function () {},
    post: function () {}
  }
};

