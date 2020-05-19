const Donation = require('../../models/Donation.js');

module.exports = {
	store : async (request, response) => {
		const { user_id, ong_id } = request.headers;
		const basket_id = request.params['basket_id'];
		const { date, items } = request.body;

		const donation = await Donation.create({
			user: user_id,
			ong: ong_id,
			basket: basket_id,
			date,
			items
		});

		await donation.populate('basket').populate('ong').populate('user').execPopulate();

		return response.json({ donation });	
	},
};
