const connection = require('../database/connection');

module.exports = {
    async create(request, response) {
        const { id } = request.body;

        const ong = await connection('ongs') //conecta-se à tabela ongs
            .where('id', id)                 //Pocura se tem um id na tabela igual ao id pegado de body
            .select('name')                  //Escolhe a coluna name do id encontrado
            .first()                         //Só pode haver um

        if(!ong) {
            return response.status(400).json( {error: 'No NGO founded with this ID'})
        }

        return response.json(ong);
    }
}