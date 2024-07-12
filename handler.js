// Importa el módulo AWS SDK
const AWS = require('aws-sdk');
const lambda = new AWS.Lambda();

// Función Lambda
exports.handler = async (evento) => {
    try {
        const cuerpo = JSON.parse(evento.body);
        const { accion } = cuerpo;

        let respuesta;

        switch (accion) {
            case 'obtenerHoraActual':
                respuesta = obtenerHoraActual();
                break;
            default:
                throw new Error('Acción no soportada');
        }

        return {
            statusCode: 200,
            body: JSON.stringify(respuesta),
        };
    } catch (error) {
        return {
            statusCode: 500,
            body: JSON.stringify({ error: error.message }),
        };
    }
};

// Obtener el tiempo actual con un mensaje más dinámico
function obtenerHoraActual() {
    const ahora = new Date();
    const horas = ahora.getHours();
    const minutos = ahora.getMinutes();
    const segundos = ahora.getSeconds();

    let saludo;
    if (horas < 12) {
        saludo = "¡Buenos días!";
    } else if (horas < 18) {
        saludo = "¡Buenas tardes!";
    } else {
        saludo = "¡Buenas noches!";
    }

    return {
        mensaje: `${saludo} La hora actual es ${horas}:${minutos}:${segundos}. ¡Espero que tengas un gran día UWU!`
    };
}
