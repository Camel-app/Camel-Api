export const options = {
    definition: {
      openapi: "3.1.0",
      info: {
        title: "Camel API with Swagger",
        version: "0.1.0",
        description:
          "Simple API interface and documentation for the Camel Api",
        license: {
          name: "MIT",
          url: "https://spdx.org/licenses/MIT.html",
        },
        contact: {
          name: "Camel",
          url: "https://drawmymind.com",
          email: "[email protected]",
        },
      },
      servers: [
        {
          url: "http://localhost:3001",
        },
      ],
    },
    apis: ["./routes/participants/*.ts"],
  };