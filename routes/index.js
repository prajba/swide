var express = require('express');
var router = express.Router();
var title = '脚本集成开发环境';
var User = require('../models/user.js');

router.get('/', function(req, res) {
  res.render('login', { title: title});
});

router.post('/', function(req, res) {
  User.get(req.body.username, function(err, user) {
    if (!user) {
      req.flash('error', '用户不存在');
      res.redirect('/');
    }
    if (user.password != req.body.password) {
      req.flash('error', '密码错误');
      res.redirect('/');
    }
    req.session.user = user;
    res.redirect('/swide');
  });
});

router.get('/logout', function(req, res) {
  req.session.user = null;
  req.flash('success', '登出成功');
  res.redirect('/');
});

router.get('/swide', function(req, res) {
  if(req.session.user === null) {
    res.redirect('/');
  }
  res.render('ide', {
    title: title,
    user: req.session.user.name
  });
});


module.exports = router;
