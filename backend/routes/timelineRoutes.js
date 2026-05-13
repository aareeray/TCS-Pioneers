const express = require('express');
const router = express.Router();
const { getTimelineEvents, getTimelineEventById, createTimelineEvent, updateTimelineEvent, deleteTimelineEvent } = require('../controllers/timelineController');
const { protect } = require('../middleware/auth');

// Public routes
router.get('/', getTimelineEvents);
router.get('/:id', getTimelineEventById);

// Admin routes
router.post('/', protect, createTimelineEvent);
router.put('/:id', protect, updateTimelineEvent);
router.delete('/:id', protect, deleteTimelineEvent);

module.exports = router;
