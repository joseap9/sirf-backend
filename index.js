const express = require('express');
const mysql = require('mysql'); 
const myconnection = require('express-myconnection');
const cors = require('cors');

require('dotenv').config();


const app = express();


app.use(cors());

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


//Directorio publico
app.use( express.static( 'public' ) );

// Lectura y parseo del body
app.use( express.json() );

// Rutas
/* app.use('/api/auth', require('./routes/auth') ); */

app.use('/api/events', require('./routes/eventosProfesor') );

app.listen( process.env.PORT , () => { 
    console.log(`Servidor corriendo en puerto ${ process.env.PORT }`)
    
} );
