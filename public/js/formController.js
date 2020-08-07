/* eslint-disable */
import { formError, formSuccess } from './errorController';

export var formStatus = 0;

export const checkFormSubmit = (...inputs) => {
  formStatus = 0;

  inputs.forEach(input => {
    var inputVal = '';
    if (input.name !== 'photo') inputVal = input.value.trim();

    if (input.name === 'email') {
      if (inputVal === '') {
        formError(input, 'Please provide an email');
      } else if (!regexForm(input)) {
        formError(input, 'Please provide a valid email address');
      } else {
        formSuccess(input, 'Woohoo!');
        formStatus += 1;
        console.log(`${input.name.toUpperCase()} part: `, formStatus);
      }
    }

    if (input.name === 'password' || input.name === 'current-password') {
      if (inputVal === '') {
        formError(input, 'Please provide a password');
      } else if (!regexForm(input)) {
        formError(
          input,
          'Please use at least one number, one special character, and one capital letter between 8 to 60 characters'
        );
      } else {
        formSuccess(input, 'Woohoo!');
        formStatus += 1;
        console.log(`${input.name.toUpperCase()} part: `, formStatus);
      }
    }

    if (input.name === 'password-confirm') {
      if (inputVal === '') {
        formError(input, 'Please enter your password to confirm');
      } else if (
        inputVal !== inputs.find(i => i.name === 'password').value.trim() &&
        inputVal !== ''
      ) {
        formError(input, 'Please make sure your passwords match');
      } else {
        formSuccess(input, 'Woohoo!');
        formStatus += 1;
        console.log(`${input.name.toUpperCase()} part: `, formStatus);
      }
    }

    if (input.name === 'name') {
      if (inputVal === '') {
        formError(input, 'Please provide your name');
      } else if (inputVal.length < 2) {
        formError(input, 'Please enter your name a minimum of 2 characters');
      } else if (inputVal.length > 70) {
        formError(
          input,
          'Please enter your name that is 70 characters or less'
        );
      } else if (!regexForm(input)) {
        formError(
          input,
          'Please use at least 2 characters with no lonely empty spaces, no accents, and does not exceed 70 characters'
        );
      } else {
        formSuccess(input, 'Woohoo!');
        formStatus += 1;
        console.log(`${input.name.toUpperCase()} part: `, formStatus);
      }
    }

    if (input.name === 'username') {
      if (inputVal === '') {
        formError(input, 'Please provide a username');
      } else if (inputVal.length < 3) {
        formError(input, 'Please enter a username a minimum of 3 characters');
      } else if (inputVal.length > 9) {
        formError(
          input,
          'Please enter a username that is 9 characters or less'
        );
      } else if (!regexForm(input)) {
        formError(
          input,
          'Please use at least 3 characters with optional underscores and hypens, that is all lowercase, and does not exceed 9 characters'
        );
      } else {
        formSuccess(input, 'Woohoo!');
        formStatus += 1;
        console.log(`${input.name.toUpperCase()} part: `, formStatus);
      }
    }

    if (input.name === 'select-birthmonth') {
      if (inputVal === '') {
        formError(input, 'Please provide a birth month');
      } else if (!regexForm(input)) {
        formError(input, 'Please use a valid month');
      } else {
        formSuccess(input, 'Woohoo!');
        formStatus += 1;
        console.log(`${input.name.toUpperCase()} part: `, formStatus);
      }
    }

    if (input.name === 'select-birthday') {
      if (inputVal === '') {
        formError(input, 'Please provide a birth day');
      } else if (!regexForm(input)) {
        formError(input, 'Please use a valid day');
      } else {
        formSuccess(input, 'Woohoo!');
        formStatus += 1;
        console.log(`${input.name.toUpperCase()} part: `, formStatus);
      }
    }

    if (input.name === 'select-birthyear') {
      if (inputVal === '') {
        formError(input, 'Please provide a birth year');
      } else if (!regexForm(input)) {
        formError(input, 'Please use a valid year');
      } else {
        formSuccess(input, 'Woohoo!');
        formStatus += 1;
        console.log(`${input.name.toUpperCase()} part: `, formStatus);
      }
    }

    if (input.name === 'select-gender') {
      if (inputVal === '') {
        formError(input, 'Please provide a gender/non-gender');
      } else if (!regexForm(input)) {
        formError(input, 'Please use a valid gender/non-gender');
      } else {
        formSuccess(input, 'Woohoo!');
        formStatus += 1;
        console.log(`${input.name.toUpperCase()} part: `, formStatus);
      }
    }

    if (input.name === 'photo' && input.value !== '') {
      if (!regexForm(input)) {
        formError(
          input,
          'Please select a valid image file of jpg, jpeg, or png'
        );
        input.value = '';
      } else if (input.files[0].size > 1024000) {
        formError(input, 'Max upload size is 1MB only');
        input.value = '';
      } else {
        formSuccess(input, 'Woohoo!');
        console.log(`${input.name.toUpperCase()} part: `, formStatus);
      }
    }

    if (input.name === 'show-title') {
      if (inputVal === '') {
        formError(input, 'Please provide a title');
      } else if (inputVal > 100) {
        formError(input, 'Please enter a title that is 100 characters or less');
      } else {
        formSucces(input, 'Woohoo!');
        formStatus += 1;
        console.log(`${input.name.toUpperCase()} part: `, formStatus);
      }
    }

    if (input.name === 'select-mpaa') {
      if (inputVal === '') {
        formError(input, 'Please provide an MPAA rating');
      } else if (!regexForm(input)) {
        formError(input, 'Please use a valid MPAA rating');
      } else {
        formSuccess(input, 'Woohoo!');
        formStatus += 1;
        console.log(`${input.name.toUpperCase()} part: `, formStatus);
      }
    }

    if (input.name === 'show-duration') {
      if (inputVal === '') {
        formError(input, 'Please provide a duration');
      } else if (parseInt(inputVal) < 10) {
        formError(input, 'Please enter a duration a minimum of 10 minutes');
      } else if (!regexForm(input)) {
        formError(
          input,
          'Please enter a duration in minutes that is at least 10 minutes long'
        );
      } else {
        formSuccess(input, 'Woohoo!');
        formStatus += 1;
        console.log(`${input.name.toUpperCase()} part: `, formStatus);
      }
    }
  });
};

