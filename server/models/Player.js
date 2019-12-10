const mongoose = require('mongoose');
mongoose.Promise = global.Promise;
const _ = require('underscore');

let PlayerModel = {};

const convertId = mongoose.Types.ObjectId;
const setName = (name) => _.escape(name).trim();

const PlayerSchema = new mongoose.Schema({
  name: {
    type: String,
    required: true,
    trim: true,
    set: setName,
  },

  characters: {
    type: Object,
    required: true,
  },
});

// Needs to send back player data, may not be needed though
PlayerSchema.statics.toAPI = (doc) => ({
  name: doc.name,
  class: doc.class,
  maxHealth: doc.maxHealth,
});

PlayerSchema.statics.findByOwner = (ownerId, callback) => {
  const search = {
    owner: convertId(ownerId),
  };

  return PlayerModel.find(search).select('name characters').exec(callback);
};

PlayerModel = mongoose.model('Player', PlayerSchema);

module.exports.PlayerModel = PlayerModel;
module.exports.PlayerSchema = PlayerSchema;
