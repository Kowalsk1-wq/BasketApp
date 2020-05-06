const crypto = require('crypto');
const connection = require('../../database/connection');
const jwtDecode = require('jwt-decode');

module.exports = {
  list : async (request, response) => {
    let requests = await connection('requests').select('*');

    return response.json({
      requests
    });
  },

  create : async (request, response) => {
    const token = request.headers['x-access-token'];
    const {
      name,
      description,
      itens
    } = request.body;

    const id = crypto.randomBytes(5).toString('HEX');

    const ong_id = jwtDecode(token).id;

    const [req] = await connection('requests').insert({
      id,
      name,
      description,
      itens,
      ong_id
    });

    return response.json({
      request: req
    })
  }
};
