require('dotenv').config();
const mustacheExpress = require('mustache-express');
var path = require('path');

/* Start */

const configureDevServer = (decoratorFragments) => ({
    before: (app) => {
        app.engine('html', mustacheExpress());
        app.set('views', `${__dirname}/../../../dist/dev`);
        app.set('view engine', 'mustache');
        app.get('/dist/js/settings.js', (req, res) => {
            res.sendFile(path.resolve(`${__dirname}/../../../dist/js/settings.js`));
        });
        app.get(`${process.env.PUBLIC_PATH}/dist/js/settings.js`, (req, res) => {
            res.sendFile(path.resolve(`${__dirname}/../../../dist/js/settings.js`));
        });
        app.get(/^\/(?!.*dist).*$/, (req, res) => {
            res.render('index.html', Object.assign(decoratorFragments));
        });
    },
    watchContentBase: true,
    quiet: false,
    noInfo: false,
    stats: 'minimal',
    publicPath: `${process.env.PUBLIC_PATH}/dist`
});

module.exports = configureDevServer;
