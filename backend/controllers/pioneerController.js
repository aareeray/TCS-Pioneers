const Pioneer = require('../models/Pioneer');

// @desc    Get all pioneers
// @route   GET /api/pioneers
const getPioneers = async (req, res) => {
  try {
    const { tag, search } = req.query;
    let query = {};

    if (tag) {
      query.tags = { $in: [tag] };
    }

    if (search) {
      query.$text = { $search: search };
    }

    const pioneers = await Pioneer.find(query).sort({ priority: -1 });
    res.json(pioneers);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

// @desc    Get single pioneer
// @route   GET /api/pioneers/:id
const getPioneerById = async (req, res) => {
  try {
    const pioneer = await Pioneer.findById(req.params.id);
    if (!pioneer) {
      return res.status(404).json({ message: 'Pioneer not found' });
    }
    res.json(pioneer);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

// @desc    Create pioneer (Admin)
// @route   POST /api/pioneers
const createPioneer = async (req, res) => {
  try {
    const pioneer = await Pioneer.create(req.body);
    res.status(201).json(pioneer);
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
};

// @desc    Update pioneer (Admin)
// @route   PUT /api/pioneers/:id
const updatePioneer = async (req, res) => {
  try {
    const pioneer = await Pioneer.findByIdAndUpdate(req.params.id, req.body, {
      new: true,
      runValidators: true
    });
    if (!pioneer) {
      return res.status(404).json({ message: 'Pioneer not found' });
    }
    res.json(pioneer);
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
};

// @desc    Delete pioneer (Admin)
// @route   DELETE /api/pioneers/:id
const deletePioneer = async (req, res) => {
  try {
    const pioneer = await Pioneer.findByIdAndDelete(req.params.id);
    if (!pioneer) {
      return res.status(404).json({ message: 'Pioneer not found' });
    }
    res.json({ message: 'Pioneer removed' });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

module.exports = { getPioneers, getPioneerById, createPioneer, updatePioneer, deletePioneer };
