var Sequelize = require('sequelize');
var sequelize = new Sequelize('chat', 'root', 'test');
// Create a database connection and export it from this file.
// You will need to connect with the user "root", no password,
// and to the database "chat".


exports.messages = sequelize.define('messages', {
  text: Sequelize.STRING,
  objectId: {
    type: Sequelize.INTEGER,
    primaryKey: true,
    autoIncrement: true
  },
  roomname: Sequelize.STRING,
});

exports.users = sequelize.define('users', {
  username: Sequelize.STRING
});

sequelize.sync();


exports.users.hasMany(exports.messages, {foreignKey: 'usersId'});

exports.messages.belongsTo(exports.users, {foreignKey: 'usersId'});