
const { Notification } = require('electron');
const { getConnection } = require('./database');


const newEmploye = async (trabajador, id_departamento) => {

    
    try {
        const conn = await getConnection();
        //? convirtiendo a decimal
        const resultado = await conn.query("INSERT INTO trabajador set ? ", trabajador)

        await conn.query("call ocuparDepartamento(?)", id_departamento);

        new Notification({

            title: 'Nuevo Empleado agreado',
            body: `Acabas de registrar ${trabajador.nombre} ${trabajador.apellido}`,

        }).show()


    } catch (error) {
        console.log(error)
    }
}

const seeAllWorkers = async (order, limite) => {
    limite = parseInt(limite);
    const conn = await getConnection();
    const resultado = await conn.query(`select t.nombre,t.apellido,t.telefono,t.direccion,t.imagen ,tr.nombre_trabajo from trabajador as t inner join trabajo as tr on t.trabajo = tr.id_trabajo order by t.id_trabajador  ${order}  limit ? `, limite);
    //console.log(resultado)
    return resultado;
}

const getJobs = async () => {
    const conn = await getConnection();
    const result = await conn.query('call obtenerTrabajos();');
    return result[0];
}
const getWorkersPerJob = async (nombre_trabajo) => {
    const conn = await getConnection();

    const result = await conn.query('call obtenerTrabajadoresPorTrabajo(?)', nombre_trabajo);
    //console.log(query)
    return result[0];
}
const getSalaries = async () => {
    const conn = await getConnection();
    try {
        const result = await conn.query('call obtenerSalarios();');
        return result[0];
    } catch (error) {
        console.log(error)
    }
}

const getAllJobs = async () => {
    const conn = await getConnection();
    try {
        const result = await conn.query("call obtenerLosTrabajosID();");
        return result[0];
    } catch (error) {
        console.log(error)
    }
}
const insertNewUser = async (user) => {
    try {
        const conn = await getConnection();
        const result = await conn.query("insert into usuario set ? ", user);
        //console.log('se inserto un nuevo usuario')
        return true;
    } catch (error) {
        console.log(error)
        return false
    }
}

module.exports = {
    newEmploye,
    seeAllWorkers,
    getJobs,
    getWorkersPerJob,
    getAllJobs,
    getSalaries,
    insertNewUser
}