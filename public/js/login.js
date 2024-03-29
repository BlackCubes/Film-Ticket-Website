/* eslint-disable */
import axios from 'axios';
import { showAlert } from './alerts';

export const login = async (email, password) => {
  try {
    const res = await axios({
      method: 'POST',
      url: '/api/v1/users/login',
      data: {
        email,
        password
      }
    });

    if (res.data.status === 'success') {
      showAlert('success', 'Welcome back!');
      window.setTimeout(() => {
        location.assign('/');
      }, 1500);
    }
  } catch (err) {
    showAlert('error', err.response.data.message);
  }
};

export const logout = async () => {
  try {
    const res = await axios({
      method: 'GET',
      url: '/api/v1/users/logout'
    });

    if (res.data.status === 'success') {
      showAlert('success', 'Logging out...');
      window.setTimeout(() => {
        location.assign('/');
      }, 1000);
    }
  } catch (err) {
    showAlert('error', 'Error logging out! Please try again.');
  }
};

export const register = async (
  email,
  username,
  password,
  passwordConfirm,
  name,
  birthdate,
  gender
) => {
  try {
    const res = await axios({
      method: 'POST',
      url: '/api/v1/users/signup',
      data: {
        email,
        username,
        password,
        passwordConfirm,
        name,
        birthdate,
        gender
      }
    });

    if (res.data.status === 'success') {
      showAlert('success', 'Welcome to the club!');
      window.setTimeout(() => {
        location.assign('/');
      }, 1500);
    }
  } catch (err) {
    showAlert('error', err.response.data.message);
  }
};

export const forgotPassword = async email => {
  try {
    const res = await axios({
      method: 'POST',
      url: '/api/v1/users/forgotPassword',
      data: { email }
    });

    if (res.data.status === 'success' && res.status === 200) {
      showAlert(
        'success',
        'A password reset link has been sent to your email!'
      );
      window.setTimeout(() => {
        location.assign('/');
      }, 1500);
    } else if (res.data.status === 'success' && res.status === 202) {
      showAlert('success', 'A message has been sent to your email!');
      window.setTimeout(() => {
        location.assign('/');
      }, 1500);
    }
  } catch (err) {
    showAlert('error', err.response.data.message);
  }
};

export const resetPassword = async (data, token) => {
  try {
    const res = await axios({
      method: 'PATCH',
      url: `/api/v1/users/resetPassword/${token}`,
      data
    });

    if (res.data.status === 'success') {
      showAlert('success', 'You have successfully reset your password!');
      window.setTimeout(() => {
        location.assign('/');
      }, 1500);
    }
  } catch (err) {
    showAlert('error', err.response.data.message);
  }
};

export const createShow = async (data, role) => {
  try {
    const url =
      role === 'admin' ? '/api/v1/shows' : '/api/v1/shows/createMyShow';

    const res = await axios({
      method: 'POST',
      url,
      data
    });

    if (res.data.status === 'success') {
      showAlert('success', 'Congrats! Your show has been created!');
      window.setTimeout(() => {
        location.assign('/shows');
      }, 1500);
    }
  } catch (err) {
    showAlert('error', err.response.data.message);
  }
};

export const createReview = async (data, showId, role) => {
  try {
    const url =
      role === 'admin'
        ? `/api/v1/shows/${showId}/reviews`
        : `/api/v1/reviews/createMyReview/${showId}`;

    const res = await axios({
      method: 'POST',
      url,
      data
    });

    if (res.data.status === 'success') {
      showAlert('success', 'Congrats! Your review has been created!');
      window.setTimeout(() => {
        location.reload();
      }, 1000);
    }
  } catch (err) {
    showAlert('error', err.response.data.message);
  }
};

export const createTheater = async data => {
  try {
    const url = '/api/v1/theaters';

    const res = await axios({
      method: 'POST',
      url,
      data
    });

    if (res.data.status === 'success') {
      showAlert('success', 'Congrats! The theater has been created!');
      window.setTimeout(() => {
        location.assign('/admin/theaters');
      }, 1500);
    }
  } catch (err) {
    showAlert('error', err.response.data.message);
  }
};

export const createShowtime = async data => {
  try {
    const url = '/api/v1/showtimes';

    const res = await axios({
      method: 'POST',
      url,
      data
    });

    if (res.data.status === 'success') {
      showAlert('success', 'Congrats! The showtime has been created!');
      window.setTimeout(() => {
        location.assign('/admin/showtimes');
      }, 1500);
    }
  } catch (err) {
    showAlert('error', err.response.data.message);
  }
};

export const createCastCrew = async data => {
  try {
    const url = '/api/v1/castcrews';

    const res = await axios({
      method: 'POST',
      url,
      data
    });

    if (res.data.status === 'success') {
      showAlert('success', 'Congrats! The cast/crew has been created!');
      window.setTimeout(() => {
        location.assign('/admin/castcrews');
      }, 1500);
    }
  } catch (err) {
    showAlert('error', err.response.data.message);
  }
};
