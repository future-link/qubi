const Express = require('express')
const BodyParser = require('body-parser')
const Logger = require('morgan')
const { URL } = require('url')

const createIndex = require('./resources/index')
const createPost = require('./resources/post')
const createFlow = require('./resources/flow')
 
const api = Express()
api.use(BodyParser.json())
api.use((_,res,next) => {
  res.setHeader('Access-Control-Allow-Origin', '*')
  next()
})
api.get('/', (_,res) => res.json(createIndex()))
api.post('/posts', (req,res) => res.json(createPost({ text: req.body.text })))
api.get('/flows/:id', (req,res) => res.json(createFlow({ id: req.params.id })))

const app = Express()
app.use(Logger("short"))
app.use('/api/v1', api)
app.get('/auth/pauth', (req,res) => {
  const redirectURL = req.query.redirect_url && new URL(req.query.redirect_url)
  if (!redirectURL) return res.sendStatus(400)
  redirectURL.hash = '#token=123455'
  return res.redirect(redirectURL)
})

app.listen(5000, () => console.log('LISTEN!'))
