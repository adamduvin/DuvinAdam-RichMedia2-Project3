const requiresLogin = (req, res, next) => {
  if (!req.session.account && !req.session.accountGM) {
    return res.redirect('/');
  }
  return next();
};

// Might need to make a special function for GM accounts

const requiresLogout = (req, res, next) => {
  if (req.session.account || req.session.accountGM) {
    return res.redirect('/player'); //Change this later based on account type
  }

  return next();
};

const requiresSecure = (req, res, next) => {
  if (req.headers['x-forwarded-proto'] !== 'https') {
    return res.redirect(`https://${req.hostname}${req.url}`);
  }
  return next();
};

const bypassSecure = (req, res, next) => {
  next();
};

module.exports.requiresLogin = requiresLogin;
module.exports.requiresLogout = requiresLogout;

if (process.env.NODE_ENV === 'production') {
  module.exports.requiresSecure = requiresSecure;
} else {
  module.exports.requiresSecure = bypassSecure;
}
