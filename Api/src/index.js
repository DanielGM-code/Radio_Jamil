const express = require('express');
const path = require('path');

const app = express();

app.set('port', process.env.PORT || 2610);

//Middleware
app.use(express.json());

//Routes
const routes = path.join(__dirname, '/routes')
// app.use(require(path.join(routes, 'login.js')))
// app.use(require(path.join(routes, 'users.js')))
app.use(require(path.join(routes, 'usersOld.js')))
app.use(require(path.join(routes, 'canciones.js')))

//Starting app
app.listen(app.get('port'), () => {
    console.log('Server listening port', app.get('port'))
});