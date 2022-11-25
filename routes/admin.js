var express = require('express');
var router = express.Router();

/* GET users listing. */
router.get('/', function(req, res, next) {
res.render('admin')
});

router.get('/users', function(req, res, next) {
  res.render('admin-users')
  });

  router.get('/add-client',function(req,res){
    res.render('add-client')
  })


module.exports = router;
