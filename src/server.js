const express = require('express')
const app = express()
const routes = require('./routes')
const path = require('path')

app.set(path.join(__dirname, 'views'));

app.use(express.json())
app.use(routes)

app.listen(2569)
console.log("Servidor iniciado na porta 2569");