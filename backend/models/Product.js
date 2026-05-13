const mongoose = require('mongoose');

const productSchema = new mongoose.Schema({
  name: {
    type: String,
    required: [true, 'Product name is required'],
    trim: true
  },
  domain: {
    type: String,
    required: [true, 'Domain is required'],
    trim: true
  },
  launchPeriod: {
    type: String,
    required: [true, 'Launch period is required']
  },
  description: {
    type: String,
    required: [true, 'Description is required']
  },
  impactHighlights: {
    type: [String],
    default: []
  },
  officialUrl: {
    type: String,
    default: ''
  },
  featured: {
    type: Boolean,
    default: false
  }
}, {
  timestamps: true
});

productSchema.index({ name: 'text', description: 'text', domain: 'text' });

module.exports = mongoose.model('Product', productSchema);
