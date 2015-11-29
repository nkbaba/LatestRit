
// Console will print the message
//console.log('Server running at http://127.0.0.1:8087/');



//=================================================================================

//lets require/import the mongodb native drivers.
var mongodb = require('mongodb');

//We need to work with "MongoClient" interface in order to connect to a mongodb server.
var MongoClient = mongodb.MongoClient;

// Connection URL. This is where your mongodb server is running.
var url = 'mongodb://localhost:27017/samplesocial';

// Use connect method to connect to the Server
MongoClient.connect(url, function (err, db) {
  if (err) {
    console.log('Unable to connect to the mongoDB server. Error:', err);
  } else {
    //HURRAY!! We are connected. :)
    console.log('Connection established to', url);

    // Get the documents collection
    var collection = db.collection('tweets');

    // Your Query Here
    collection.update({"id" : 131249},{"$set" : {"comment" : "Hello There"}},false,false, function (err, result) {
      if (err) {
        console.log(err);
      } else if (result.length) {
        console.log('Found Results: ', result);//
        console.log('Found Total Number of Lines: ', result.length);
      } else {
        console.log('No document(s) found with defined "find" criteria!');
      }
      }
    );


      //Close connection
      db.close();
    }
  
});
