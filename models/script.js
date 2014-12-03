var mongodb = require('./db');

function Script(script) {
  this.name = script.name;
  this.createdBy = script.createdBy;
  this.createdTime = script.createdTime;
  this.description = script.description;
  this.type = script.type;
  this.machine = script.machine;
  this.field = script.field;
  this.target = script.target;
  this.latestVersion = script.latestVersion;
  this.scriptContent.push(script.scriptContent);
  this.parameters = script.parameters;
};

module.exports = Script;

Script.prototype.create = function create(callback) {
  var script = {
    name: this.name,
    createdBy: this.createdBy,
    createdTime: this.createdTime,
    description: this.description,
    type: this.type,
    machine: this.machine,
    field: this.field,
    target: this.target,
    latestVersion: this.latestVersion,
    scriptContent: this.scriptContent,
    parameters: this.parameters
  };

  mongodb.open(function(err, db) {
    if (err) {
      return callback(err);
    }
    db.collection('scripts', function(err, collection) {
      if (err) {
        mongodb.close();
        return callback(err);
      }
      collection.insert(script, {safe: true}, function(err, script) {
        mongodb.close();
        callback(err, script);
      });
    });
  });
};
