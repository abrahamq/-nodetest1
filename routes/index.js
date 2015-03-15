var express = require('express');
var router = express.Router();

/* GET home page. */
router.get('/', function(req, res, next) {
  res.render('index', { title: 'Express' });
});

router.get('/userlist', function(req, res, next){
	var db = req.db;
	var collection = db.get('usercollection');
	collection.find({}, {}, function(e, docs){
		res.render('userlist', {
			"userlist" : docs
		});
	}); 
}); 

router.get('/hello', function(req, res, next){
	res.render('hello', {title: 'hello'});
});

router.get('/newuser', function(req, res) {
    res.render('newuser', { title: 'Add a New User'}); 
}); 

router.post('/adduser', function(req, res){

    var db = req.db; 

    var userName = req.body.username; 
    var userEmail = req.body.useremail; 

    var collection = db.get('usercollection'); 

    collection.insert({ //submit to db 
        "username" : userName,
        "email"    : userEmail
    }, function(err, doc) {
        if (err) {
            //if error, then return the error 
            res.send("Error with db post for user"); 
        }
        else { //success 
            //show all users- go to /userlist 
            res.redirect("userlist"); 
            console.log("whoaoaoaoa"); 
        }
    });
}); 
            

module.exports = router;
