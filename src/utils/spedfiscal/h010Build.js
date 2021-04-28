const removeAccents = require('../removeAccents').removeAccents
const parseToFloatString = require('../parseToFloatString')
module.exports = (array) => {
    if (Array.isArray(array)) {
        const arrayParsed = array.map(row => {
            delete row._id
            row = removeAccents(row)
            return Object.keys(row).map(r => {
                switch (r) {
                    case 'QTD':
                        return parseToFloatString(row[r], 3)
                    case 'VL_UNIT':
                        return parseToFloatString(row[r], 6)
                    case 'VL_ITEM':
                        return parseToFloatString(row[r], 2)
                    default:
                        return row[r]
                }

            })
        })
        const stringsArray = arrayParsed.map(a => `|${a.join("|")}|\n`)
        return stringsArray.join('')
    }

    return ''
}