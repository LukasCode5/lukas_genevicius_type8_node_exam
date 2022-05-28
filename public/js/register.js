import { postFetch } from './modules/fetch.js';
import { checkInput, errorsArr, clearErrorsArr } from './modules/validation.js';

const formEl = document.querySelector('.register_form');
const errroEl = document.querySelector('.err');
const successEl = document.querySelector('.success-msg');

const errorMsgElementsArr = document.querySelectorAll('.error-msg');

formEl.addEventListener('submit', async (event) => {
  event.preventDefault();
  // console.log('event listener works');

  const formData = {
    full_name: formEl.elements.full_name.value.trim(),
    email: formEl.elements.email.value.trim(),
    password: formEl.elements.password.value.trim(),
    repeat_password: formEl.elements.repeat_password.value.trim(),
  };
  // eslint-disable-next-line no-use-before-define
  clearErrors();
  // console.log('formData ===', formData);

  checkInput(formData.full_name, 'full_name', ['required', 'minLength-3', 'fullName']);
  checkInput(formData.email, 'email', ['required', 'minLength-3', 'email']);
  checkInput(formData.password, 'password', ['required', 'minLength-5', 'maxLength-15']);
  checkInput(formData.repeat_password, 'repeat_password', [
    'required',
    'minLength-5',
    'maxLength-15',
    `regPassword-${formData.password}`,
  ]);

  if (errorsArr.length) {
    // eslint-disable-next-line no-use-before-define
    handleError(errorsArr);
    console.log('errorsArr ===', errorsArr);
    return;
  }

  const newUser = {
    full_name: formEl.elements.full_name.value.trim(),
    email: formEl.elements.email.value.trim(),
    password: formEl.elements.password.value.trim(),
  };

  const registerResult = await postFetch('users/register', newUser);
  if (Array.isArray(registerResult)) {
    handleError(registerResult);
    return;
  }
  if (!registerResult.success) {
    handleError(registerResult.message);
    return;
  }
  handleSuccess(registerResult.message);
  formEl.reset();
  setTimeout(() => {
    window.location.href = 'login.html';
  }, 2000);
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
