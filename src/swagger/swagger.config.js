import swaggerJsdoc from 'swagger-jsdoc';

const opcionesSwagger = {
    definition: {
        openapi: '3.0.0',
        info: {
            title: 'API de Clínica Médica - UNER 2026',
            version: '1.0.0',
            description: 'Documentación de la API para el Trabajo Final Integrador',
        },
        servers: [{
            url: 'http://localhost:3000/api/v1',
            description: 'Servidor Local'
        }],
        components: {
            securitySchemes: {
                BearerAuth: {
                    type: 'http',
                    scheme: 'bearer',
                    bearerFormat: 'JWT',
                    description: 'Ingresá el token obtenido en el login para operar en rutas protegidas.'
                }
            }
        }
    },
    apis: ["./src/swagger/*.yml"]
};

export const especificacionesSwagger = swaggerJsdoc(opcionesSwagger);