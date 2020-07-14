
const { getConnection } = require('./database');

const getDepartaments = async (location) => {

    try {
        const conn = await getConnection();
        const result = await conn.query('call obtenerDepartamentos()');

        return result[0];

    } catch (error) {
        console.log(error)
    }
}

const getDeparmentLocacion = async () => {

    try {
        const conn = await getConnection();
        const result = await conn.query(`
        call ObtenerDepartamentosPorLocacion();`);
        
        return result[0];

    } catch (error) {
        console.log(error)
    }
}
const insertNewDepartament = async (departament) => {
    departament.cantidad_integrantes = 0;
    console.log(departament)
    try {
        const conn = await getConnection();
        const result = await conn.query("INSERT into departamento SET ?", departament);
        return true;

    } catch (error) {
        console.log(error)
        return false;
    }
}


module.exports = {
    getDepartaments,
    getDeparmentLocacion,
    insertNewDepartament
}