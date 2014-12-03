var express = require('express');
var router = express.Router();
var Script = require('../models/script.js');

router.get('/search', function(req, res) {
  var f = req.query.field;
  var t = req.query.target;
  var k = req.query.keywords;
  res.send("to be continue...");
});

router.post('/save', function(req, res) {
  var newScript = new Script({
    name: req.query.name,
    createdBy: req.query.createdBy,
    createdTime: req.query.createdTime,
    description: req.query.description,
    type: req.query.type,
    machine: req.query.machine,
    field: req.query.field,
    target: req.query.target,
    latestVersion: req.query.latestVersion,
    scriptContent: req.query.scriptContent,
    parameters: req.query.parameters
  });

  newScript.save(function(err) {
    if(err) {
      res.send('error');
    }
    res.send('success');
  });
});


module.exports = router;
