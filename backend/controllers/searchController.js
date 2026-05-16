const { Op } = require('sequelize');
const Pioneer = require('../models/Pioneer');
const TimelineEvent = require('../models/TimelineEvent');
const Product = require('../models/Product');

// @desc    Global search across all tables
// @route   GET /api/search?q=query
const globalSearch = async (req, res) => {
  try {
    const { q } = req.query;

    if (!q || q.trim().length === 0) {
      return res.status(400).json({ message: 'Search query is required' });
    }

    const term = `%${q}%`;

    const [pioneers, events, products] = await Promise.all([
      Pioneer.findAll({
        where: {
          [Op.or]: [
            { name: { [Op.iLike]: term } },
            { roleTitle: { [Op.iLike]: term } },
            { shortBio: { [Op.iLike]: term } }
          ]
        },
        limit: 10
      }),
      TimelineEvent.findAll({
        where: {
          [Op.or]: [
            { title: { [Op.iLike]: term } },
            { description: { [Op.iLike]: term } },
            { category: { [Op.iLike]: term } }
          ]
        },
        limit: 10
      }),
      Product.findAll({
        where: {
          [Op.or]: [
            { name: { [Op.iLike]: term } },
            { domain: { [Op.iLike]: term } },
            { description: { [Op.iLike]: term } }
          ]
        },
        limit: 10
      })
    ]);

    res.json({
      pioneers,
      events,
      products,
      totalResults: pioneers.length + events.length + products.length
    });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

module.exports = { globalSearch };
