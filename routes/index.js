var express = require('express');
var router = express.Router();

var User = require('../models/user.js');

router.get('/', function(req, res) {
  res.render('login', { title: '脚本集成开发环境' });
});

router.post('/', function(req, res) {
  User.get(req.body.username, function(err, user) {
    if (!user) {
      req.flash('error', '用户不存在');
      return res.redirect('/'); }
    if (user.password != req.body.password) {
      req.flash('error', '密码错误');
      return res.redirect('/');
    }
    req.session.user = user;
    req.flash('success', '登录成功');
    res.redirect('/search');
  });
});

router.get('/logout', function(req, res) {
  req.session.user = null;
  req.flash('success', '登出成功');
  res.redirect('/');
});

router.get('/search', function(req, res) {
  res.render('search', { title: '脚本集成开发环境' });
});


module.exports = router;
