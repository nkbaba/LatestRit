var express = require('express');
var router = express.Router();

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

    // Set our collection
    var collection = db.get('tweets');

    var query= {"text" : new RegExp(userName,"i")};

    // Submit to the DB
    collection.find(query, function (err, docs) {
        if (err) {
            // If it failed, return error
            //res.send("There was a problem adding the information to the database.");
        }
        else {
            // And forward to success page
            res.render('search', {
            "search" : docs, "userName" : userName});
            //res.redirect("searchlist");

        }
        
    });
});

module.exports = router;