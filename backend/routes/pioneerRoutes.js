const express = require('express');
const router = express.Router();
const { getPioneers, getPioneerById, createPioneer, updatePioneer, deletePioneer } = require('../controllers/pioneerController');
const { protect } = require('../middleware/auth');

// Public routes
router.get('/', getPioneers);
router.get('/:id', getPioneerById);

// Admin routes
router.post('/', protect, createPioneer);
router.put('/:id', protect, updatePioneer);
router.delete('/:id', protect, deletePioneer);

module.exports = router;
