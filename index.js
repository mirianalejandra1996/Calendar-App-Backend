const express = require('express');
const { dbConnection } = require('./database/config');
require('dotenv').config();
const cors = require('cors')

const app = express();

const { swaggerDocs : V1SwaggerDocs } = require('./routes/swagger')

// Base de datos
dbConnection()

app.use(cors())
 
// Directorio Público
app.use( express.static('public') );

// Lectura y parseo del body
app.use( express.json() );

app.use('/api/auth', require('./routes/auth') );
app.use('/api/events', require('./routes/events') );


// Aquí podría colocar mi front
// app.get('*', (req, res) => {
//     res.sendFile(__dirname + '/public/index.html')
// })

// Escuchar peticiones
app.listen( process.env.PORT , () => {
    console.log(`Server is running on port ${process.env.PORT }`);
    V1SwaggerDocs(app, process.env.PORT )
} );
