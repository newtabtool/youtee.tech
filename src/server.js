import server from './app.js'

const port = process.env.PORT || 3001

const s = server.listen(port, () => {
  console.log(`Server listening on port ${port}`)
})
