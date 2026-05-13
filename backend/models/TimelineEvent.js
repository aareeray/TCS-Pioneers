const mongoose = require('mongoose');

const timelineEventSchema = new mongoose.Schema({
  year: {
    type: Number,
    required: [true, 'Year is required']
  },
  title: {
    type: String,
    required: [true, 'Title is required'],
    trim: true
  },
  description: {
    type: String,
    required: [true, 'Description is required']
  },
  category: {
    type: String,
    required: [true, 'Category is required'],
    enum: ['History', 'Technology', 'Business', 'Awards', 'Products']
  },
  decadeGroup: {
    type: String,
    required: [true, 'Decade group is required']
  },
  relatedPioneerIds: [{
    type: mongoose.Schema.Types.ObjectId,
    ref: 'Pioneer'
  }],
  relatedProductIds: [{
    type: mongoose.Schema.Types.ObjectId,
    ref: 'Product'
  }],
  importanceLevel: {
    type: String,
    enum: ['major', 'minor', 'milestone'],
    default: 'minor'
  }
}, {
  timestamps: true
});

timelineEventSchema.index({ title: 'text', description: 'text' });

module.exports = mongoose.model('TimelineEvent', timelineEventSchema);
