
const { Notification } = require('electron');
const { getConnection } = require('./database');

const path = require('path');
const uuid = require('uuid');
var fs = require('fs-extra');
var ncp = require('ncp').ncp;

const imagePath = path.resolve(__dirname, `../uploads_images/${uuid.v5.URL}.jpg`);

const newEmploye = async (trabajador) => {

    try {

        //console.log(trabajador)
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

const seeAllWorkers = async (order,limite) => {

    const conn = await getConnection();
    const resultado = await conn.query(`select t.nombre,t.apellido,t.telefono,t.direccion,t.imagen ,tr.nombre_trabajo from trabajador as t inner join trabajo as tr on t.trabajo = tr.id_trabajo order by t.id_trabajador  ${order}  limit ${limite}`);
    //console.log(resultado)
    return resultado;
}





module.exports = {
    newEmploye,
    seeAllWorkers
}