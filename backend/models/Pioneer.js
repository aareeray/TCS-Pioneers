const mongoose = require('mongoose');

const pioneerSchema = new mongoose.Schema({
  name: {
    type: String,
    required: [true, 'Name is required'],
    trim: true
  },
  roleTitle: {
    type: String,
    required: [true, 'Role title is required'],
    trim: true
  },
  activeYears: {
    type: String,
    required: [true, 'Active years is required'],
    trim: true
  },
  shortBio: {
    type: String,
    required: [true, 'Short bio is required']
  },
  keyContributions: {
    type: [String],
    default: []
  },
  portraitImageUrl: {
    type: String,
    default: ''
  },
  tags: {
    type: [String],
    default: []
  },
  priority: {
    type: Number,
    default: 0
  }
}, {
  timestamps: true
});

pioneerSchema.index({ name: 'text', shortBio: 'text', roleTitle: 'text' });

module.exports = mongoose.model('Pioneer', pioneerSchema);
