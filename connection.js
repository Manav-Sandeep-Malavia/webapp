const Sequelize = require('sequelize')
require('dotenv').config()
const mariadb = require("mariadb");

const sequelize = new Sequelize(process.env.DB_NAME,process.env.DB_USER, process.env.DB_PASSWORD, {
    host: process.env.DB_HOST,
    logging: false,
    dialect: process.env.DIALECT,
});

const pool =mariadb.createPool({
    host: process.env.DB_HOST,
    user: process.env.DB_USER,
    password: process.env.DB_PASSWORD
})
async function dbconnect() {
    
       await pool.getConnection().then((connection) =>{
        connection.query(`CREATE DATABASE IF NOT EXISTS\`${process.env.DB_NAME}\`;`)
      });
    
   
    const User = require('./models/user')

    const Assignment = require('./models/assignments.js')
    
    const fkeyid =require("./foreignkey.js")

    await sequelize.sync();


};
 
dbconnect()

const conn = () =>{
    return sequelize
    .authenticate()
    .then(() => {
        return true;
    })
    .catch(() => {
        return false;
    });


}

module.exports = { 
    sequelize:sequelize,
    dbconnect:dbconnect,
    conn:conn

}