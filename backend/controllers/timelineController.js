const TimelineEvent = require('../models/TimelineEvent');

// @desc    Get all timeline events
// @route   GET /api/timelineEvents
const getTimelineEvents = async (req, res) => {
  try {
    const { decade, category, search } = req.query;
    let query = {};

    if (decade) {
      query.decadeGroup = decade;
    }

    if (category) {
      query.category = category;
    }

    if (search) {
      query.$text = { $search: search };
    }

    const events = await TimelineEvent.find(query)
      .populate('relatedPioneerIds', 'name roleTitle')
      .populate('relatedProductIds', 'name domain')
      .sort({ year: 1 });
    res.json(events);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

// @desc    Get single timeline event
// @route   GET /api/timelineEvents/:id
const getTimelineEventById = async (req, res) => {
  try {
    const event = await TimelineEvent.findById(req.params.id)
      .populate('relatedPioneerIds', 'name roleTitle')
      .populate('relatedProductIds', 'name domain');
    if (!event) {
      return res.status(404).json({ message: 'Timeline event not found' });
    }
    res.json(event);
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
    const event = await TimelineEvent.findByIdAndUpdate(req.params.id, req.body, {
      new: true,
      runValidators: true
    });
    if (!event) {
      return res.status(404).json({ message: 'Timeline event not found' });
    }
    res.json(event);
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
};

// @desc    Delete timeline event (Admin)
// @route   DELETE /api/timelineEvents/:id
const deleteTimelineEvent = async (req, res) => {
  try {
    const event = await TimelineEvent.findByIdAndDelete(req.params.id);
    if (!event) {
      return res.status(404).json({ message: 'Timeline event not found' });
    }
    res.json({ message: 'Timeline event removed' });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

module.exports = { getTimelineEvents, getTimelineEventById, createTimelineEvent, updateTimelineEvent, deleteTimelineEvent };
