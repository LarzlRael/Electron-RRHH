const { getConnection } = require('./database');

const insertNewLocation = async (location) => {

    try {
        const conn = await getConnection();
        const result = await conn.query("insert into locacion set ? ", location);
        return true;
    } catch (error) {
        console.log(error)
        return false;
    }
}
const getLocations = async () => {

    try {
        const conn = await getConnection();
        const result = await conn.query("call obtenerLocaciones()");

        return result[0];
    } catch (error) {
        console.log(error)
    }
}
const getLocationForId = async (id_location) => {

    try {
        const conn = await getConnection();
        const result = await conn.query("call obtenerLocacionPorId(?)", id_location);

        console.log(result)
        return result[0];

    } catch (error) {
        console.log(error)
    }
}
const updateLocation = async (location, id_location) => {
    id_location = parseInt(id_location)
    try {
        const conn = await getConnection();
        const result = await conn.query("UPDATE locacion SET ?   WHERE id_locacion  = ? ", [location, id_location]);

        console.log('location actualizada correctamente')


    } catch (error) {
        console.log(error)
    }
}
const deleteLocation = async (id_location) => {
    id_location = parseInt(id_location)
    try {
        const conn = await getConnection();
        const result = await conn.query("eliminarLocacion(?)", id_location);
        console.log('Elimnado correctameno')
        return true
    } catch (error) {
        console.log(error)
        return false;
    }
}

module.exports = {
    insertNewLocation,
    getLocations,
    getLocationForId,
    updateLocation,
    deleteLocation
}