const mongoose = require('mongoose');
const slugify = require('slugify');

const theaterSchema = new mongoose.Schema(
  {
    name: {
      type: String,
      required: [true, 'A theater must have a name'],
      unique: true
    },
    slug: String,
    address: {
      type: String,
      required: [true, 'A theater must have an address!']
    },
    city: {
      type: String,
      required: [true, 'A theater must have a city location!']
    },
    state: {
      type: String,
      required: [true, 'A theater must have a state location!']
    },
    zipCode: {
      type: String,
      required: [true, 'A theater must have a zip code!']
    },
    phone: {
      type: String,
      required: [true, 'A theater must have a contact number!']
    },
    description: {
      type: String,
      trim: true
    },
    geo: {
      type: {
        type: String,
        default: 'Point',
        enum: ['Point']
      },
      coordinates: [Number]
    },
    chainName: String,
    chainCode: String,
    chainLogo: String,
    linkUrl: String,
    isTicketing: {
      type: Boolean,
      default: false
    },
    hasShowTimes: {
      type: Boolean,
      default: false
    },
    photo: String
  },
  {
    toJSON: { virtuals: true },
    toObject: { virtuals: true }
  }
);

theaterSchema.index({ geo: '2dsphere' });

theaterSchema.virtual('showtimes', {
  ref: 'Showtimes',
  foreignField: 'theaters',
  localField: '_id'
});

// DOCUMENT MIDDLEWARE
theaterSchema.pre('save', function(next) {
  this.slug = slugify(this.name, { lower: true });
  next();
});

const Theater = mongoose.model('Theater', theaterSchema);

module.exports = Theater;
