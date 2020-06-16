/* eslint-disable */
import axios from 'axios';
import { showAlert } from './alerts';

export const updateSettings = async (data, type) => {
  try {
    const url =
      type === 'password'
        ? 'http://127.0.0.1:3000/api/v1/users/updateMyPassword'
        : 'http://127.0.0.1:3000/api/v1/users/updateMe';

    const res = await axios({
      method: 'PATCH',
      url,
      data
    });

    if (res.data.status === 'success') {
      showAlert('success', `Your ${type} has been updated!`);
    }
  } catch (err) {
    showAlert('error', err.response.data.message);
  }
};

// THINK ABOUT HOW TO IMPLEMENT ADMIN!
export const updateShowSettings = async data => {
  try {
    const slug = window.location.pathname.split('/')[2];

    const res = await axios({
      method: 'PATCH',
      url: `http://127.0.0.1:3000/api/v1/shows/updateMyShow/${slug}`,
      data
    });

    if (res.data.status === 'success') {
      showAlert('success', 'Your show has been updated!');
    }
  } catch (err) {
    showAlert('error', err.response.data.message);
  }
};

// export const updatePersonalData = async (name, birthdate, gender) => {
//   try {
//     const res = await axios({
//       method: 'PATCH',
//       url: 'http://127.0.0.1:3000/api/v1/users/updateMe',
//       data: {
//         name,
//         birthdate,
//         gender
//       }
//     });

//     if (res.data.status === 'success') {
//       showAlert('success', 'Your data has been updated!');
//     }
//   } catch (err) {
//     showAlert('error', err.response.data.message);
//   }
// };

// export const updateEmailUsernameData = async (email, username) => {
//   try {
//     const res = await axios({
//       method: 'PATCH',
//       url: 'http://127.0.0.1:3000/api/v1/users/updateMe',
//       data: {
//         email,
//         username
//       }
//     });

//     if (res.data.status === 'success') {
//       showAlert('success', 'Your email/password has been updated!');
//     }
//   } catch (err) {
//     showAlert('error', err.response.data.message);
//   }
// };
