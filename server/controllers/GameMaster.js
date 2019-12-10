const models = require('../models');

// const Player = models.Player;
const Game = models.Game;

/*
const characterCreator = (req, res) => {
  Character.CharacterModel.findByOwner(req.session.account._id, (err, docs) => {
    if (err) {
      console.log(err);
      return res.status(400).json({ error: 'An error has occurred' });
    }

    return res.render('app', { csrfToken: req.csrfToken(), characters: docs });
  });
  return res.render('app', { csrfToken: req.csrfToken() });
};
*/

const gmPage = (req, res) => {
  Game.GameModel.findByOwner(req.session.account._id, (err, docs) => {
    if (err) {
      console.log(err);
      return res.status(400).json({ error: 'An error has occurred' });
    }

    console.log('gmPage');
    return res.render('app', { csrfToken: req.csrfToken(), games: docs });
  });
};

const makeGame = (req, res) => {
  if (!req.body.name) {
    return res.status(400).json({ error: 'Name is required' });
  }

  const gameData = {
    name: req.body.name,
    gm: req.session.account,
    players: {},
    owner: req.session.account._id,
  };

  const newGame = new Game.GameModel(gameData);

  const gamePromise = newGame.save();

  gamePromise.then(() => res.json({ redirect: '/gm' }));

  gamePromise.catch((err) => {
    console.log(err);
    if (err.code === 11000) {
      return res.status(400).json({ error: 'Game already exists.' });
    }

    return res.status(400).json({ error: 'An error occurred' });
  });

  return gamePromise;
};

const getGames = (request, response) => {
  const req = request;
  const res = response;

  console.log('GetGames');

  return Game.GameModel.findByOwner(req.session.account._id, (err, docs) => {
    if (err) {
      console.log(err);
      return res.status(400).json({ error: 'An error occurred' });
    }

    console.log(docs);

    return res.json({ games: docs });
  });
};

const startGame = (/* request, response*/) => {
  // const req = request;
  // const res = response;
};

/*
const setCurrentCharacter = (request, response) => {
  const req = request;
  const res = response;

  console.log("It's lit fam");
};
*/

module.exports.makeGame = makeGame;
module.exports.getGames = getGames;
module.exports.gmPage = gmPage;
module.exports.startGame = startGame;
