const express = require("express")
const server = express()

// initialize the server
server.all("/", (req, res) => {
  res.send("ScottBot is alive!")
})

// the exported function
function keepAlive() {
  server.listen(3000, () => {
    console.log("server is up")
  })
}

module.exports = keepAlive
