const express = require('express');

const OngController = require('./controllers/OngController');
const IncidentController = require('./controllers/IncidentController');
const ProfileController = require('./controllers/ProfileController');
const SessionController = require('./controllers/SessionController');

const routes = express.Router();

routes.post('/session', SessionController.create) //Login

routes.get('/ongs', OngController.index); // Listagem das ONGs
routes.post('/ongs', OngController.create); // Criador de ONGs

routes.get('/profile', ProfileController.index) // Seleciona todos os casos de uma ong em específico

routes.get('/incidents', IncidentController.index); // Listagem de Incidentes
routes.post('/incidents', IncidentController.create); // Criador de Incidentes
routes.delete('/incidents/:id', IncidentController.delete); // Deleta Incidente



module.exports = routes;
