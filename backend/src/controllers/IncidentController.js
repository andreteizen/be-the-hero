const connection = require('../database/connection');

module.exports = {
    async index(request, response) {
        const { page = 1 } = request.query;

        const [count] = await connection('incidents').count(); //Contador de total de casos

        const incidents = await connection('incidents')
            .join('ongs', 'ongs.id', '=', 'incidents.ong_id')
            .limit(5) //Máximo de 5 resultados por pagina
            .offset((page-1) * 5) //Como o padrão é começar pela pag 1, então o offset inicial é 0, depois 5, depois 10 (ele começa depois desses casos, ex: offset 5[pág 2], vai mostrar do 6 ao 10)
            .select([
                'incidents.*',
                'ongs.name',
                'ongs.email',
                'ongs.whatsapp',
                'ongs.city',
                'ongs.uf'
            ]); //Se colocasse só select *, ele duplicaria o id da ong pq ele aparece tanto na tabela de incidents quanto na tabela ongs, então coloca-se apenas os dados que queremos que retorne

        response.header('X-Total-Count', count['count(*)'] - 1);

        return response.json(incidents);
    },

    async create(request, response) {
        const { title, description, value } = request.body;
        const ong_id = request.headers.authorization;

        const [id] = await connection('incidents').insert({
            title,
            description,
            value,
            ong_id,
        });

        return response.json({ id });
    },

    async delete(request, response) {
        const { id } = request.params;
        const ong_id = request.headers.authorization;

        const incident = await connection('incidents')
            .where('id', id)
            .select('ong_id')
            .first();

        if(incident.ong_id !== ong_id) {
            return response.status(401).json({ error: 'Operation not permitted.'}) //Código de status de NÃO autorizado
        }

        await connection('incidents').where('id', id).delete();

        return response.status(204).send();
    }
};
