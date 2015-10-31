/* You'll need to have MySQL running and your Node server running
 * for these tests to pass. */

var Sequelize = require('sequelize');
var request = require("request"); // You might need to npm install the request module!
var expect = require('../../node_modules/chai/chai').expect;
var db = require('../db');


describe("Persistent Node Chat Server", function() {
  beforeEach(function(done) {
  var sequelize = new Sequelize('chat', 'root', 'test');
  sequelize.drop('messages');
  sequelize.sync({force: true})
  .then(function() {
    done();
  });

    /* Empty the db table before each test so that multiple tests
     * (or repeated runs of the tests) won't screw each other up: */
  });

  it("Should insert posted messages to the DB", function(done) {
    // Post the user to the chat server.
    // request({ method: "POST",
    //           uri: "http://127.0.0.1:3000/classes/users",
    //           json: { username: "Valjean" }
    // }, function () {
      // Post a message to the node chat server:
      request({ method: "POST",
              uri: "http://127.0.0.1:3000/classes/messages",
              json: {
                username: "Valjean",
                text: "In mercy's name, three days is all I need.",
                roomname: "Hello"
              }
      }, function () {
        // Now if we look in the database, we should find the
        // posted message there.

        // TODO: You might have to change this test to get all the data from
        // your message table, since this is schema-dependent.
          db.messages.findAll()
          .then(function(results) {
          // Should have one result:
                    console.log('I GOT HERE');
          expect(results.length).to.equal(1);

          // TODO: If you don't have a column named text, change this test.
          expect(results[0].text).to.equal("In mercy's name, three days is all I need.");

          done();
        });
      });
    });
  // });

  it("Should output all messages from the DB", function(done) {
    // Let's insert a message into the db
    // TODO - The exact query string and query args to use
    // here depend on the schema you design, so I'll leave
    // them up to you. */
     request({ method: "POST",
              uri: "http://127.0.0.1:3000/classes/messages",
              json: {
                username: "Valjean",
                text: "In mercy's name, three days is all I need.",
                roomname: "Hello"
              }
      }, function (){
      // Now query the Node chat server and see if it returns
      // the message we just inserted:
      request("http://127.0.0.1:3000/classes/messages", function(error, response, body) {
        var messageLog = JSON.parse(body);
        expect(messageLog[0].text).to.equal("In mercy's name, three days is all I need.");
        expect(messageLog[0].roomname).to.equal("Hello");
        done();
      });
    });
  });
});
