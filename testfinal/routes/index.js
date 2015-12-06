var express = require('express');
var router = express.Router();

var global;

/* GET home page. */
router.get('/', function(req, res, next) {
  res.render('index', { title: 'Find Tweets Project' });
});

/* GET SearchForm page. */
router.get('/searchform', function(req, res, next) {
  res.render('searchform', { title: 'Find Tweets Project' });
});

/* GET SearchList page. */
router.get('/searchlist', function(req, res, next) {
  res.render('searchlist', { title: 'Find Tweets Project' });
});

/* POST to Search User Service */
router.post('/search', function(req, res) {

    // Set our internal DB variable
    var db = req.db;

    // Get our form values. These rely on the "name" attributes
    var userName = req.body.username;
    //var userEmail = req.body.useremail;
    global = userName;
    // Set our collection
    var collection = db.get('tweets');

    var query= {"text" : new RegExp(userName,"i")};

    // Submit to the DB
    collection.find(query, function (err, docs) {
        if (err) {
            
        }
        else {
            // And forward to success page
            res.render('search', {
            "search" : docs, "userName" : userName, title: 'Find Tweets Project' });
          
        }
        
    });
});

/*
 * GET userlist.
 */
router.get('/userlist', function(req, res) {
    var db = req.db;
    var collection = db.get('tweets');
    var query= {"text" : new RegExp(global,"i")};

    // Submit to the DB
    collection.find(query, function(e,docs){
        res.json(docs);
    });
});

/*
 * Update to Comment
 */
router.post('/commentuser', function(req, res) {
   
    var db = req.db;
    console.log("comment working at server level");

    var collection = db.get('tweets');
    var userID = parseInt(req.body.id1);
    var userComment= req.body.comment;
    var type=typeof(userID);
    console.log("Type of ID passed: "+type+" and Value: "+userID);
    console.log(userComment);
    
    var query= {"id" : userID};
    var query2={"$set" : {"comment" : userComment}};
  
    collection.update(query,query2, false, false, function(err){
    
    res.send((err === null) ? { msg: '' } : { msg:'error: ' + err });
    });
    });

/* GET MapHome page. */
router.get('/map/:id', function(req, res, next) {
  var someVar = parseInt(req.params.id);
console.log("came on map");
  var db =req.db;
   var collection = db.get('tweets');
    var query= {"id" : someVar};
console.log(someVar);
    // Submit to the DB
    collection.find(query, function(e,docs){
        if(e){
            console.log("Find Query dint work");
        }
        else{
        res.render('map', {"co" : docs, title: 'Find Tweets Project' });        
        }
    });


});
module.exports = router;