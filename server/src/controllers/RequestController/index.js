const Package = require('../../models/Package');
const ONG = require('../../models/ONG');
const jwtDecode = require('jwt-decode');

module.exports = {
  list : async (request, response) => {
    let packages = await Package.find().populate('author').exec();

    return response.json({
      packages
    });
  },

  listMe : async (request, response) => {
    const token = request.headers['x-access-token'];
    const { cnpj } = jwtDecode(token);

    const targetONG = await ONG.findOne({ cnpj });

    let meRequests = await Package.find({ 'author': targetONG._id });

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

    const { cnpj } = jwtDecode(token);

    const { _id } = await ONG.findOne({ cnpj });

    const package = await Package.create({
      author: _id,
      name,
      description,
      items
    });

    await package.populate('author').execPopulate();

    return response.json({
      package
    })
  },

  delete : async (request, response) => {
    const token = request.headers['x-access-token'];
    const { cnpj } = jwtDecode(token);
    const targetONG = await ONG.findOne({ cnpj });

    const _id = request.headers['x-target-pack-id'];

    const targetPack = await Package.findById(_id);

    await targetPack.remove();
    return response.status(200).send();
  }
};
