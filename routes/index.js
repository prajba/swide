var express = require('express');
var router = express.Router();

/* GET home page. */
router.get('/', function(req, res) {
  res.render('index', { title: 'SWIDE' });
});

router.get('/:user', function(req, res) {
  res.render('users', { title: 'SWIDE', user: req.params.user });
});

module.exports = router;
