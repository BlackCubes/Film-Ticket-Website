const AppError = require('./../utils/appError');
const catchAsync = require('./../utils/catchAsync');
const CastCrew = require('./../models/castcrewModel');
const Review = require('./../models/reviewModel');
const Show = require('./../models/showModel');
const Showtimes = require('./../models/showtimesModel');
const Theater = require('./../models/theaterModel');
const Ticket = require('./../models/ticketModel');
const User = require('./../models/userModel');

exports.getHome = catchAsync(async (req, res, next) => {
  // const shows = await Show.find().populate('showtimes');
  const showtimes = await Showtimes.find();

  res.status(200).render('home', {
    title: 'Rare Movie Tickets, Special Venues, Locations and Time',
    showtimes
  });
});

exports.getNoJS = (req, res) => {
  res.status(200).render('error/noscript', {
    title: 'Enable JavaScript',
    msg: 'You need to enable JavaScript to run this app.'
  });
};

// SHOW CONTROLLER
exports.getShows = catchAsync(async (req, res, next) => {
  const shows = await Show.find();

  res.status(200).render('shows', {
    title: 'Shows',
    shows
  });
});

exports.getSpecialVenues = catchAsync(async (req, res, next) => {
  const shows = await Show.find({ specialVenue: true });

  res.status(200).render('shows', {
    title: 'Special Venues',
    shows
  });
});

exports.getShow = catchAsync(async (req, res, next) => {
  const show = await Show.findOne({ slug: req.params.slug })
    .populate({
      path: 'reviews',
      fields: 'review rating user'
    })
    .populate({
      path: 'showtimes',
      fields: 'theaters startDateTime endDateTime' // Fix issues
    })
    .populate({
      path: 'tickets',
      fields: 'show user'
    });

  if (!show) {
    return next(new AppError('There is no show with that name!', 404));
  }

  res.status(200).render('show-overview', {
    title: show.title,
    show
  });
});

// THEATER CONTROLLER
exports.getTheaters = catchAsync(async (req, res, next) => {
  const theaters = await Theater.find();

  res.status(200).render('theaters', {
    title: 'Theaters',
    theaters
  });
});

exports.getTheater = catchAsync(async (req, res, next) => {
  const theater = await Theater.findOne({ slug: req.params.slug })
    .populate({
      path: 'showtimes',
      fields: 'shows startDateTime endDateTime' // Fix issues
    })
    .populate({
      path: 'tickets',
      fields: 'show user'
    });

  if (!theater) {
    return next(new AppError('There is no theater with that name!', 404));
  }

  res.status(200).render('theater-overview', {
    title: theater.name,
    theater
  });
});

// CASTCREW CONTROLLER
exports.getCastCrew = catchAsync(async (req, res, next) => {
  const castcrew = await CastCrew.findOne({
    slug: req.params.slug
  }).populate({
    path: 'shows',
    fields:
      'poster originalReleaseDate ratingsAverage genres title duration mpaaRating contentType slug durationHours'
  });

  if (!castcrew) {
    return next(new AppError('There is no castcrew with that name!', 404));
  }

  res.status(200).render('castcrew-overview', {
    title: castcrew.name,
    castcrew
  });
});

// USER CONTROLLER
exports.getLoginForm = (req, res) => {
  res.status(200).render('account/login', {
    title: 'My Login'
  });
};

exports.getRegisterForm = (req, res) => {
  res.status(200).render('account/register', {
    title: 'My Registration'
  });
};

exports.getForgotPasswordForm = (req, res) => {
  res.status(200).render('account/forgotPassword', {
    title: 'Forgot My Password'
  });
};

exports.getResetPasswordForm = (req, res) => {
  res.status(200).render('account/resetPassword', {
    title: 'Reset My Password'
  });
};

exports.getAccount = (req, res) => {
  res.status(200).render('account/account', {
    title: 'My Account'
  });
};

exports.getMyTickets = catchAsync(async (req, res, next) => {
  const tickets = await Ticket.find({ user: req.user.id });

  const showIds = tickets.map(el => el.show);
  const shows = await Show.find({ _id: { $in: showIds } }).populate(
    'showtimes'
  );

  res.status(200).render('shows', {
    title: 'My Tickets',
    shows
  });
});

