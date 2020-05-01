const express = require('express');
const authController = require('./../controllers/authController');
const theaterController = require('./../controllers/theaterController');
const showtimeRouter = require('./showtimesRoutes');

const router = express.Router();

router.use('/:theaterId/showtimes', showtimeRouter);
router.use('/:theaterId/shows/:showId/showtimes', showtimeRouter);

router.route('/').get(theaterController.getAllTheaters);
router.route('/:id').get(theaterController.getTheater);

// PROTECT ALL OTHER ROUTES LEAKING AND RESTRICT ONLY TO ADMINS
router.use(authController.protect);
router.use(authController.restrictTo('admin'));

router.route('/').post(theaterController.createTheater);

router
  .route('/:id')
  .patch(theaterController.updateTheater)
  .delete(theaterController.deleteTheater);

module.exports = router;
