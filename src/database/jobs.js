const { getConnection } = require('./database');

const getJobs = async (location) => {

    try {
        const conn = await getConnection();
        const result = await conn.query(`
        select tr.nombre_trabajo,tr.salario_maximo,tr.salario_minimo,
        dt.nombre_departamento,dt.cantidad_integrantes, dt.cantidad_total
        from trabajo as tr
        inner join departamento dt 
        on tr.departamento = dt.id_departamento;`);

        return result;

    } catch (error) {
        console.log(error)
    }
}


const insertJob = async (job) => {

    job.salario_maximo = parseInt(job.salario_maximo);
    job.salario_minimo = parseInt(job.salario_minimo);
    job.departamento = parseInt(job.departamento);
    
        try {
            console.log(job)
            const conn = await getConnection();
            const result = await conn.query("INSERT INTO trabajo set ? ", job);
            console.log('insertando correctamente')
            return true;

        } catch (error) {
            return false
            console.log(error)
        }
}



module.exports = {
    getJobs,
    insertJob
}