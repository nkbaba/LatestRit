var express = require('express');
var router = express.Router();

/*
 * GET userlist.
 */
router.get('/userlist/:uname', function(req, res) {
    var db = req.db;
    var collection = db.get('userlist');
    var userToget = req.params.uname;
    collection.find({'username':userToget},{},function(e,docs){
        res.json(docs);
    });
});