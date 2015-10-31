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
    get: function (req, res) {
      models.messages.get(req.url, function(err, data){
        if(err){ console.log('error')}
        else {
          res.writeHead(200, headers);
          res.end(data);
        }
      });
    }, // a function which handles a get request for all messages
    post: function (req, res) {
      var body = '';
      req.on('data', function(chunk) {
        body += chunk;
        
      });
      req.on('end', function(err, data) {
        models.messages.post(body, function(err) {
          if (err) { res.end('500'); }
          else {
            res.end('201');
          }
        });
      });
    } // a function which handles posting a message to the database
  },

  users: {
    // Ditto as above
    get: function (req, res) {
      models.users.get(req.url, function(err, data){
        if (err) { console.log('error')}
        else {
          res.writeHead(200, headers);
          res.end(data);
        }
      });
    },
    post: function (req, res) {
      var body = '';
      req.on('data', function(err, chunk) {
        body += chunk;
      });
      req.on('end', function(err) {
        models.messages.post(body, function(err) {
          if (err) { res.end('500'); }
          else {
            res.end('201');
          }
        });
      });
    } 
  }
};

