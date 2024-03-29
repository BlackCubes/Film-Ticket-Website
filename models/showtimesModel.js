const mongoose = require('mongoose');

const showtimesSchema = new mongoose.Schema(
  {
    startDateTime: {
      type: Date,
      required: [true, 'A show must have a start datetime!']
    },
    endDateTime: {
      type: Date,
      required: [true, 'A show must have an end datetime!']
    },
    participants: {
      type: Number,
      default: 0
    },
    maxGroupSize: {
      type: Number,
      default: 20
    },
    shows: [
      {
        type: mongoose.Schema.ObjectId,
        ref: 'Show',
        required: [true, 'A showtime must belong to a show!']
      }
    ],
    theaters: [
      {
        type: mongoose.Schema.ObjectId,
        ref: 'Theater',
        required: [true, 'A showtime must belong to a theater!']
      }
    ],
    createdAt: {
      type: Date,
      default: Date.now()
    }
  },
  {
    toJSON: { virtuals: true },
    toObject: { virtuals: true }
  }
);

showtimesSchema.virtual('soldOut').get(function() {
  if (this.participants < this.maxGroupSize) {
    return false;
  }
  return true;
});

showtimesSchema.pre(/^find/, function(next) {
  this.populate({
    path: 'shows',
    select:
      '-originalReleaseDate -castcrew -ratingsAverage -ratingsQuantity -genres -imgpromo -overview -synopsis -language -subtitles -contentType -secretShow -eventOrganizer -__v -id'
  });

  next();
});

showtimesSchema.pre(/^find/, function(next) {
  this.populate({
    path: 'theaters',
    select: '-description -chainName -chainCode -chainLogo -linkUrl -__v -id'
    /*-address -city -state -zipCode -phone */
  });

  next();
});

// STATIC METHODS
// -- find query in DB
showtimesSchema.statics.valueExists = function(query) {
  return this.findOne(query).then(result => result);
};

const Showtimes = mongoose.model('Showtimes', showtimesSchema);

module.exports = Showtimes;
