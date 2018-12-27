const express = require('express');
const serveStatic = require('serve-static');

const app = express();

app.use(serveStatic(__dirname + '/public'));

const port = process.env.PORT || 3000;
app.listen(port, () => {
    console.log('Server Listening on port: ', port);
})