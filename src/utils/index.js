const calculateAlgarisms = (num, qtd) => {
    let number = Number(num.replace(",", ".")).toFixed(qtd)
    return String(number).replace(".", "")
}

module.exports = {

    toFile10: (emp) => {
        let str = "10"
        str += String(emp.cnpj).slice(0, 14)
        str += String(emp.ie).slice(0, 14).padEnd(14, " ")
        str += String(emp.razao_social).slice(0, 35).padEnd(35, " ")
        str += String(emp.mun).slice(0, 30).padEnd(30, " ")
        str += emp.uf.slice(0, 2)
        str += String(emp.fax).slice(0, 10).padEnd(10, "0")
        str += emp.dhIni
        str += emp.dhFin
        str += "331"
        str += "\r\n"

        return str
    },

    toFile11: (emp) => {
        let str = "11"
        str += String(emp.log).slice(0, 34).padEnd(34, " ")
        str += String(emp.num).slice(0, 5).padStart(5, "0")
        str += String(emp.comp).slice(0, 22).padEnd(22, " ")
        str += String(emp.bairro).slice(0, 15).padEnd(15, " ")
        str += emp.cep.slice(0, 8)
        str += String(emp.nome_cont).slice(0, 28).padEnd(28, " ")
        str += String(emp.tel).slice(0, 12).padStart(12, "0")
        str += "\r\n"

        return str
    },

    toFile74: (emp, items) => {
        //emp.dhRealizacao = (emp.dhRealizacao) ? emp.dhRealizacao : new Date().toISOString().substring(0, 10).replace(/-/gm, '')

        let strs = items.map(row => {
            let str = ""
            str += "74"
            str += emp.dhFin
            str += String(row.cod).slice(0, 14).padStart(6, "0").padEnd(14, " ")
            str += String(calculateAlgarisms(row.qCom, 3)).padStart(13, "0")
            str += String(calculateAlgarisms(row.vProd, 2)).padStart(13, "0")
            str += "1"
            str += String("0").padEnd(14, "0")

            str = String(str).padEnd(126, " ")
            str += "\r\n"
            return str
        });

        return strs.join("")
    },

    toFile75: (emp, items) => {
        let strs = items.map(row => {
            let str = ""
            str += "75";
            str += emp.dhIni;
            str += emp.dhFin;
            str += String(row.cod).slice(0, 14).padStart(6, "0").padEnd(14, " ")
            str += String(row.ncm).slice(0, 8).padStart(8, "0");
            str += String(row.xProd).slice(0, 53).padEnd(53, " ");
            str += String(row.uCom).slice(0, 6).padEnd(6, " ");

            str = String(str).slice(0, 126).padEnd(126, "0");
            str += "\r\n"
            return str
        })
        return strs.join("");
    },

    toFile90: (emp, qtdItems) => {
        let str = "90";

        str += emp.cnpj
        str += String(emp.ie).padEnd(14, " ")
        str += "74" + String(qtdItems).padStart(8, "0")
        str += "75" + String(qtdItems).padStart(8, "0")
        str = String(str).padEnd(125, " ") + "1" + "\r\n"

        return str
    }
}