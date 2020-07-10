
const { getConnection } = require('./database');

const getDepartaments = async (location) => {

    try {
        const conn = await getConnection();
        const result = await conn.query(`select * from departamento`);

        return result;

    } catch (error) {
        console.log(error)
    }
}

const getDeparmentLocacion = async () => {

    try {
        const conn = await getConnection();
        const result = await conn.query(`
        select dp.id_departamento,dp.nombre_departamento,dp.cantidad_integrantes,dp.cantidad_total,
        lc.direccion
        from departamento as dp 
        inner join locacion lc ON 
        dp.locacion = lc.id_locacion;`);

        return result;

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