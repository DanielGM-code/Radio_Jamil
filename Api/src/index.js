const express = require("express");
const path = require('path');
const app = express();

app.set('port', process.env.PORT || 2610);

//Middleware
app.use(express.json());

//Routes
app.use(require(path.join(__dirname, 'routes.js')))

//Starting app
app.listen(app.get('port'), () => {
    console.log('Server listening port', app.get('port'))
});