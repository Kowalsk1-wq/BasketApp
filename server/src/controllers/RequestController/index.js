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

  listMe : async (request, response) => {
    const token = request.headers['x-access-token'];
    const { cnpj } = jwtDecode(token);

    const [targetONG] = await connection('ongs').select('*').where({ cnpj });

    let meRequests = await connection('requests').select('*').where({ ong_id: targetONG.id });

    return response.json({
      packages: meRequests
    })
  },

  create : async (request, response) => {
    const token = request.headers['x-access-token'];
    const {
      name,
      description,
      items
    } = request.body;

    const id = crypto.randomBytes(5).toString('HEX');

    const { cnpj } = jwtDecode(token);

    const [targetONG] = await connection('ongs').select('*').where({ cnpj });

    const [req] = await connection('requests').insert({
      id,
      name,
      description,
      items,
      ong_id: targetONG.id
    });

    return response.json({
      request: req
    })
  },

  delete : async (request, response) => {
    const token = request.headers['x-access-token'];
    const { cnpj } = jwtDecode(token);
    const [targetONG] = await connection('ongs').select('*').where({ cnpj });

    const id = request.headers['x-target-pack-id'];

    const [targetPack] = await connection('requests').select('*').where({ id });

    if (targetONG.id === targetPack.ong_id) {
      await connection('requests').select('*').where({ id }).delete();
      return response.status(200).send();
    } else {
      return response.status(401).json({
        err: "You aren't the Request' Author"
      })
    }
  }
};