exports.getMyReviews = catchAsync(async (req, res, next) => {
  const reviews = await Review.find({ user: req.user.id });

  res.status(200).render('account/viewReviews', {
    title: 'My Reviews',
    reviews
  });
});

exports.getMyReviewForm = catchAsync(async (req, res, next) => {
  const show = await Show.find({ slug: req.params.slug });

  if (!show) {
    return next(new AppError('There is no show with that name!', 404));
  }

  const review = await Review.find({ user: req.user.id, show: show[0].id });

  res.status(200).render('account/updateReview', {
    title: `${show[0].title} Review`,
    review: review[0]
  });
});

// -- EVENT OWNER
exports.getEventOwnerCreateShow = (req, res) => {
  res.status(200).render('account/createShow', {
    title: 'Create My Show'
  });
};

exports.getEventOwnerGetShows = catchAsync(async (req, res) => {
  const shows = await Show.find({ eventOrganizer: req.user.id });

  res.status(200).render('account/viewShows', {
    title: 'My Shows',
    shows
  });
});

exports.getEventOwnerShow = catchAsync(async (req, res) => {
  const show = await Show.findOne({
    slug: req.params.slug,
    eventOrganizer: req.user.id
  });

  res.status(200).render('account/updateShow', {
    title: `Update ${show.title}`,
    show
  });
});

exports.getEventOwnerShowsReviews = catchAsync(async (req, res) => {
  const shows = await Show.find({ eventOrganizer: req.user.id }).populate({
    path: 'reviews',
    fields: 'id _id'
  });

  const reviews = shows.map(el => el.reviews[0]);
  const allReviewsTitle = "My Shows' Reviews";

  res.status(200).render('account/viewReviews', {
    title: allReviewsTitle,
    reviews,
    allReviewsTitle
  });
});

exports.getEventOwnerShowReviews = catchAsync(async (req, res, next) => {
  const show = await Show.findOne({
    eventOrganizer: req.user.id,
    slug: req.params.slug
  }).populate({
    path: 'reviews',
    fields: 'id _id'
  });

  if (!show)
    return next(new AppError('There is no show with that title!', 404));

  const { reviews } = show;
  const oneReviewTitle = `${show.title} Reviews`;

  res.status(200).render('account/viewReviews', {
    title: `My Shows' Reviews: ${show.title}`,
    reviews,
    oneReviewTitle
  });
});

// -- ADMIN
exports.getAdminPage = (req, res) => {
  res.status(200).render('account/admin', {
    title: 'Admin'
  });
};

exports.getAdminUserOptions = (req, res) => {
  const option = 'user';

  res.status(200).render('account/adminOptions', {
    title: 'Admin - Show Options',
    option
  });
};

exports.getAdminUsers = catchAsync(async (req, res, next) => {
  const optionUsers = await User.find();

  res.status(200).render('account/viewUsers', {
    title: 'Admin - Users',
    optionUsers
  });
});

exports.getAdminUser = catchAsync(async (req, res, next) => {
  const optionUser = await User.findById(req.params.id);

  res.status(200).render('account/account', {
    title: `Admin - Users: ${optionUser.name}`,
    optionUser
  });
});

exports.getAdminUserShows = catchAsync(async (req, res, next) => {
  const user = await User.findById(req.params.id);

  if (!user) return next(new AppError('There is no user with that id!', 404));

  const shows = await Show.find({ eventOrganizer: req.params.id });

  res.status(200).render('account/viewShows', {
    title: `Admin - Users: ${user.name}, Shows`,
    shows
  });
});

exports.getAdminUserReviews = catchAsync(async (req, res, next) => {
  const user = await User.findById(req.params.id);

  if (!user) return next(new AppError('There is no user with that id!', 404));

  const reviews = await Review.find({ user: req.params.id });

  if (!reviews)
    return next(new AppError('There are no reviews on this user!', 404));

  const reviewsOnUser = user.name;

  res.status(200).render('account/viewReviews', {
    title: `Admin - User: ${user.name}, Reviews`,
    reviews,
    reviewsOnUser
  });
});

