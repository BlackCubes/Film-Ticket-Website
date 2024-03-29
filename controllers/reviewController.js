const factory = require('./handlerFactory');
const Review = require('./../models/reviewModel');
const User = require('./../models/userModel');
const AppError = require('../utils/appError');
const catchAsync = require('./../utils/catchAsync');
const filterObj = require('./../utils/filterObject');
const sanitize = require('./../utils/sanitize');

exports.checkReviewExists = catchAsync(async (req, res, next) => {
  if (!req.body.show) req.body.show = req.params.id;
  if (!req.body.user) req.body.user = req.user.id;

  const findReview = await Review.valueExists({
    show: req.body.show,
    user: req.body.user
  });

  if (findReview)
    return next(
      new AppError('You have already created a review for this show.', 403)
    );

  next();
});

exports.createMyReview = catchAsync(async (req, res, next) => {
  let filteredBody = filterObj(req.body, 'review', 'rating');

  if (!filteredBody.show) filteredBody.show = req.params.showId;
  if (!filteredBody.user) filteredBody.user = req.user.id;

  filteredBody = sanitize(filteredBody);

  const newReview = await Review.create(filteredBody);

  res.status(200).json({
    status: 'success',
    data: {
      data: newReview
    }
  });
});

exports.updateMyReview = catchAsync(async (req, res, next) => {
  let filteredBody = filterObj(req.body, 'review', 'rating');
  filteredBody = sanitize(filteredBody);

  const updatedReview = await Review.findOneAndUpdate(
    { show: req.params.showId, user: req.user.id },
    filteredBody,
    { new: true, runValidators: true }
  );

  res.status(200).json({
    status: 'success',
    data: {
      review: updatedReview
    }
  });
});

exports.deleteMyReview = catchAsync(async (req, res, next) => {
  const { password } = req.body;

  if (!password) return next(new AppError('Please provide a password!', 400));

  const user = await User.findById(req.user.id).select('+password');

  if (!user || !(await user.correctPassword(password, user.password))) {
    return next(new AppError('Incorrect password!', 401));
  }

  const review = await Review.findByIdAndDelete(req.params.id);

  if (!review) {
    return next(new AppError("The review doesn't exist!", 404));
  }

  res.status(204).json({
    status: 'success',
    data: null
  });
});

exports.setShowUserIds = (req, res, next) => {
  if (!req.body.show) req.body.show = req.params.showId;
  if (!req.body.user) req.body.user = req.user.id;
  next();
};

exports.getAllReviews = factory.getAll(Review);
exports.getReview = factory.getOne(Review);
exports.createReview = factory.createOne(Review);
exports.updateReview = factory.updateOne(Review);
exports.deleteReview = factory.deleteOne(Review);
