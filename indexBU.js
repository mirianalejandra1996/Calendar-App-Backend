const express = require('express');
const { dbConnection } = require('./database/config');
require('dotenv').config();
const cors = require('cors')

const app = express();

const path = require("path")

// Swagger configuration
const swaggerJSDoc = require("swagger-jsdoc")
const swaggerUi = require("swagger-ui-express")

// Metadata info about our API
// const swaggerSpec = {
//     definition: {
//         openapi: "3.0.0",
//         info: {
//             title: "Calendar App API",
//             version: "1.0.0",
//         }
//     },
//     servers: [
//         {
//             url: `http://localhost:${process.env.PORT}`,
//         }
//     ],
//     apis: [
//         `${path.join(__dirname, "./routes/*.js")}`
//     ]
// }

const swaggerSpec = {
    definition: {
        openapi: "3.0.0",
        info: {
            title: "Calendar App API",
            version: "1.0.0",
        }
    },
    components: {
        securitySchemas: {
            bearerAuth: {
                type: 'http',
                scheme: 'bearer',
                bearerFormat: 'JWT',
            },
        },
    },
    security: [
        {
            bearerAuth: [],
        }
    ],
    servers: [
        {
            url: `http://localhost:${process.env.PORT}`,
        }
    ],
    apis: [
        `${path.join(__dirname, "./routes/*.js")}`
    ]
}

// Base de datos
dbConnection()

app.use(cors())
 
// Directorio Público
app.use( express.static('public') );

// Lectura y parseo del body
app.use( express.json() );

app.use('/api/auth', require('./routes/auth') );
app.use('/api/events', require('./routes/events') );

app.use('/api-doc', swaggerUi.serve, swaggerUi.setup(swaggerJSDoc(swaggerSpec)))

app.get('*', (req, res) => {
    res.sendFile(__dirname + '/public/index.html')
})


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