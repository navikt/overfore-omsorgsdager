const path = require('path');
const process = require('process');
const express = require('express');
const mustacheExpress = require('mustache-express');
const Promise = require('promise');
const compression = require('compression');
const helmet = require('helmet');
const createEnvSettingsFile = require('./src/build/scripts/envSettings');

createEnvSettingsFile(path.resolve(`${__dirname}/dist/js/settings.js`));

const server = express();

server.use(helmet());
server.use(compression());
server.set('views', `${__dirname}/dist`);
server.set('view engine', 'mustache');
server.engine('html', mustacheExpress());

const renderApp = () =>
    new Promise((resolve, reject) => {
        server.render('dev/index.html', (err, html) => {
            if (err) {
                reject(err);
            } else {
                resolve(html);
            }
        });
    });

const startServer = (html) => {
    const PUBLIC_PATH = process.env.PUBLIC_PATH || '/familie/sykdom-i-familien/soknad/overfore-omsorgsdager';

    server.use(`${PUBLIC_PATH}/dist/js`, express.static(path.resolve(__dirname, 'dist/js')));
    server.use(`${PUBLIC_PATH}/dist/css`, express.static(path.resolve(__dirname, 'dist/css')));
    server.get(`${PUBLIC_PATH}/health/isAlive`, (req, res) => res.sendStatus(200));
    server.get(`${PUBLIC_PATH}/health/isReady`, (req, res) => res.sendStatus(200));

    server.get(/^\/(?!.*dist).*$/, (req, res) => {
        res.send(html);
    });

    const port = process.env.PORT || 8084;
    console.log('PUBLIC_PATH', PUBLIC_PATH);
    server.listen(port, () => {
        console.log(`Server-test Web App listening on port: ${port}`);
    });
};

const startExpressWebServer = async () => {
    if (!process.env.API_URL) {
        console.error('API_URL env var must be defined!');
        process.exit(1);
    }
    try {
        const html = await renderApp();
        startServer(html);
    }
    catch (e) {
        console.error(e);
    }
};

startExpressWebServer();