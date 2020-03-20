const express = require('express');
// const Busboy = require('busboy');

const server = express();

server.use((req, res, next) => {
    const allowedOrigins = ['https://omsorgspengesoknad-mock.nais.oera.no', 'http://localhost:8084'];
    const requestOrigin = req.headers.origin;
    if (allowedOrigins.indexOf(requestOrigin) >= 0) {
        res.set('Access-Control-Allow-Origin', requestOrigin);
    }

    res.removeHeader('X-Powered-By');
    res.set('X-Frame-Options', 'SAMEORIGIN');
    res.set('X-XSS-Protection', '1; mode=block');
    res.set('X-Content-Type-Options', 'nosniff');
    res.set('Access-Control-Allow-Headers', 'content-type');
    res.set('Access-Control-Allow-Credentials', true);
    next();
});

const søkerMock = {
    fornavn: 'Test',
    mellomnavn: undefined,
    etternavn: 'Testesen',
    fødselsnummer: '12345123456',
    myndig: true
};

const startServer = () => {
    const port = process.env.PORT || 8089;

    server.get('/health/isAlive', (req, res) => res.sendStatus(200));
    server.get('/health/isReady', (req, res) => res.sendStatus(200));

    server.get('/soker', (req, res) => {
        res.send(søkerMock);
    });

    server.post('/soknad/overfore-omsorgsdager', (req, res) => {
        const body = req.body;
        console.log('[POST] body', body);
        res.sendStatus(200);
    });

    server.listen(port, () => {
        console.log(`Express mock server listening on port: ${port}`);
        console.log('[GET] /soker');
        console.log('[POST] /soknad/overfore-omsorgsdager');
    });
};

startServer();
