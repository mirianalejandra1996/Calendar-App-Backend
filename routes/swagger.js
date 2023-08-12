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
        "Sample Calendar Server based on the OpenAPI 3.0 specification. This is a solo project designed to provide a practical example of API implementation. You can explore more about Swagger at [https://swagger.io](https://swagger.io).\nYou're welcome to contribute to the improvement of this API, whether it involves refining the definition itself or making changes to the code. Over time, we can enhance the API as a whole and showcase new features in OAS3._\n\nSome useful links:\n- [The Calendar App Backend repository](https://github.com/mirianalejandra1996/Calendar-backend)\n- [The Calendar App Frontend repository](https://github.com/mirianalejandra1996/Calendar-App-Frontend)",
      contact: {
        email: "mirianalejandra1996@gmail.com",
      },
    },
    servers: [
      {
        url: "https://mern-calendar-backend-k4kt.onrender.com/api",
      },
      {
        url: "http://localhost:4000/api",
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
            required: ["name", "email", "password"], // Propiedades obligatorias
            properties: {
              uid: {
                type: "integer",
                format: "int64",
                example: "5fba80ac...",
                description: "The ID of the user.",
              },
              name: {
                type: "string",
                example: "John Doe",
                description: "The name of the user.",
              },
              email: {
                type: "string",
                example: "johndoe@example.com",
                description: "The email of the user.",
              },
              password: {
                type: "string",
                example: "password123",
                description: "The password of the user.",
              },
            },
          },
          Event: {
            type: "object",
            required: ["title", "notes", "start", "end"], // Propiedades obligatorias
            properties: {
              // id: {
              //   type: "string",
              //   description: "The ID of the event."
              // },
              title: {
                type: "string",
                description: "The title of the event."
              },
              notes: {
                type: "string",
                description: "Additional notes for the event."
              },
              start: {
                type: "string",
                format: "date-time",
                description: "The start date and time of the event."
              },
              end: {
                type: "string",
                format: "date-time",
                description: "The end date and time of the event."
              },
              // user: {
              //   type: "object",
              //   properties: {
              //     _id: {
              //       type: "integer",
              //       format: "int64",
              //       example: "5fba80ac..."
              //     },
              //     name: {
              //       type: "string",
              //       example: "John Doe"
              //     },
              //     },
              // },
              // user: {
              //   "$ref": "#/components/schemas/User"
              // }
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
