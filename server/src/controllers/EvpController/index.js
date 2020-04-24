const connection = require('../../database/connection');

module.exports = {
  list : async (request, response) => {
    const evps = await connection('evps').select('*');

    return response.json(evps);
  },

  create : async (request, response) => {
    const { title, description, type, latitude, longitude, value } = request.body;
    const user_id = request.headers['authorization'];

    const [id] = await connection('evps').insert({
      title,
      description,
      type,
      latitude,
      longitude,
      value,
      user_id
    });

    return response.json({ id });
  },

  delete : async (request, response) => {
    const { id } = request.params;
    const user_id = request.headers['authorization'];

    const evp = await connection('evps')
      .where('id', id)
      .select('user_id')
      .first();

    if (evp.user_id !== user_id) {
      return response.status(401).json({ error: 'Operation not permitted.' });
    }

    await connection('evps').where('id', id).delete();

    return response.status(204).send();
  }
};
