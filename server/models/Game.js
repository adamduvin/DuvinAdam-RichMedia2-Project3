const crypto = require('crypto');
const mongoose = require('mongoose');

mongoose.Promise = global.Promise;

let GameModel = {};
const iterations = 10000;
const saltLength = 64;
const keyLength = 64;

const convertId = mongoose.Types.ObjectId;

const GameSchema = new mongoose.Schema({
  name: {
    type: String,
    required: true,
    trim: true,
    unique: true,
    match: /^[A-Za-z0-9_\-.]{1,16}$/,
  },

  gm: {
    type: String,
    required: true,
  },

  /* salt: {
    type: Buffer,
    required: true,
  },*/
  /* password: {
    type: String,
    required: true,
  },*/

  players: {
    type: Object,
    required: true,
  },

  owner: {
    type: mongoose.Schema.ObjectId,
    required: true,
    ref: 'Account',
  },

  createdDate: {
    type: Date,
    default: Date.now,
  },
});

GameSchema.statics.toAPI = doc => ({
  // _id is built into your mongo document and is guaranteed to be unique
  name: doc.name,
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

GameSchema.statics.findByname = (name, callback) => {
  const search = {
    name,
  };

  return GameModel.findOne(search, callback);
};

GameSchema.statics.generateHash = (password, callback) => {
  const salt = crypto.randomBytes(saltLength);

  crypto.pbkdf2(password, salt, iterations, keyLength, 'RSA-SHA512', (err, hash) =>
    callback(salt, hash.toString('hex'))
  );
};

GameSchema.statics.authenticate = (name, callback) =>
GameModel.findByname(name, (err, doc) => {
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

GameSchema.statics.findByOwner = (ownerId, callback) => {
  const search = {
    owner: convertId(ownerId),
  };

  return GameModel.find(search).select('name gm players').exec(callback);
};

GameModel = mongoose.model('Game', GameSchema);

module.exports.GameModel = GameModel;
module.exports.GameSchema = GameSchema;
