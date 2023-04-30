const express = require('express');
const { dbConnection } = require('./database/config');
require('dotenv').config();
const cors = require('cors')

const app = express();

// Base de datos
dbConnection()

app.use(cors())
 
// Directorio Público
app.use( express.static('public') );

// Lectura y parseo del body
app.use( express.json() );

app.use('/api/auth', require('./routes/auth') );
app.use('/api/events', require('./routes/events') );

// Escuchar peticiones
app.listen( process.env.PORT , () => {
    console.log(`Server is running on port ${process.env.PORT }`);
} );

// Directorio Público
// "use" es conocido como un middleware
// un "middleware" es una función que se ejecuta en el momento en el que alguien
// hace una petición a mi servidor
// app.use( express.static('public') )

// Rutas
// app.use( express.static('public'));