// test.js
const { handler } = require('./handler');

const eventoDePrueba = {
    body: JSON.stringify({
        accion: 'obtenerHoraActual'
    })
};

handler(eventoDePrueba).then(respuesta => {
    console.log('Respuesta:', respuesta);
}).catch(error => {
    console.error('Error:', error);
});
