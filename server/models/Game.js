const crypto = require('crypto');
const mongoose = require('mongoose');

mongoose.Promise = global.Promise;

let GameModel = {};
const iterations = 10000;
const saltLength = 64;
const keyLength = 64;

const GameSchema = new mongoose.Schema({
  gameName: {
    type: String,
    required: true,
    trim: true,
    unique: true,
    match: /^[A-Za-z0-9_\-.]{1,16}$/,
  },
  salt: {
    type: Buffer,
    required: true,
  },
  /*password: {
    type: String,
    required: true,
  },*/
  players: {
    type: Object,
    required: true,
  },
  createdDate: {
    type: Date,
    default: Date.now,
  },
});

GameSchema.statics.toAPI = doc => ({
  // _id is built into your mongo document and is guaranteed to be unique
  gameName: doc.gameName,
  _id: doc._id,
});

/* const validatePassword = (doc, password, callback) => {
  const pass = doc.password;

  return crypto.pbkdf2(password, doc.salt, iterations, keyLength, 'RSA-SHA512', (err, hash) => {
    if (hash.toString('hex') !== pass) {
      return callback(false);
    }
    return callback(true);
  });
};*/

GameSchema.statics.findByGameName = (name, callback) => {
  const search = {
    gameName: name,
  };

  return GameModel.findOne(search, callback);
};

GameSchema.statics.generateHash = (password, callback) => {
  const salt = crypto.randomBytes(saltLength);

  crypto.pbkdf2(password, salt, iterations, keyLength, 'RSA-SHA512', (err, hash) =>
    callback(salt, hash.toString('hex'))
  );
};

GameSchema.statics.authenticate = (gameName, callback) =>
GameModel.findByGameName(gameName, (err, doc) => {
  if (err) {
    return callback(err);
  }

  if (!doc) {
    return callback();
  }

  return callback(null, doc);

  /* return validatePassword(doc, password, (result) => {
    if (result === true) {
      return callback(null, doc);
    }

    return callback();
  });*/
});

GameModel = mongoose.model('Game', GameSchema);

module.exports.GameModel = GameModel;
module.exports.GameSchema = GameSchema;
