const express = require('express');
const path = require('path');
const app = express();
const http = require('http');

//вот без этой строчки стили и скрипты не рендерились
app.use(express.static(__dirname + "/dist"));

app.use('/', (req, res) => {
    res.sendFile(`${__dirname}/dist/index.html`);
});

app.listen(7550, () => {
	
    console.log('Application listening on port 7550!');
});