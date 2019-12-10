const models = require('../models');

// const Player = models.Player;
const Character = models.Character;

const characterCreator = (req, res) =>
  /* Character.CharacterModel.findByOwner(req.session.account._id, (err, docs) => {
    if (err) {
      console.log(err);
      return res.status(400).json({ error: 'An error has occurred' });
    }

    return res.render('app', { csrfToken: req.csrfToken(), characters: docs });
  });*/
   res.render('app', { csrfToken: req.csrfToken() });

const playerPage = (req, res) => {
  Character.CharacterModel.findByOwner(req.session.account._id, (err, docs) => {
    if (err) {
      console.log(err);
      return res.status(400).json({ error: 'An error has occurred' });
    }

    console.log('test');
    return res.render('app', { csrfToken: req.csrfToken(), characters: docs });
  });
};

const makeCharacter = (req, res) => {
  if (!req.body.name || !req.body.class || !req.body.race || !req.body.maxHealth) {
    return res.status(400).json({ error: 'Name, Class, Race, and Max Health are required' });
  }

  const characterData = {
    name: req.body.name,
    level: req.body.level,
    class: req.body.class,
    race: req.body.race,
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

  console.log('GetCharacters');

  return Character.CharacterModel.findByOwner(req.session.account._id, (err, docs) => {
    if (err) {
      console.log(err);
      return res.status(400).json({ error: 'An error occurred' });
    }

    console.log(docs);

    return res.json({ characters: docs });
  });
};

/*
const setCurrentCharacter = (request, response) => {
  const req = request;
  const res = response;

  console.log("It's lit fam");
};
*/

module.exports.playerPage = playerPage;
module.exports.getCharacters = getCharacters;
module.exports.makeCharacter = makeCharacter;
module.exports.characterCreator = characterCreator;
// module.exports.setCurrentCharacter = setCurrentCharacter;
