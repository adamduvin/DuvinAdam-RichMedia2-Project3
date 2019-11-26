const controllers = require('./controllers');
const mid = require('./middleware');

const router = (app) => {
  app.get('/getToken', mid.requiresSecure, controllers.Account.getToken);
  app.get('/getCharacters', mid.requiresLogin, controllers.Domo.getCharacters);
  app.get('/login', mid.requiresSecure, mid.requiresLogout, controllers.Account.loginPage);
  app.post('/login', mid.requiresSecure, mid.requiresLogout, controllers.Account.login);
  app.post('/signup', mid.requiresSecure, mid.requiresLogout, controllers.Account.signup);
  app.get('/logout', mid.requiresLogin, controllers.Account.logout);
  app.get('/player', mid.requiresLogin, controllers.Domo.makerPage);
  app.post('/player', mid.requiresLogin, controllers.Domo.make);
  app.get('/gm', mid.requiresLogin, controllers.Domo.makerPage);
  app.post('/gm', mid.requiresLogin, controllers.Domo.make);
  //app.get('/game', mid.requiresLogin, controllers.Game.makerPage);
  //app.post('/game', mid.requiresLogin, controllers.Game.make);
  app.get('/', mid.requiresSecure, mid.requiresLogout, controllers.Account.loginPage);
};

module.exports = router;
