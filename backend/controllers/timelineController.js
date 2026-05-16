const { Op } = require('sequelize');
const TimelineEvent = require('../models/TimelineEvent');
const Pioneer = require('../models/Pioneer');
const Product = require('../models/Product');

// Helper: enrich timeline events with related pioneer/product data
const enrichEvents = async (events) => {
  return await Promise.all(
    events.map(async (event) => {
      const plain = event.toJSON();

      const relatedPioneers = plain.relatedPioneerIds && plain.relatedPioneerIds.length > 0
        ? await Pioneer.findAll({
            where: { id: plain.relatedPioneerIds },
            attributes: ['id', 'name', 'roleTitle']
          })
        : [];

      const relatedProducts = plain.relatedProductIds && plain.relatedProductIds.length > 0
        ? await Product.findAll({
            where: { id: plain.relatedProductIds },
            attributes: ['id', 'name', 'domain']
          })
        : [];

      return { ...plain, relatedPioneers, relatedProducts };
    })
  );
};

// @desc    Get all timeline events
// @route   GET /api/timelineEvents
const getTimelineEvents = async (req, res) => {
  try {
    const { decade, category, search } = req.query;
    const where = {};

    if (decade) {
      where.decadeGroup = decade;
    }

    if (category) {
      where.category = category;
    }

    if (search) {
      where[Op.or] = [
        { title: { [Op.iLike]: `%${search}%` } },
        { description: { [Op.iLike]: `%${search}%` } }
      ];
    }

    const events = await TimelineEvent.findAll({
      where,
      order: [['year', 'ASC']]
    });

    const enriched = await enrichEvents(events);
    res.json(enriched);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

// @desc    Get single timeline event
// @route   GET /api/timelineEvents/:id
const getTimelineEventById = async (req, res) => {
  try {
    const event = await TimelineEvent.findByPk(req.params.id);
    if (!event) {
      return res.status(404).json({ message: 'Timeline event not found' });
    }
    const enriched = await enrichEvents([event]);
    res.json(enriched[0]);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

// @desc    Create timeline event (Admin)
// @route   POST /api/timelineEvents
const createTimelineEvent = async (req, res) => {
  try {
    const event = await TimelineEvent.create(req.body);
    res.status(201).json(event);
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
};

// @desc    Update timeline event (Admin)
// @route   PUT /api/timelineEvents/:id
const updateTimelineEvent = async (req, res) => {
  try {
    const event = await TimelineEvent.findByPk(req.params.id);
    if (!event) {
      return res.status(404).json({ message: 'Timeline event not found' });
    }
    await event.update(req.body);
    res.json(event);
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
};

// @desc    Delete timeline event (Admin)
// @route   DELETE /api/timelineEvents/:id
const deleteTimelineEvent = async (req, res) => {
  try {
    const event = await TimelineEvent.findByPk(req.params.id);
    if (!event) {
      return res.status(404).json({ message: 'Timeline event not found' });
    }
    await event.destroy();
    res.json({ message: 'Timeline event removed' });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

module.exports = { getTimelineEvents, getTimelineEventById, createTimelineEvent, updateTimelineEvent, deleteTimelineEvent };
