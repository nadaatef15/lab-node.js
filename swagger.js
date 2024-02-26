const swaggerJsdoc = require('swagger-jsdoc');

const options = {
    swaggerDefinition: {
        info: {
            title: 'Nursery API',
            version: '1.0.0',
            description: 'This API consists of teachers, children and classes',
        },
        basePath: '/', // Base path of your API
    },
  apis: ['./Routers/*.js'], // Path to the API endpoint files
};

const swaggerSpec = swaggerJsdoc(options);

module.exports = swaggerSpec;
