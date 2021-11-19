const express = require('express');
const path = require('path');
const cors = require('cors');

const app = express();

app.set('port', process.env.PORT || 2610);

//Middleware
app.use(express.json());
app.use(cors());

//Routes
const routes = path.join(__dirname, '/routes')
// app.use(require(path.join(routes, 'login.js')))
app.use(require(path.join(routes, 'canciones.js')))
app.use(require(path.join(routes, 'patrones.js')))
app.use(require(path.join(routes, 'programaciones.js')))

//Starting app
app.listen(app.get('port'), () => {
    console.log('Server listening port', app.get('port'))
});