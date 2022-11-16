const express = require('express');
const { dbConnection} = require('./database/config');
const mysql = require('mysql'); 
const myconnection = require('express-myconnection');


require('dotenv').config();


const app = express();

//Base de datos datos Mongo
dbConnection();

//Base de datos MySql
app.use( myconnection( mysql,{

            host: 'localhost',
            user: 'root',
            password: '',
            port: 3306,
            database: 'sirf'

        } 
    )
);


//Directorio publicoa
app.use( express.static( 'public' ) );

// Lectura y parseo del body
app.use( express.json() );

// Rutas
app.use('/api/auth', require('./routes/auth') );
app.use('/api/events', require('./routes/events') );

app.listen( process.env.PORT , () => { 
    console.log(`Servidor corriendo en puerto ${ process.env.PORT }`)
    
} );