function regexForm(e) {
  var regexResult = true;
  // const regexPass = /^(?=.*?[0-9])(?=.*?[A-Z])(?=.*?[.#?!@$%^&*\\-_]).{8,60}$/;
  const regexPass = /^(?=.*?[0-9])(?=.*?[a-z]).{8,60}$/;
  const regexEmail = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  const regexName = /^[a-zA-Z]{2}(([' -][a-zA-Z ])?[a-zA-Z]*)*$/;
  const regexUsername = /^(?!.*[-_]{2,})(?=^[^-_].*[^-_]$)[\w\s-]{3,9}$/;
  const regexDateMonth = [
    'January',
    'February',
    'March',
    'April',
    'May',
    'June',
    'July',
    'August',
    'September',
    'October',
    'November',
    'December'
  ];
  const regexDateDay = [...Array(32).keys()].splice(1);
  const now = new Date().getFullYear();
  const regexDateYear = Array(now - (now - 101))
    .fill('')
    .map((val, i) => now - i);
  const regexGender = ['f', 'm', 'p'];
  const regexPhoto = /^\b(jpeg|jpg|png)\b$/;
  const regexMpaa = [
    'G',
    'PG',
    'PG-13',
    'R',
    'NC-17',
    'NR',
    'Unrated',
    'TV-Y',
    'TV-Y7',
    'TV-G',
    'TV-PG',
    'TV-14',
    'TV-MA'
  ];
  const regexDuration = /^[1-9]{1}[0-9]{1,}$/;

  if (e.name === 'password' || e.name === 'current-password') {
    regexResult = regexPass.test(e.value);
  } else if (e.name === 'email') {
    regexResult = regexEmail.test(e.value);
  } else if (e.name === 'name') {
    regexResult = regexName.test(e.value);
  } else if (e.name === 'username') {
    regexResult = regexUsername.test(e.value);
  } else if (e.name === 'select-birthmonth') {
    regexResult = regexDateMonth.includes(e.value);
  } else if (e.name === 'select-birthday') {
    regexResult = regexDateDay.includes(parseInt(e.value));
  } else if (e.name === 'select-birthyear') {
    regexResult = regexDateYear.includes(parseInt(e.value));
  } else if (e.name === 'select-gender') {
    regexResult = regexGender.includes(e.value);
  } else if (e.name === 'photo') {
    regexResult = regexPhoto.test(
      e.files[0].type
        .split('/')
        .pop()
        .toLowerCase()
    );
  } else if (e.name === 'select-mpaa') {
    regexResult = regexMpaa.includes(e.value);
  } else if (e.name === 'show-duration') {
    regexResult = regexDuration.test(parseInt(e.value));
  }

  return regexResult;
}
