/* eslint-disable */
import { formError, formSuccess } from './errorController';
import { validateRegex } from './regexController';

export var formStatus = 0;

export const checkFormSubmit = (...inputs) => {
  formStatus = 0;

  inputs.forEach(input => {
    var inputRequired = input.id === 'starRating' ? true : input.required;
    var inputVal = '';

    if (input.type !== 'file' && input.id !== 'starRating')
      inputVal = input.value.trim();

    if (input.id === 'starRating') inputVal = input.dataset.rating.trim();

    if (input.type === 'file') inputVal = input.files[0];

    if (input.name === 'email') {
      if (inputVal === '') {
        validationFailure(input, 'Please provide an email', inputRequired);
      } else if (!validateRegex(input, inputVal)) {
        validationFailure(
          input,
          'Please provide a valid email address',
          inputRequired
        );
      } else {
        validationSuccess(input, 'Woohoo!', inputRequired);
      }
    }

    if (input.name === 'password' || input.name === 'current-password') {
      if (inputVal === '') {
        validationFailure(input, 'Please provide a password', inputRequired);
      } else if (!validateRegex(input, inputVal)) {
        validationFailure(
          input,
          'Please use at least one number, one special character, and one capital letter between 8 to 60 characters',
          inputRequired
        );
      } else {
        validationSuccess(input, 'Woohoo!', inputRequired);
      }
    }

    if (input.name === 'password-confirm') {
      if (inputVal === '') {
        validationFailure(
          input,
          'Please enter your password to confirm',
          inputRequired
        );
      } else if (
        inputVal !== inputs.find(i => i.name === 'password').value.trim() &&
        inputVal !== ''
      ) {
        validationFailure(
          input,
          'Please make sure your passwords match',
          inputRequired
        );
      } else {
        validationSuccess(input, 'Woohoo!', inputRequired);
      }
    }

    if (input.name === 'name') {
      if (inputVal === '') {
        validationFailure(input, 'Please provide your name', inputRequired);
      } else if (inputVal.length < 2) {
        validationFailure(
          input,
          'Please enter your name a minimum of 2 characters',
          inputRequired
        );
      } else if (inputVal.length > 70) {
        validationFailure(
          input,
          'Please enter your name that is 70 characters or less',
          inputRequired
        );
      } else if (!validateRegex(input, inputVal)) {
        validationFailure(
          input,
          'Please use at least 2 characters with no lonely empty spaces, no accents, and does not exceed 70 characters',
          inputRequired
        );
      } else {
        validationSuccess(input, 'Woohoo!', inputRequired);
      }
    }

    if (input.name === 'username') {
      if (inputVal === '') {
        validationFailure(input, 'Please provide a username', inputRequired);
      } else if (inputVal.length < 3) {
        validationFailure(
          input,
          'Please enter a username a minimum of 3 characters',
          inputRequired
        );
      } else if (inputVal.length > 9) {
        validationFailure(
          input,
          'Please enter a username that is 9 characters or less',
          inputRequired
        );
      } else if (!validateRegex(input, inputVal)) {
        validationFailure(
          input,
          'Please use at least 3 characters with optional underscores and hypens, that is all lowercase, and does not exceed 9 characters',
          inputRequired
        );
      } else {
        validationSuccess(input, 'Woohoo!', inputRequired);
      }
    }

    if (input.name === 'select-month') {
      if (inputVal === '') {
        validationFailure(input, 'Please provide a month', inputRequired);
      } else if (!validateRegex(input, inputVal)) {
        validationFailure(input, 'Please use a valid month', inputRequired);
      } else {
        validationSuccess(input, 'Woohoo!', inputRequired);
      }
    }

    if (input.name === 'select-day') {
      if (inputVal === '') {
        validationFailure(input, 'Please provide a day', inputRequired);
      } else if (!validateRegex(input, inputVal)) {
        validationFailure(input, 'Please use a valid day', inputRequired);
      } else {
        validationSuccess(input, 'Woohoo!', inputRequired);
      }
    }

    if (input.name === 'select-year') {
      if (inputVal === '') {
        validationFailure(input, 'Please provide a year', inputRequired);
      } else if (!validateRegex(input, inputVal)) {
        validationFailure(input, 'Please use a valid year', inputRequired);
      } else {
        validationSuccess(input, 'Woohoo!', inputRequired);
      }
    }

    if (input.name === 'select-gender') {
      if (inputVal === '') {
        validationFailure(
          input,
          'Please provide a gender/non-gender',
          inputRequired
        );
      } else if (!validateRegex(input, inputVal)) {
        validationFailure(
          input,
          'Please use a valid gender/non-gender',
          inputRequired
        );
      } else {
        validationSuccess(input, 'Woohoo!', inputRequired);
      }
    }

    if (
      (input.name === 'photo' && input.value !== '') ||
      (input.name === 'chainPhoto' && input.value !== '') ||
      input.name === 'poster' ||
      input.name === 'theaterPhoto' ||
      input.name === 'castcrew-photo'
    ) {
      if (inputRequired && input.value === '') {
        validationFailure(input, 'Please provide an image', inputRequired);
      } else if (!validateRegex(input, inputVal)) {
        validationFailure(
          input,
          'Please select a valid image file of jpg, jpeg, or png',
          inputRequired
        );
        input.value = '';
      } else if (inputVal.size > 1024000) {
        validationFailure(input, 'Max upload size is 1MB only', inputRequired);
        input.value = '';
      } else {
        validationSuccess(input, 'Woohoo!', inputRequired);
      }
    }

    if (input.name === 'show-title') {
      if (inputVal === '') {
        validationFailure(input, 'Please provide a title', inputRequired);
      } else if (inputVal.length > 100) {
        validationFailure(
          input,
          'Please enter a title that is 100 characters or less',
          inputRequired
        );
      } else {
        validationSuccess(input, 'Woohoo!', inputRequired);
      }
    }

    if (input.name === 'select-mpaa') {
      if (inputVal === '') {
        validationFailure(
          input,
          'Please provide an MPAA rating',
          inputRequired
        );
      } else if (!validateRegex(input, inputVal)) {
        validationFailure(
          input,
          'Please use a valid MPAA rating',
          inputRequired
        );
      } else {
        validationSuccess(input, 'Woohoo!', inputRequired);
      }
    }

    if (input.name === 'show-duration') {
      if (inputVal === '') {
        validationFailure(input, 'Please provide a duration', inputRequired);
      } else if (parseInt(inputVal) < 10) {
        validationFailure(
          input,
          'Please enter a duration a minimum of 10 minutes',
          inputRequired
        );
      } else if (!validateRegex(input, inputVal)) {
        validationFailure(
          input,
          'Please enter a duration in minutes that is at least 10 minutes long',
          inputRequired
        );
      } else {
        validationSuccess(input, 'Woohoo!', inputRequired);
      }
    }

    if (input.name === 'select-contenttype') {
      if (inputVal === '') {
        validationFailure(
          input,
          'Pleaase provide a content type',
          inputRequired
        );
      } else if (!validateRegex(input, inputVal)) {
        validationFailure(
          input,
          'Please use a valid content type',
          inputRequired
        );
      } else {
        validationSuccess(input, 'Woohoo!', inputRequired);
      }
    }

    if (input.name === 'textarea-overview') {
      if (inputVal === '') {
        validationFailure(input, 'Please enter an overview', inputRequired);
      } else if (inputVal.length > 183) {
        validationFailure(
          input,
          'Please enter an overview that is 183 characters or less',
          inputRequired
        );
      } else {
        validationSuccess(input, 'Woohoo!', inputRequired);
      }
    }

    if (input.name === 'textarea-synopsis' && inputVal !== '') {
      if (inputVal.length > 1100) {
        validationFailure(
          input,
          'Please enter a synopsis that is 1100 characters or less',
          inputRequired
        );
      } else {
        validationSuccess(input, 'Woohoo!', inputRequired);
      }
    }

    if (input.name === 'show-language' && inputVal !== '') {
      if (inputVal.length < 3) {
        validationFailure(
          input,
          'Please enter language(s) a minimum of 3 characters',
          inputRequired
        );
      } else {
        validationSuccess(input, 'Woohoo!', inputRequired);
      }
    }

    if (input.name === 'show-subtitles' && inputVal !== '') {
      if (inputVal.length < 3) {
        validationFailure(
          input,
          'Please enter subtitles a minimum of 3 characters',
          inputRequired
        );
      } else {
        validationSuccess(input, 'Woohoo!', inputRequired);
      }
    }

    if (input.name === 'show-genre' && inputVal !== '') {
      if (inputVal.length < 3) {
        validationFailure(
          input,
          'Please enter genre(s) a minimum of 3 characters',
          inputRequired
        );
      } else {
        validationSuccess(input, 'Woohoo!', inputRequired);
      }
    }

    if (input.name === 'show-price') {
      if (inputVal === '') {
        validationFailure(input, 'Please provide a price', inputRequired);
      } else if (parseFloat(inputVal) < 5) {
        validationFailure(
          input,
          'Please enter a price a minimum of $5',
          inputRequired
        );
      } else if (!validateRegex(input, inputVal)) {
        validationFailure(
          input,
          'Please provide a valid price with a minimum of $5',
          inputRequired
        );
      } else {
        validationSuccess(input, 'Woohoo!', inputRequired);
      }
    }

    if (
      (input.name === 'select-specialvenue' ||
        input.name === 'select-privatevenue' ||
        input.name === 'select-ticket' ||
        input.name === 'select-showtimes') &&
      inputVal !== ''
    ) {
      if (!validateRegex(input, inputVal)) {
        validationFailure(input, 'Please use a valid value', inputRequired);
      } else {
        validationSuccess(input, 'Woohoo!', inputRequired);
      }
    }

    if (input.name === 'hexadecimal') {
      if (inputVal === '') {
        validationFailure(input, 'Please provide the ID', inputRequired);
      } else if (!validateRegex(input, inputVal)) {
        validationFailure(
          input,
          'Please use a valid MongoDB ObjectID',
          inputRequired
        );
      } else {
        validationSuccess(input, 'Woohoo!', inputRequired);
      }
    }

    if (input.name === 'theater-name') {
      if (inputVal === '') {
        validationFailure(input, 'Please provide a name', inputRequired);
      } else if (inputVal.length < 7) {
        validationFailure(
          input,
          'Please enter a name a minimum of 7 characters',
          inputRequired
        );
      } else if (inputVal.length > 100) {
        validationFailure(
          input,
          'Please enter a name that is 100 characters or less',
          inputRequired
        );
      } else {
        validationSuccess(input, 'Woohoo!', inputRequired);
      }
    }

    if (input.name === 'phone') {
      if (inputVal === '') {
        validationFailure(
          input,
          'Please provide a phone number',
          inputRequired
        );
      } else if (!validateRegex(input, inputVal)) {
        validationFailure(
          input,
          'Please provide a valid phone number in the form of (###)###-#### or (###) ###-####',
          inputRequired
        );
      } else {
        validationSuccess(input, 'Woohoo!', inputRequired);
      }
    }

    if (input.name === 'linkurl' && inputVal !== '') {
      if (inputVal.length > 2082) {
        validationFailure(
          input,
          'Please enter a url that is less than 2083 characters',
          inputRequired
        );
      } else if (!validateRegex(input, inputVal)) {
        validationFailure(
          input,
          'Please use a valid url that has .com, .net, .gov, .org, or .in, and with protocol http or https',
          inputRequired
        );
      } else {
        validationSuccess(input, 'Woohoo!', inputRequired);
      }
    }

    if (input.name === 'address') {
      if (inputVal === '') {
        validationFailure(input, 'Please provide a US address', inputRequired);
      } else if (inputVal.length < 3) {
        validationFailure(
          input,
          'Please enter a US address a minimum of 3 characters',
          inputRequired
        );
      } else if (inputVal.length > 96) {
        validationFailure(
          input,
          'Please enter a US address that is less than or equal to 96 characters',
          inputRequired
        );
      } else if (!validateRegex(input, inputVal)) {
        validationFailure(
          input,
          'Please provide a valid US address',
          inputRequired
        );
      } else {
        validationSuccess(input, 'Woohoo!', inputRequired);
      }
    }

    if (input.name === 'city') {
      if (inputVal === '') {
        validationFailure(input, 'Please provide a US city', inputRequired);
      } else if (inputVal.length < 3) {
        validationFailure(
          input,
          'Please enter a US city a minimum of 3 characters',
          inputRequired
        );
      } else if (inputVal.length > 50) {
        validationFailure(
          input,
          'Please enter a US city that is less than or equal to 50 characters',
          inputRequired
        );
      } else if (!validateRegex(input, inputVal)) {
        validationFailure(
          input,
          'Please provide a valid US city that is at least 3 characters long and 50 characters max',
          inputRequired
        );
      } else {
        validationSuccess(input, 'Woohoo!', inputRequired);
      }
    }

    if (input.name === 'state') {
      if (inputVal === '') {
        validationFailure(input, 'Please provide a US state', inputRequired);
      } else if (inputVal.length !== 2) {
        validationFailure(
          input,
          'Please enter a US state that is 2 characters long',
          inputRequired
        );
      } else if (!validateRegex(input, inputVal)) {
        validationFailure(
          input,
          'Please provide a valid US state that is 2 characters long, capitalize, and abbreviated',
          inputRequired
        );
      } else {
        validationSuccess(input, 'Woohoo!', inputRequired);
      }
    }

    if (input.name === 'zipcode') {
      if (inputVal === '') {
        validationFailure(input, 'Please provide a US ZIP code', inputRequired);
      } else if (inputVal.length !== 5) {
        validationFailure(
          input,
          'Please enter a US ZIP code that is no more or no less than 5 characters long',
          inputRequired
        );
      } else if (!validateRegex(input, inputVal)) {
        validationFailure(
          input,
          'Please provide a valid US ZIP code that is 5 characters long',
          inputRequired
        );
      } else {
        validationSuccess(input, 'Woohoo!', inputRequired);
      }
    }

    if (input.name === 'geo-long') {
      if (inputVal === '') {
        validationFailure(input, 'Please provide a longitude', inputRequired);
      } else if (!validateRegex(input, inputVal)) {
        validationFailure(
          input,
          'Please provide a valid longitude that is between -180 and 180 degrees',
          inputRequired
        );
      } else {
        validationSuccess(input, 'Woohoo!', inputRequired);
      }
    }

    if (input.name === 'geo-lat') {
      if (inputVal === '') {
        validationFailure(input, 'Please provide a latitude', inputRequired);
      } else if (!validateRegex(input, inputVal)) {
        validationFailure(
          input,
          'Please provide a valid latitude that is between -90 and 90 degrees',
          inputRequired
        );
      } else {
        validationSuccess(input, 'Woohoo!', inputRequired);
      }
    }

    if (input.name === 'textarea-theaterdescription' && inputVal !== '') {
      if (inputVal.length > 3900) {
        validationFailure(
          input,
          'Please enter a description that is less than or equal to 3900 characters',
          inputRequired
        );
      } else {
        validationSuccess(input, 'Woohoo!', inputRequired);
      }
    }

    if (input.name === 'chainname' && inputVal !== '') {
      if (inputVal.length < 7) {
        validationFailure(
          input,
          'Please enter a chain name a minimum of 7 characters',
          inputRequired
        );
      } else if (inputVal.length > 80) {
        validationFailure(
          input,
          'Please enter a chain name that is 80 characters or less',
          inputRequired
        );
      } else {
        validationSuccess(input, 'Woohoo!', inputRequired);
      }
    }

    if (input.name === 'select-hour') {
      if (inputVal === '') {
        validationFailure(
          input,
          'Please provide a time in hours',
          inputRequired
        );
      } else if (!validateRegex(input, inputVal)) {
        validationFailure(
          input,
          'Please enter a valid military time in hours',
          inputRequired
        );
      } else {
        validationSuccess(input, 'Woohoo!', inputRequired);
      }
    }

    if (input.name === 'select-minute') {
      if (inputVal === '') {
        validationFailure(
          input,
          'Please provide a time in minutes',
          inputRequired
        );
      } else if (!validateRegex(input, inputVal)) {
        validationFailure(
          input,
          'Please enter a valid military time in minutes',
          inputRequired
        );
      } else {
        validationSuccess(input, 'Woohoo!', inputRequired);
      }
    }

    if (input.name === 'select-second') {
      if (inputVal === '') {
        validationFailure(
          input,
          'Please provide a time in seconds',
          inputRequired
        );
      } else if (!validateRegex(input, inputVal)) {
        validationFailure(
          input,
          'Please enter a valid military time in seconds',
          inputRequired
        );
      } else {
        validationSuccess(input, 'Woohoo!', inputRequired);
      }
    }

    if (input.name === 'castcrew-name') {
      if (inputVal === '') {
        validationFailure(
          input,
          'Please provide a name for the cast/crew',
          inputRequired
        );
      } else if (inputVal.length < 2) {
        validationFailure(
          input,
          'Please enter a name a minimum of 2 characters',
          inputRequired
        );
      } else if (inputVal.length > 70) {
        validationFailure(
          input,
          'Please enter a name that is less than or equal to 70 characters',
          inputRequired
        );
      } else if (!validateRegex(input, inputVal)) {
        validationFailure(
          input,
          'Please provide a valid name that is between 2 and 70 characters',
          inputRequired
        );
      } else {
        validationSuccess(input, 'Woohoo!', inputRequired);
      }
    }

    if (input.name === 'castcrew-role') {
      if (inputVal === '') {
        validationFailure(
          input,
          'Please provide role(s) for the cast/crew',
          inputRequired
        );
      } else if (inputVal.length < 4) {
        validationFailure(
          input,
          'Please enter role(s) a minimum of 4 characters',
          inputRequired
        );
      } else {
        validationSuccess(input, 'Woohoo!', inputRequired);
      }
    }

    if (input.name === 'textarea-bio' && inputVal !== '') {
      if (inputVal.length > 3000) {
        validationFailure(
          input,
          'Please enter a biography that is less than or equal to 3000 characters',
          inputRequired
        );
      } else {
        validationSuccess(input, 'Woohoo!', inputRequired);
      }
    }

    if (input.name === 'review-rating' || input.id === 'starRating') {
      if (inputVal === '') {
        validationFailure(input, 'Please provide a rating', inputRequired);
      } else if (parseInt(inputVal) < 1) {
        validationFailure(
          input,
          'Please enter a rating a minimum of 1',
          inputRequired
        );
      } else if (parseInt(inputVal) > 5) {
        validationFailure(
          input,
          'Please enter a rating a maximum of 5',
          inputRequired
        );
      } else if (!validateRegex(input, inputVal)) {
        validationFailure(
          input,
          'Please provide a valid rating between 1 and 5'
        );
      } else {
        validationSuccess(input, 'Woohoo!', inputRequired);
      }
    }

    if (input.name === 'textarea-review') {
      if (inputVal === '') {
        validationFailure(input, 'Please provide a review', inputRequired);
      } else if (inputVal.length < 20) {
        validationFailure(
          input,
          'Please enter a review a minimum of 20 characters',
          inputRequired
        );
      } else if (inputVal.length > 280) {
        validationFailure(
          input,
          'Please enter a review a maximum of 280 characters',
          inputRequired
        );
      } else {
        validationSuccess(input, 'Woohoo!', inputRequired);
      }
    }
  });
};

function validationSuccess(input, message, required) {
  formSuccess(input, message);
  if (required) formStatus += 1;
}

function validationFailure(input, message, required) {
  formError(input, message);
  if (!required) formStatus -= 1;
}
