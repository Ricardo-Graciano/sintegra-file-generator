const removeAccents = require('../removeAccents').removeAccents

module.exports = (array) => {
    if (Array.isArray(array)) {
        const arrayParsed = array.map(row => {
            delete row._id
            row = removeAccents(row)
            return Object.keys(row).map(r => row[r])
        })
        const stringsArray = arrayParsed.map(a => `|${a.join("|")}|\n`)
        return stringsArray.join('')
    }

    return ''
}