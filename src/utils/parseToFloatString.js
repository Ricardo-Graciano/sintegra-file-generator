module.exports = (number, qtdDecimals) => {
    return parseFloat(number).toFixed(qtdDecimals).replace('.', ',')
}