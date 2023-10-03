const express = require('express')
let app = express()

app.use(express.static('demo'))
app.use(express.static('data'))

app.listen(4000,'0.0.0.0', () => {
  console.log('server running on 0.0.0.0:4000')
})
