import express from 'express';
import path from 'path';

const app = express();
const port = 3000;

const __dirname = path.resolve()

const usuarios = [
    'Juan',
    'Jocelyn',
    'Astrid',
    'Maria',
    'Ignacia',
    'Javier',
    'Brian'
];

app.use(express.static('assets'))

app.get("/", (req, res) => {
    res.send("Servidor Abracadabra");
});

app.get('/abracadabra/usuarios', (req, res) => {
    res.json ({usuarios});
});

app.use('/abracadabra/juego/:usuario', (req, res, next) => {
    const usuario = req.params.usuario
    const validar = usuarios
    .map((u) => u.toLowerCase())
    .includes(usuario.toLocaleLowerCase());
    if (validar) {
        next()
    } else {
        res.sendFile(__dirname + '/assets/img/who.jpg');
    }
});

app.get('/abracadabra/juego/:usuario', (req, res) => {
    res.sendFile(__dirname + '/index.html');
});

app.get('/abracadabra/conejo/:n', (req, res) => {
    const numero = Math.floor(Math.random() * 4 + 1);
    const n = +req.params.n;
    if (n === numero) {
        res.sendFile(__dirname +'/assets/img/conejito.jpg');
    } else {
        res.sendFile((__dirname + '/assets/img/voldemort.jpg'));
    }
});

app.get('/*', (req, res) => {
    res.send("Esta página no existe");
});

app.listen(port, () => {
    console.log(`Servidor iniciado en http://localhost ${port}`);
});