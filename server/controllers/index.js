var models = require('../models');

var headers = {
  "access-control-allow-origin": "*",
  "access-control-allow-methods": "GET, POST, PUT, DELETE, OPTIONS",
  "access-control-allow-headers": "content-type, accept",
  "access-control-max-age": 10, // Seconds.
  'Content-Type': "application/JSON"
};

module.exports = {
  messages: {
    get: function (req, res) {  // a function which handles a get request for all messages
      models.messages.get(function(err, data){
        if(err){ console.log('error')}
        else {
          res.writeHead(200, headers);
          res.end(data);
        }
      });
    }, 
    post: function (req, res) {  // a function which handles posting a message to the database
      var body = JSON.stringify(req.body); 
        models.messages.post(body, function(err) {
          if (err) { console.log(err.message); res.end('500'); }
          else {
            res.writeHead(201, headers);
            res.end('201');
          }
        });
     } 
  },

  users: {
    get: function (req, res) {
      models.users.get(function(err, data){
        if (err) { console.log('error')}
        else {
          res.writeHead(200, headers);
          res.end(data);
        }
      });
    },
    post: function (req, res) {
        var user = JSON.parse(req.body)
        models.messages.post(user.username, function(err) {
          if (err) { res.end('500'); }
          else {
            res.writeHead(201, headers);
            res.end('201');
          }
        });
    } 
  }
};

