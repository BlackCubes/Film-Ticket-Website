const express = require('express');
const showController = require('./../controllers/showController');
const authController = require('./../controllers/authController');
const castcrewRouter = require('./castcrewRoutes');
const reviewRouter = require('./reviewRoutes');
const showtimeRouter = require('./showtimesRoutes');

const router = express.Router({ mergeParams: true });

// router.param('id', showController.checkID);

router.use('/:showId/reviews', reviewRouter);
// router.use('/:showId/castcrews', castcrewRouter);
router.use('/:showId/showtimes', showtimeRouter);
router.use('/:showId/theaters/:theaterId/showtimes', showtimeRouter);

router
  .route('/top-5-shows')
  .get(showController.aliasTopShows, showController.getAllShows);

router.route('/show-stats').get(showController.getShowStats);
router.route('/original-release/:year').get(showController.getOriginalRelease);

router.route('/').get(showController.getAllShows);
router.route('/:id').get(showController.getShow);

// PROTECT ALL OTHER ROUTES LEAKING
router.use(authController.protect);

// router.get(
//   '/getMyShows',
//   authController.restrictTo('event-owner'),
//   showController.getMyShows
// );

router.post(
  '/createMyShow',
  authController.restrictTo('event-owner'),
  showController.uploadShowPhoto,
  showController.resizeShowPhotoLarge,
  showController.getEventOrganizer,
  showController.createMyShow
);

router.patch(
  '/updateMyShow/:id',
  authController.restrictTo('event-owner'),
  showController.updateMyShow
);

router.patch(
  '/updateMyShow/:id/:showPoster',
  authController.restrictTo('event-owner'),
  showController.deletePoster,
  showController.uploadShowPhoto,
  showController.resizeShowPhotoLarge,
  showController.updateMyShow
);

router
  .route('/')
  .post(
    authController.protect,
    authController.restrictTo('admin'),
    showController.createShow
  );

router
  .route('/:id')
  .patch(
    authController.protect,
    authController.restrictTo('admin', 'event-owner'),
    showController.updateShow
  )
  .delete(
    authController.protect,
    authController.restrictTo('admin', 'event-owner'),
    showController.deleteShow
  );

router.patch(
  '/updateMyShow/:id/:showPoster',
  authController.restrictTo('admin'),
  showController.deletePoster,
  showController.uploadShowPhoto,
  showController.resizeShowPhotoLarge,
  showController.updateShow
);

router
  .route('/:userId')
  .get(authController.restrictTo('admin'), showController.getAllShows);

module.exports = router;
