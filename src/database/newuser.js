
var bcrypt = require('bcryptjs');
var salt = bcrypt.genSaltSync(10);

const { Notification } = require('electron');
const { getConnection } = require('./database');



const insertNewUser = async (user) => {

    let salt = bcrypt.genSaltSync(10);
    let encrypt = bcrypt.hashSync(user.password, salt);
    user.password = encrypt;

    try {
        const conn = await getConnection();
        await conn.query("insert into usuario set ? ", user);
        return true
    } catch (error) {
        console.log(error)
        return false
    }



}

const comparePassword = async (user) => {

    const conn = await getConnection();
    const result = await conn.query("select * from  usuario where nombre_usuario = ? ", user.nombre_usuario);

    if (result.length !== 0) {
        if (bcrypt.compareSync(user.password, result[0].password)) {
            return true;
        } else {
            // console.log('error de contraseña')
            return false;
        }
    } else {
        //console.log('el usuario no existe');
        return false;
    }

}

const systemUsers = async () => {

    const conn = await getConnection();
    try {
        const result = await conn.query("call obtenerUsuariosSistema();");
        return result[0];
    } catch (error) {
        console.log(object)
    }

}

module.exports = {
    insertNewUser, comparePassword, systemUsers
}