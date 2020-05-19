const Basket = require('../../models/Basket');
const ONG = require('../../models/ONG');
const jwtDecode = require('jwt-decode');

module.exports = {
  list : async (request, response) => {
    let baskets = await Basket.find().populate('author').exec();

    return response.json({
      baskets
    });
  },

  listMe : async (request, response) => {
    const token = request.headers['x-access-token'];
    const { cnpj } = jwtDecode(token);

    const targetONG = await ONG.findOne({ cnpj });

    let bktsMe = await Basket.find({ 'author': targetONG._id });

    return response.json({
      baskets: bktsMe
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

    const basket = await Basket.create({
      author: _id,
      name,
      description,
      items,
      status: 'Em Andamento'
    });

    await basket.populate('author').execPopulate();

    return response.json({
      Basket
    })
  },

  delete : async (request, response) => {
    const token = request.headers['x-access-token'];
    const { cnpj } = jwtDecode(token);
    const targetONG = await ONG.findOne({ cnpj });

    const _id = request.headers['x-target-basket-id'];

    const targetBasket = await Basket.findById(_id);

    await targetBasket.remove();
    return response.status(200).send();
  }
};
