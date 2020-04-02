const express = require('express');
const { celebrate, Segments, Joi } = require('celebrate'); //Biblioteca de validação que integra o Joi (outra bib de validação com o Express (Bib que estamos utilizando para o backend))

const OngController = require('./controllers/OngController');
const IncidentController = require('./controllers/IncidentController');
const ProfileController = require('./controllers/ProfileController');
const SessionController = require('./controllers/SessionController');

const routes = express.Router();

routes.post('/session', SessionController.create) //Login

routes.get('/ongs', OngController.index); // Listagem das ONGs

routes.post('/ongs', celebrate({
    [Segments.BODY]: Joi.object().keys({ //Estamos acessando o BODY da nossa requisição e verificando cada um dos parâmetros passados
        name: Joi.string().required(), //String() significa que o campo é uma string e required() significa que o campo é obrigatório
        email: Joi.string().required().email(),
        whatsapp: Joi.number().required().min(10).max(11),
        city: Joi.string().required(),
        uf: Joi.string().required().length(2),
    })
}), OngController.create); // Criador de ONGs

routes.get('/profile', celebrate({
    [Segments.HEADERS]: Joi.object({ //Esta acessando o HEADERS da nossa aplicação
        authorization: Joi.string().required(), //Está dizendo que o campo Authorization do nosso HEADERS é obrigatório (é onde vai o id da ong)
    }).unknown(), //Esse unknown diz que há outras propriedades que são passadas mas que não precisam ser verificadas (tem coisas que são passadas pelo HEADERS da requisição que não somos nós que adicionamos)
}),ProfileController.index) // Seleciona todos os casos de uma ong em específico

routes.get('/incidents', celebrate({
    [Segments.QUERY]: Joi.object().keys({
        page: Joi.number(),
    })
}),IncidentController.index); // Listagem de Incidentes

routes.post('/incidents', IncidentController.create); // Criador de Incidentes
routes.delete('/incidents/:id', celebrate({
    [Segments.PARAMS]: Joi.object().keys({
        id: Joi.number().required(), //Diz que é obrigatório passas em params o id do caso que estamos querendo deletar
    })
}),IncidentController.delete); // Deleta Incidente



module.exports = routes;


//Validação coloca-se normalmente nas rotas de CRIAÇÃO E ALTERAÇÃO