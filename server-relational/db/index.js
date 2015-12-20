var mysql = require('mysql');

// Creates a database connection and exports it from this file.
// Connects with the user "root", no password, and to the database "chat".

exports.connection = mysql.createConnection({
  user: 'root',
  password: 'test',
  database: 'chat'
});

exports.connection.connect(function(err) {
  if (err) {
    console.log('error connecting');
    return;
  }

  console.log('connection successful!');
 });

 
