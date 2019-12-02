const models = require('../models');

const Player = models.Player;
const Character = models.Character;
/*
const characterCreator = (req, res) => {
  Character.CharacterModel.findByOwner(req.session.account._id, (err, docs) => {
    if (err) {
      console.log(err);
      return res.status(400).json({ error: 'An error has occurred' });
    }

    return res.render('app', { csrfToken: req.csrfToken(), characters: docs });
  });
};*/

const playerPage = (req, res) => {
  Character.CharacterModel.findByOwner(req.session.account._id, (err, docs) => {
    if (err) {
      console.log(err);
      return res.status(400).json({ error: 'An error has occurred' });
    }

    console.log('player');
    return res.render('app', { csrfToken: req.csrfToken(), characters: docs });
  });
};

const makeCharacter = (req, res) => {
  if (!req.body.name || !req.body.class || !req.body.maxHealth) {
    return res.status(400).json({ error: 'Name, class, and Max Health are required' });
  }

  const characterData = {
    name: req.body.name,
    class: req.body.class,
    maxHealth: req.body.maxHealth,
    owner: req.session.account._id,
  };

  const newCharacter = new Character.CharacterModel(characterData);

  const characterPromise = newCharacter.save();

  characterPromise.then(() => res.json({ redirect: '/player' }));

  characterPromise.catch((err) => {
    console.log(err);
    if (err.code === 11000) {
      return res.status(400).json({ error: 'Character already exists.' });
    }

    return res.status(400).json({ error: 'An error occurred' });
  });

  return characterPromise;
};

const getCharacters = (request, response) => {
  const req = request;
  const res = response;

  return Character.CharacterModel.findByOwner(req.session.account._id, (err, docs) => {
    if (err) {
      console.log(err);
      return res.status(400).json({ error: 'An error occurred' });
    }

    return res.json({ characters: docs });
  });
};

module.exports.playerPage = playerPage;
module.exports.getCharacters = getCharacters;
module.exports.make = makeCharacter;
