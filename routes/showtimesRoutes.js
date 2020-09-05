const express = require('express');
const showtimesController = require('./../controllers/showtimesController');
const authController = require('./../controllers/authController');

const router = express.Router({ mergeParams: true });

router.route('/').get(showtimesController.getAllShowtimes);
router.route('/:id').get(showtimesController.getShowtime);
router.route('/daily-plan/:date').get(showtimesController.getDailyPlan);

// PROTECT ALL OTHER ROUTES LEAKING
// router.use(authController.protect);

router
  .route('/createMyShowtime')
  .post(
    authController.protect,
    authController.restrictTo('event-owner'),
    showtimesController.createMyShowtime
  );

// router.use(authController.restrictTo('admin'));

router
  .route('/')
  .post(
    authController.protect,
    authController.restrictTo('admin'),
    showtimesController.setShowTheaterIds,
    showtimesController.createShowtime
  );

router
  .route('/:id')
  .patch(
    authController.protect,
    authController.restrictTo('admin'),
    showtimesController.updateShowtime
  )
  .delete(
    authController.protect,
    authController.restrictTo('admin'),
    authController.verifyPassword,
    showtimesController.deleteShowtime
  );

module.exports = router;
