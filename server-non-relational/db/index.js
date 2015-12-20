var Sequelize = require('sequelize');
var sequelize = new Sequelize('chat', 'root', 'test');
// Creates a database connection and exporst it from this file.


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
