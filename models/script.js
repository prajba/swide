var mongodb = require('./db');

function Script(script) {
  this.name = script.name;
  this.description = script.description;
  this.type = script.type;
};

module.exports = Script;

Script.prototype.save = function save(callback) {
  var script = {
    name: this.name,
    description: this.description,
    type: this.type
  };

  mongodb.open(function(err, db) {
    if (err) {
      return callback(err);
    }
    db.collection('scripts' function(err, collection) {
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

Script.get = function get(scriptID, callback) {
};
