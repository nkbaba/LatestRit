
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

    // Insert some users
    collection.find({text: /(choose*)|(cheese*)/i},{_id: 0, text: 1}).toArray(function (err, result) {
      if (err) {
        console.log(err);
      } else if (result.length) {
        console.log('Found Results: ', result);//
        console.log('Found Total Number of Lines: ', result.length);
      } else {
        console.log('No document(s) found with defined "find" criteria!');
      }

//================================================================================
/*var http = require("http");
var response1 = "hello";
http.createServer(function (request, response) {

   // Send the HTTP header 
   // HTTP Status: 200 : OK
   // Content Type: text/plain
   //response.writeHead(200, {'Content-Type': 'text/plain'});

  

	console.log("Got a request");
   // Send the response body as "Hello World"
	response.write("Found Results: \n "+JSON.stringify(result, null, 2));
	response.write("\n \n \n Total No of lines: "+result.length);
	response.end();
   
}).listen(3000);
*/
//==================================================================================

      //Close connection
      db.close();
    });
  }
});
