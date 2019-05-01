const Express = require('express');
const BodyParser = require('body-parser');
const Logger = require('morgan');
const { URL } = require('url');
const cors = require('cors');

const createIndex = require('./resources/index');
const createPost = require('./resources/post');
const createFlow = require('./resources/flow');

const api = Express();
api.use(BodyParser.json());
api.use(cors());
api.get('/', (_, res, next) => res.json(createIndex()));
api.post('/posts', (req, res, next) =>
  res.json(
    createPost({
      text: req.body.text
    })
  )
);
api.get('/flows/:id', cors(), (req, res, next) =>
  res.json(
    createFlow({
      id: req.params.id
    })
  )
);

const app = Express();
app.use(Logger('short'));
app.use(cors());
app.use('/api/v1', api);
app.get('/auth/pauth', (req, res, next) => {
  const redirectURL = req.query.redirect_url && new URL(req.query.redirect_url);
  if (!redirectURL) return res.sendStatus(400);
  redirectURL.hash = '#token=123455';
  return res.redirect(redirectURL);
});
app.listen(5000, () => console.log('LISTEN!'));
