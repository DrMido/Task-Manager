const authrouter = require('../routes/Auth');
const feedrouter = require('../routes/Feed');

function routerconfig(app) {
  app.use('/auth', authrouter);
  app.use('/feed', feedrouter);
}

module.exports = routerconfig;
