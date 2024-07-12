const express = require('express');
const bodyParser = require('body-parser');
const { handler } = require('./handler');

const app = express();
app.use(bodyParser.json());

app.post('/lambda', async (req, res) => {
    const evento = {
        body: JSON.stringify(req.body)
    };
    
    try {
        const respuesta = await handler(evento);
        res.status(respuesta.statusCode).send(respuesta.body);
    } catch (error) {
        res.status(500).send({ error: error.message });
    }
});

const PUERTO = 3000;
app.listen(PUERTO, () => {
    console.log(`El servidor está corriendo en el puerto ${PUERTO}`);
});
