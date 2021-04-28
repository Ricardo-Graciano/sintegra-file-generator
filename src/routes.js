const { Router } = require('express')
const path = require('path')
const routes = Router()

routes.get('/', (req, res) => {
    res.sendFile(path.join(__dirname + '/views/index.html'))
})

const GeradorArquivoSntegraController = require('./controllers/GeradorArquivoSintegra.controller')
routes.post('/gerar-arquivo-sintegra', GeradorArquivoSntegraController.gerar)

const GeradorArquivoSpedFiscalController = require('./controllers/GeradorArquivoSpedFiscal.controller')
routes.post('/gerar-arquivo-sped-fiscal', GeradorArquivoSpedFiscalController.gerar)

module.exports = routes