var mysql = require('mysql');

// Create a database connection and export it from this file.
// You will need to connect with the user "root", no password,
// and to the database "chat".

var connection = mysql.createConnection({
  user: 'root', 
  password: 'test',
  database: 'chat'
});

connection.connect(function(err) {
  if (err) {
    console.log('error connecting');
    return;
  }

  console.log('connection successful!');
 });




