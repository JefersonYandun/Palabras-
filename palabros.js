// Importa el módulo AWS SDK
const AWS = require('aws-sdk');
const lambda = new AWS.Lambda();

// Función Lambda
exports.handler = async (event) => {
    try {
        const body = JSON.parse(event.body);
        const { action } = body;

        let response;

        switch (action) {
            case 'getCurrentTime':
                response = getCurrentTime();
                break;
            default:
                throw new Error('Acción no soportada');
        }

        return {
            statusCode: 200,
            body: JSON.stringify(response),
        };
    } catch (error) {
        return {
            statusCode: 500,
            body: JSON.stringify({ error: error.message }),
        };
    }
};

// Obtener el tiempo actual
function getCurrentTime() {
    const now = new Date();
    return {
        statusCode: 200,
        body: JSON.stringify({ currentTime: now.toISOString() }),
    };
}

