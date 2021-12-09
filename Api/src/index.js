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
app.use(require(path.join(routes, 'cancion.js')))
app.use(require(path.join(routes, 'artista.js')))
app.use(require(path.join(routes, 'categoria.js')))
app.use(require(path.join(routes, 'genero.js')))
app.use(require(path.join(routes, 'horario.js')))
app.use(require(path.join(routes, 'patron.js')))
app.use(require(path.join(routes, 'programa.js')))
// app.use(require(path.join(routes, 'patron.js')))
// app.use(require(path.join(routes, 'programacion.js')))

//Starting app
app.listen(app.get('port'), () => {
    console.log('Server listening port', app.get('port'))
});