const mongoose = require('mongoose');
/* const mysql = require('mysql');  */

const dbConnection = async() => {

    try {
        await mongoose.connect( process.env.DATABASE_CONNECT);
        console.log('db online');

    }catch(error){
        console.log(error);

    }

}

/* const mysqlcon = async() => {
    try {
        await mysql.createConnection({
            host: 'us-cdbr-east-06.cleardb.net',
            user: 'b7bdb045f6d405',
            password: '5ee43327',
            database: 'heroku_d75ad17acf32e8d'
        })
        console.log('mysql online');

    }catch(error){
        console.log(error);
    }
} */
 

module.exports = {
    dbConnection
}