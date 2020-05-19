const Donation = require('../../models/Donation.js');

module.exports = {
  store : async (request, response) => {
    const { donation_id } = request.params;

    const donation = await Donation.findById(donation_id).populate('basket');

    donation.approved = false;

    await donation.save();

    return response.json(donation);
  }
};
