// Importa el módulo AWS SDK
const AWS = require('aws-sdk');
const lambda = new AWS.Lambda();

// Función lambda que realiza múltiples tareas
exports.handler = async (event) => {
  try {
    // Analiza el cuerpo de la solicitud
    const { operation, input } = JSON.parse(event.body);
    let result;

    switch(operation) {
      case 'currentTime':
        result = getCurrentTime();
        break;
      case 'reverseString':
        result = reverseString(input);
        break;
      case 'contarPalabras':
        result = contarPalabras(input);
        break;
      case 'convertNumber':
        const { number, fromBase, toBase } = input;
        result = convertNumber(number, fromBase, toBase);
        break;
      default:
        throw new Error('Operación no soportada');
    }

    return {
      statusCode: 200,
      body: JSON.stringify({ result }),
    };
  } catch (error) {
    return {
      statusCode: 500,
      body: JSON.stringify({ error: error.message }),
    };
  }
};

// Función para obtener la fecha y hora actual
function getCurrentTime() {
  return new Date().toISOString();
}

// Función para invertir una cadena
function reverseString(str) {
  return str.split('').reverse().join('');
}

// Función para contar las palabras en un texto
function contarPalabras(text) {
  return text.split(/\s+/).filter(word => word.length > 0).length;
}

// Función para convertir números entre diferentes sistemas de numeración
function convertNumber(number, fromBase, toBase) {
  return parseInt(number, fromBase).toString(toBase);
}
