const controllers = require('./controllers');
const mid = require('./middleware');

const router = (app) => {
  app.get('/getToken', mid.requiresSecure, controllers.Account.getToken);
  app.get('/getCharacters', mid.requiresLogin, controllers.Player.getCharacters);
  app.get('/getAccountType', mid.requiresLogin, controllers.Account.getAccountType);
  // app.post('/setCurrentCharacter', mid.requiresLogin, controllers.Player.setCurrentCharacter);
  app.get('/login', mid.requiresSecure, mid.requiresLogout, controllers.Account.loginPage);
  app.post('/login', mid.requiresSecure, mid.requiresLogout, controllers.Account.login);
  app.post('/signup', mid.requiresSecure, mid.requiresLogout, controllers.Account.signup);
  app.get('/logout', mid.requiresLogin, controllers.Account.logout);
  app.get('/player', mid.requiresLogin, controllers.Player.playerPage);
  app.get('/characterCreator', mid.requiresLogin, controllers.Player.characterCreator);
  app.post('/makeCharacter', mid.requiresLogin, controllers.Player.makeCharacter);
  app.get('/gm', mid.requiresLogin, controllers.GameMaster.gmPage);
  app.post('/makeGame', mid.requiresLogin, controllers.GameMaster.makeGame);
  app.get('/getGames', mid.requiresLogin, controllers.Game.getGames);
  app.post('/startGame', mid.requiresLogin, controllers.GameMaster.startGame);
  // app.get('/game', mid.requiresLogin, controllers.Game.makerPage);
  // app.post('/game', mid.requiresLogin, controllers.Game.make);
  app.get('/', mid.requiresSecure, mid.requiresLogout, controllers.Account.loginPage);
};

module.exports = router;
