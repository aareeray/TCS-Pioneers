const Pioneer = require('../models/Pioneer');
const TimelineEvent = require('../models/TimelineEvent');
const Product = require('../models/Product');

// @desc    Global search across all collections
// @route   GET /api/search?q=query
const globalSearch = async (req, res) => {
  try {
    const { q } = req.query;

    if (!q || q.trim().length === 0) {
      return res.status(400).json({ message: 'Search query is required' });
    }

    const searchRegex = new RegExp(q, 'i');

    const [pioneers, events, products] = await Promise.all([
      Pioneer.find({
        $or: [
          { name: searchRegex },
          { roleTitle: searchRegex },
          { shortBio: searchRegex },
          { tags: searchRegex }
        ]
      }).limit(10),
      TimelineEvent.find({
        $or: [
          { title: searchRegex },
          { description: searchRegex },
          { category: searchRegex }
        ]
      }).limit(10),
      Product.find({
        $or: [
          { name: searchRegex },
          { domain: searchRegex },
          { description: searchRegex }
        ]
      }).limit(10)
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
