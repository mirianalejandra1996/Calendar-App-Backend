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
        url: "http://localhost:4000",
      },
      {
        url: "https://mern-calendar-backend-k4kt.onrender.com/",
      },
    ],
    // name: {
    //     type: String,
    //     require: true,
    // },
    // email: {
    //     type: String,
    //     require: true,
    //     unique: true,
    // },
    // password: {
    //     type: String,
    //     require: true,
    // },
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
      "components": {
        "schemas": {
          "Order": {
            "type": "object",
            "properties": {
              "id": {
                "type": "integer",
                "format": "int64",
                "example": 10
              },
              "petId": {
                "type": "integer",
                "format": "int64",
                "example": 198772
              },
              "quantity": {
                "type": "integer",
                "format": "int32",
                "example": 7
              },
              "shipDate": {
                "type": "string",
                "format": "date-time"
              },
              "status": {
                "type": "string",
                "description": "Order Status",
                "example": "approved",
                "enum": [
                  "placed",
                  "approved",
                  "delivered"
                ]
              },
              "complete": {
                "type": "boolean"
              }
            },
            "xml": {
              "name": "order"
            }
          },
          "Customer": {
            "type": "object",
            "properties": {
              "id": {
                "type": "integer",
                "format": "int64",
                "example": 100000
              },
              "username": {
                "type": "string",
                "example": "fehguy"
              },
              "address": {
                "type": "array",
                "xml": {
                  "name": "addresses",
                  "wrapped": true
                },
                "items": {
                  "$ref": "#/components/schemas/Address"
                }
              }
            },
            "xml": {
              "name": "customer"
            }
          },
          "Address": {
            "type": "object",
            "properties": {
              "street": {
                "type": "string",
                "example": "437 Lytton"
              },
              "city": {
                "type": "string",
                "example": "Palo Alto"
              },
              "state": {
                "type": "string",
                "example": "CA"
              },
              "zip": {
                "type": "string",
                "example": "94301"
              }
            },
            "xml": {
              "name": "address"
            }
          },
          "Category": {
            "type": "object",
            "properties": {
              "id": {
                "type": "integer",
                "format": "int64",
                "example": 1
              },
              "name": {
                "type": "string",
                "example": "Dogs"
              }
            },
            "xml": {
              "name": "category"
            }
          },
          "User": {
            "type": "object",
            "properties": {
              "id": {
                "type": "integer",
                "format": "int64",
                "example": 10
              },
              "username": {
                "type": "string",
                "example": "theUser"
              },
              "firstName": {
                "type": "string",
                "example": "John"
              },
              "lastName": {
                "type": "string",
                "example": "James"
              },
              "email": {
                "type": "string",
                "example": "john@email.com"
              },
              "password": {
                "type": "string",
                "example": "12345"
              },
              "phone": {
                "type": "string",
                "example": "12345"
              },
              "userStatus": {
                "type": "integer",
                "description": "User Status",
                "format": "int32",
                "example": 1
              }
            },
            "xml": {
              "name": "user"
            }
          },
          "Tag": {
            "type": "object",
            "properties": {
              "id": {
                "type": "integer",
                "format": "int64"
              },
              "name": {
                "type": "string"
              }
            },
            "xml": {
              "name": "tag"
            }
          },
          "Pet": {
            "required": [
              "name",
              "photoUrls"
            ],
            "type": "object",
            "properties": {
              "id": {
                "type": "integer",
                "format": "int64",
                "example": 10
              },
              "name": {
                "type": "string",
                "example": "doggie"
              },
              "category": {
                "$ref": "#/components/schemas/Category"
              },
              "photoUrls": {
                "type": "array",
                "xml": {
                  "wrapped": true
                },
                "items": {
                  "type": "string",
                  "xml": {
                    "name": "photoUrl"
                  }
                }
              },
              "tags": {
                "type": "array",
                "xml": {
                  "wrapped": true
                },
                "items": {
                  "$ref": "#/components/schemas/Tag"
                }
              },
              "status": {
                "type": "string",
                "description": "pet status in the store",
                "enum": [
                  "available",
                  "pending",
                  "sold"
                ]
              }
            },
            "xml": {
              "name": "pet"
            }
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
          }
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

// const options = {
//     "openapi": "3.0.3",
//   "info": {
//     "title": "Swagger Petstore - OpenAPI 3.0",
//     "description": "This is a sample Pet Store Server based on the OpenAPI 3.0 specification.  You can find out more about\nSwagger at [https://swagger.io](https://swagger.io). In the third iteration of the pet store, we've switched to the design first approach!\nYou can now help us improve the API whether it's by making changes to the definition itself or to the code.\nThat way, with time, we can improve the API in general, and expose some of the new features in OAS3.\n\n_If you're looking for the Swagger 2.0/OAS 2.0 version of Petstore, then click [here](https://editor.swagger.io/?url=https://petstore.swagger.io/v2/swagger.yaml). Alternatively, you can load via the `Edit > Load Petstore OAS 2.0` menu option!_\n\nSome useful links:\n- [The Pet Store repository](https://github.com/swagger-api/swagger-petstore)\n- [The source API definition for the Pet Store](https://github.com/swagger-api/swagger-petstore/blob/master/src/main/resources/openapi.yaml)",
//     "termsOfService": "http://swagger.io/terms/",
//     "contact": {
//       "email": "apiteam@swagger.io"
//     },
//     "license": {
//       "name": "Apache 2.0",
//       "url": "http://www.apache.org/licenses/LICENSE-2.0.html"
//     },
//     "version": "1.0.11"
//   },
//   "externalDocs": {
//     "description": "Find out more about Swagger",
//     "url": "http://swagger.io"
//   },
//   "servers": [
//     {
//       "url": "https://petstore3.swagger.io/api/v3"
//     }
//   ],
//   "tags": [
//     {
//       "name": "pet",
//       "description": "Everything about your Pets",
//       "externalDocs": {
//         "description": "Find out more",
//         "url": "http://swagger.io"
//       }
//     },
//     {
//       "name": "store",
//       "description": "Access to Petstore orders",
//       "externalDocs": {
//         "description": "Find out more about our store",
//         "url": "http://swagger.io"
//       }
//     },
//     {
//       "name": "user",
//       "description": "Operations about user"
//     }
//   ],
// }

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
