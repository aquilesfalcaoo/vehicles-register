import express from 'express'

const server = express()

server.get('/', (request, response) => {
  return response.send('Application works!')
})

export default server
