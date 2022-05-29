import { postFetch } from './modules/fetch.js';
import { checkInput, clearErrorsArr, errorsArr } from './modules/validation.js';

const formEl = document.querySelector('.login_form');
const errroEl = document.querySelector('.err');
const successEl = document.querySelector('.success-msg');

const errorMsgElementsArr = document.querySelectorAll('.error-msg');

formEl.addEventListener('submit', async (event) => {
  event.preventDefault();
  // console.log('login form works');

  const loginUser = {
    email: formEl.elements.email.value.trim(),
    password: formEl.elements.password.value.trim(),
  };
  // console.log('loginUser  ===', loginUser);
  // eslint-disable-next-line no-use-before-define
  clearErrors();

  checkInput(loginUser.email, 'email', ['required', 'minLength-3', 'email']);
  checkInput(loginUser.password, 'password', ['required', 'minLength-5', 'maxLength-15']);

  // console.log('errorsArr ===', errorsArr);

  if (errorsArr.length) {
    // eslint-disable-next-line no-use-before-define
    handleError(errorsArr);
    return;
  }

  const loginResult = await postFetch('users/login', loginUser);
  // console.log('loginResult ===', loginResult);
  if (!loginResult.success) {
    // eslint-disable-next-line no-use-before-define
    handleError(loginResult.message);
    return;
  }
  // eslint-disable-next-line no-use-before-define
  handleSuccess('Login successful');
  localStorage.setItem('userToken', loginResult.token);
  setTimeout(() => {
    window.location.replace('groups.html');
  }, 1000);
});

function handleError(msg) {
  successEl.textContent = '';
  errroEl.textContent = '';
  if (typeof msg === 'string') {
    errroEl.textContent = msg;
  }
  if (Array.isArray(msg)) {
    msg.forEach((eObj) => {
      const elWithError = formEl.elements[eObj.field];
      elWithError.classList.add('invalid-input');
      elWithError.nextElementSibling.textContent = eObj.message;
    });
  }
}

function clearErrors() {
  clearErrorsArr();
  errorMsgElementsArr.forEach((htmlElement) => {
    // eslint-disable-next-line no-param-reassign
    htmlElement.textContent = '';
    htmlElement.previousElementSibling.classList.remove('invalid-input');
  });
}

function handleSuccess(msg) {
  successEl.textContent = '';
  if (typeof msg === 'string') {
    successEl.textContent = msg;
  }
}
