const removeAccents = (data) => {
    if (typeof word === 'string')
        return word.normalize('NFD').replace(/[\u0300-\u036f]/g, "");

    switch (typeof data) {
        case 'string':
            return data.normalize('NFD').replace(/[\u0300-\u036f]/g, "");
        case 'object':
            if (Array.isArray(data))
                data = data.map(d => removeAccents(d))
            else
                Object.keys(data).forEach(d => data[d] = removeAccents(data[d]))


        default:
            return data
    }
}

module.exports = { removeAccents }