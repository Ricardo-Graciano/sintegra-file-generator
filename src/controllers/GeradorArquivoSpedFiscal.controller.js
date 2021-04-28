const utils = require('../utils/index')
const path = require('path')
const fs = require(`fs`)
const csv = require('csvtojson')

const commonBuild = require('../utils/spedfiscal/commonBuild')
const h010Build = require('../utils/spedfiscal/h010Build')

module.exports = {
    gerar: async(req, res) => {
        let { FOLDER_NAME } = req.body

        const base_path = path.join(__dirname, '..', 'public', 'inventario_2020_spedfiscal', FOLDER_NAME, 'data')

        const reg0000Json = JSON.parse(fs.readFileSync(path.join(base_path, 'reg0000.json')).toString())
        const reg0001Json = JSON.parse(fs.readFileSync(path.join(base_path, 'reg0001.json')).toString())
        const reg0005Json = JSON.parse(fs.readFileSync(path.join(base_path, 'reg0005.json')).toString())
        const reg0190Json = JSON.parse(fs.readFileSync(path.join(base_path, 'reg0190.json')).toString())
        const reg0200Json = JSON.parse(fs.readFileSync(path.join(base_path, 'reg0200.json')).toString())
        const regH001Json = JSON.parse(fs.readFileSync(path.join(base_path, 'regH001.json')).toString())
        const regH005Json = JSON.parse(fs.readFileSync(path.join(base_path, 'regH005.json')).toString())
        const regH010Json = JSON.parse(fs.readFileSync(path.join(base_path, 'regH010.json')).toString())

        const reg9001Array = [{ "REG": "9001", "IND_DAD": "0" }]
        const reg9900Array = [
            { REG: "9900", REG_BLC: "0000", QTD_REG_BLC: reg0000Json.length },
            { REG: "9900", REG_BLC: "0001", QTD_REG_BLC: reg0001Json.length },
            { REG: "9900", REG_BLC: "0005", QTD_REG_BLC: reg0005Json.length },
            { REG: "9900", REG_BLC: "0190", QTD_REG_BLC: reg0190Json.length },
            { REG: "9900", REG_BLC: "0200", QTD_REG_BLC: reg0200Json.length },
            { REG: "9900", REG_BLC: "H001", QTD_REG_BLC: regH001Json.length },
            { REG: "9900", REG_BLC: "H005", QTD_REG_BLC: regH005Json.length },
            { REG: "9900", REG_BLC: "H010", QTD_REG_BLC: regH010Json.length },
        ]
        const sumOfAllLines = reg9900Array.reduce((a, v) => { return a + v.QTD_REG_BLC }, 2)

        reg9900Array.push({ "REG": "9000", "QTD_LIN_9": reg9900Array.length })

        const reg9999Array = [{ "REG": "9999", "QTD_LIN_9": sumOfAllLines }]

        var str = ''
        str += commonBuild(reg0000Json)
        str += commonBuild(reg0001Json)
        str += commonBuild(reg0005Json)
        str += commonBuild(reg0190Json)
        str += commonBuild(reg0200Json)
        str += commonBuild(regH001Json)
        str += commonBuild(regH005Json)
        str += h010Build(regH010Json)
        str += commonBuild(reg9001Array)
        str += commonBuild(reg9900Array)
        str += commonBuild(reg9999Array)
            /*  const body = removeAccents(req.body)

             let str = ""
             str += utils.toFile10(body)
             str += utils.toFile11(body)
             str += utils.toFile74(body, jsonArray)
             str += utils.toFile75(body, jsonArray)
             str += utils.toFile90(body, String(jsonArray.length)) */

        fs.writeFile(`./src/public/inventario_2020_spedfiscal/${FOLDER_NAME}/ARQUIVO SPEDFISCAL - ${FOLDER_NAME}-2020.txt`, str, (err, suc) => {})
        return res.send(str)
    }
}

function checkMissingProduct() {
    const base_path = path.join(__dirname, '..', 'public', 'inventario_2020_spedfiscal', 'ENIO', 'data')
    const reg0200Json = JSON.parse(fs.readFileSync(path.join(base_path, 'reg0200.json')).toString())
    const regH010Json = JSON.parse(fs.readFileSync(path.join(base_path, 'regH010.json')).toString())

    const missingProduct = reg0200Json.filter(product => !regH010Json.some(p => product._id == p._id))
    console.log(missingProduct);
}