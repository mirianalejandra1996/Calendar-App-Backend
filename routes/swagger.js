const path = require("path");

const swaggerJSDoc = require("swagger-jsdoc");
const swaggerUi = require("swagger-ui-express");

// Metadata info about our API
const options = {
  definition: {
    openapi: "3.0.0",
    info: {
      title: "Calendar App API",
      version: "1.0.0",
      description:
        "This is a sample Calendar Server based on the OpenAPI 3.0 specification.  You can find out more about\nSwagger at [https://swagger.io](https://swagger.io).\nYou can now help us improve the API whether it's by making changes to the definition itself or to the code.\nThat way, with time, we can improve the API in general, and expose some of the new features in OAS3.",
      contact: {
        email: "mirianalejandra1996@gmail.com",
      },
    },
    servers: [
      {
        url: "http://localhost:4000/api",
      },
      {
        url: "https://mern-calendar-backend-k4kt.onrender.com/api",
      },
    ],
    tags: [
        {
            "name": "User",
            "description": "Operations about user",
          },
        {
          "name": "Event",
          "description": "Everything about Events",
        },
      ],
      components: {
        schemas: {
          User: {
            type: "object",
            properties: {
            //   uid: {
            //     type: "integer",
            //     format: "int64",
            //     example: 10
            //   },
              name: {
                type: "string",
                example: "John"
              },
              email: {
                type: "string",
                example: "johndoe@example.com"
              },
              password: {
                type: "string",
                example: "password123"
              },
            },
          },
          "ApiResponse": {
            "type": "object",
            "properties": {
              "code": {
                "type": "integer",
                "format": "int32"
              },
              "type": {
                "type": "string"
              },
              "message": {
                "type": "string"
              }
            },
            "xml": {
              "name": "##default"
            }
          },
          UserResponse: {
            type: "object",
            properties: {
              ok: {
                type: "boolean",
                example: true,
              },
              uid: {
                type: "string",
                example: "12345",
              },
              name: {
                type: "string",
                example: "John Doe",
              },
              token: {
                type: "string",
                example: "eyJhbGciOiJIUzI1NiIsIn...",
              },
            },
          },
        },
        "requestBodies": {
          "Pet": {
            "description": "Pet object that needs to be added to the store",
            "content": {
              "application/json": {
                "schema": {
                  "$ref": "#/components/schemas/Pet"
                }
              },
              "application/xml": {
                "schema": {
                  "$ref": "#/components/schemas/Pet"
                }
              }
            }
          },
          "UserArray": {
            "description": "List of user object",
            "content": {
              "application/json": {
                "schema": {
                  "type": "array",
                  "items": {
                    "$ref": "#/components/schemas/User"
                  }
                }
              }
            }
          }
        },
        securitySchemes: {
          "x-token": {
            "type": "apiKey",
            "name": "x-token",
            "in": "header"
          }
        }
      }
  },
  apis: [`${path.join(__dirname, "./*.js")}`],
};


// Docs en JSON format
const swaggerSpec = swaggerJSDoc(options);

const swaggerDocs = (app, port) => {
  app.use("/api-doc", swaggerUi.serve, swaggerUi.setup(swaggerSpec));
  app.set("/api-doc.json", (req, res) => {
    res.setHeader("Content-Type", "application/json");
    res.send(swaggerSpec);
  });

  console.log(
    `Version 1 Docs are available at http://localhost:${port}/api-doc`
  );
};

// module.exports = { swaggerDocs }
module.exports = { swaggerDocs, swaggerUi, swaggerSpec };
