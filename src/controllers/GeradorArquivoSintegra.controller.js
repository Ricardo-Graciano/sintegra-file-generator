const utils = require('../utils/index')
const path = require('path')
const fs = require(`fs`)
const csv = require('csvtojson')

const removeAccents = require('../utils/removeAccents').removeAccents

//cod	ncm	qCom	uCom	vUnCom	vProd	xProd


module.exports = {
    gerar: async(req, res) => {
        let csvFilePath = path.join(__dirname + `/../public/inventario_2020/${req.body.csvName}.csv`);
        let jsonArray = await csv({
            trim: true,
            delimiter: ";"
        }).fromFile(csvFilePath);

        jsonArray = removeAccents(jsonArray)
        const body = removeAccents(req.body)

        let str = ""
        str += utils.toFile10(body)
        str += utils.toFile11(body)
        str += utils.toFile74(body, jsonArray)
        str += utils.toFile75(body, jsonArray)
        str += utils.toFile90(body, String(jsonArray.length))

        fs.writeFile(`./src/public/inventario_2020/ARQUIVO SINTEGRA - ${body.csvName}-2020.txt`, str, (err, suc) => {})
        return res.send(str)
    }
}