
const { Notification } = require('electron');
const { getConnection } = require('./database');


const newEmploye = async (trabajador) => {

    try {

        console.log(trabajador)
        const conn = await getConnection();
        //? convirtiendo a decimal

        const resultado = await conn.query("INSERT INTO trabajador set ? ", trabajador)
        new Notification({
            title: 'Nuevo Empleado agreado',
            body: `Acabas de registrar ${trabajador.nombre} ${trabajador.apellido}`,

        }).show()


    } catch (error) {
        console.log(error)
    }
}

const seeAllWorkers = async (order, limite) => {

    const conn = await getConnection();
    const resultado = await conn.query(`select t.nombre,t.apellido,t.telefono,t.direccion,t.imagen ,tr.nombre_trabajo from trabajador as t inner join trabajo as tr on t.trabajo = tr.id_trabajo order by t.id_trabajador  ${order}  limit ${limite}`);
    //console.log(resultado)
    return resultado;
}

const getJobs = async () => {
    const conn = await getConnection();
    const result = await conn.query(`
    select tr.id_trabajo,tr.nombre_trabajo,dt.nombre_departamento,dt.cantidad_integrantes from trabajo as tr inner join  departamento as dt on tr.departamento = dt.id_departamento;`);
    return result;
}
const getWorkersPerJob = async (nombre_trabajo) => {
    const conn = await getConnection();
    const query = `select tr.nombre,tr.apellido,tr.telefono,tr.direccion,tr.imagen,tr.salario,trb.nombre_trabajo  from 
    trabajador as tr
    inner join trabajo as trb
    On tr.trabajo  = trb.id_trabajo
    and trb.nombre_trabajo="${nombre_trabajo}"`;

    const result = await conn.query(query);
    //console.log(query)
    return result;
}
const getSalaries = async () => {
    const conn = await getConnection();
    const query = `select nombre_trabajo,
    salario_minimo,salario_maximo 
    from trabajo;`;

    const result = await conn.query(query);
    //console.log(query)
    return result;
}

const getAllJobs = async () => {
    const conn = await getConnection();
    const result = await conn.query("select id_trabajo ,nombre_trabajo from trabajo;");
    return result;
}



module.exports = {
    newEmploye,
    seeAllWorkers,
    getJobs,
    getWorkersPerJob,
    getAllJobs,
    getSalaries
}