exports.getAdminShowOptions = (req, res) => {
  const option = 'show';

  res.status(200).render('account/adminOptions', {
    title: 'Admin - Show Options',
    option
  });
};

exports.getAdminShows = catchAsync(async (req, res, next) => {
  const shows = await Show.find();

  res.status(200).render('account/viewShows', {
    title: 'Admin - Shows',
    shows
  });
});

exports.getAdminShow = catchAsync(async (req, res, next) => {
  const show = await Show.findById(req.params.id);

  res.status(200).render('account/updateShow', {
    title: `Admin - Shows: ${show.title}`,
    show
  });
});

exports.getAdminShowReviews = catchAsync(async (req, res, next) => {
  const show = await Show.findById(req.params.id);

  if (!show) return next(new AppError('There is no show with that id!', 404));

  const reviews = await Review.find({ show: req.params.id });

  if (!reviews)
    return next(new AppError('There are no reviews on this show!', 404));

  const reviewsOnShow = show.title;

  res.status(200).render('account/viewReviews', {
    title: `Admin - Shows: ${show.title}, Reviews`,
    reviews,
    reviewsOnShow
  });
});

exports.getAdminCreateShow = (req, res) => {
  res.status(200).render('account/createShow', {
    title: 'Admin - Create Show'
  });
};

exports.getAdminTheaterOptions = (req, res) => {
  const option = 'theater';

  res.status(200).render('account/adminOptions', {
    title: 'Admin - Theater Options',
    option
  });
};

exports.getAdminTheaters = catchAsync(async (req, res, next) => {
  const theaters = await Theater.find();

  res.status(200).render('account/viewTheaters', {
    title: 'Admin - Theaters',
    theaters
  });
});

exports.getAdminTheater = catchAsync(async (req, res, next) => {
  const theater = await Theater.findById(req.params.id);

  if (!theater)
    return next(new AppError('There is no theater with that id!', 404));

  res.status(200).render('account/updateTheater', {
    title: `Admin - Theaters: ${theater.name}`,
    theater
  });
});

exports.getAdminCreateTheater = (req, res) => {
  res.status(200).render('account/createTheater', {
    title: 'Admin - Create Theater'
  });
};

exports.getAdminShowtimeOptions = (req, res) => {
  const option = 'showtime';

  res.status(200).render('account/adminOptions', {
    title: 'Admin - Showtimes Options',
    option
  });
};

exports.getAdminShowtimes = catchAsync(async (req, res, next) => {
  const showtimes = await Showtimes.find();

  res.status(200).render('account/viewShowtimes', {
    title: 'Admin - Showtimes',
    showtimes
  });
});

exports.getAdminShowtime = catchAsync(async (req, res, next) => {
  const showtime = await Showtimes.findById(req.params.id);

  if (!showtime)
    return next(new AppError('There is no showtime with that id!', 404));

  res.status(200).render('account/updateShowtime', {
    title: `Admin - Showtimes: ${showtime.shows[0].title} at ${showtime.theaters[0].name}`,
    showtime
  });
});

exports.getAdminCreateShowtime = (req, res) => {
  res.status(200).render('account/createShowtime', {
    title: 'Admin - Create Showtime'
  });
};

exports.getAdminCastCrewOptions = (req, res) => {
  const option = 'castcrew';

  res.status(200).render('account/adminOptions', {
    title: 'Admin - Cast & Crew Options',
    option
  });
};

exports.getAdminCastCrews = catchAsync(async (req, res, next) => {
  const castcrews = await CastCrew.find();

  res.status(200).render('account/viewCastCrews', {
    title: 'Admin - Cast & Crews',
    castcrews
  });
});

exports.getAdminCastCrew = catchAsync(async (req, res, next) => {
  const castcrew = await CastCrew.findById(req.params.id);

  if (!castcrew)
    return next(new AppError('There is no cast/crew with that id!', 404));

  res.status(200).render('account/updateCastCrew', {
    title: `Admin - Cast & Crews: ${castcrew.name}`,
    castcrew
  });
});

exports.getAdminCreateCastCrew = (req, res) => {
  res.status(200).render('account/createCastCrew', {
    title: 'Admin - Create Cast & Crew'
  });
};
