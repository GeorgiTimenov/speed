const express = require('express')
const next = require('next')

const dev = process.env.NODE_ENV !== 'production'
const app = next({ dev })
const handle = app.getRequestHandler()

app.prepare()
.then(() => {
  const server = express()


  server.get('/:country/:state/:suburb/MakeupArtists', (req, res) => {
    return app.render(req, res, '/MakeupArtists', { country: req.params.country, state: req.params.state, suburb: req.params.suburb })
  }) 

  server.get('/:country/:state/:suburb/MakeupArtist', (req, res) => {
    return app.render(req, res, '/MakeupArtists', { country: req.params.country, state: req.params.state, suburb: req.params.suburb })
  }) 


   server.get('/quote/:id', (req, res) => {
    return app.render(req, res, '/quote', { id: req.params.id })
  }) 

  server.get('*', (req, res) => {
    return handle(req, res)
  })

  server.listen(3000, (err) => {
    if (err) throw err
    console.log('> Ready on http://localhost:3000')
  })
})
.catch((ex) => {
  console.error(ex.stack)
  process.exit(1)
})