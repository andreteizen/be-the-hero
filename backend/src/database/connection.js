const knex = require('knex');
const configuration = require('../../knexfile');

const config = process.env.NODE_ENV === 'test' ? configuration.test : configuration.development; //Variavel ambiente, ele diz assim, ce a variável for iniciada com test (npm test) então a configuração a ser utilizada vai ser a configuration.test, se não será a config.development (config dentro do knexfile.js)

const connection = knex(config);

module.exports = connection;
