var db = require('../db');

module.exports = {
  messages: {
    get: function (url, callback) {
        //do something with database
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
        message: data.text,
        createdAt: data.createdAt
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

