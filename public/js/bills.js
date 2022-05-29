import { getFetchToken, postFetchToken } from './modules/fetch.js';
import { checkInput, clearErrorsArr, errorsArr } from './modules/validation.js';

const userToken = localStorage.getItem('userToken');
// eslint-disable-next-line no-unused-expressions
userToken ? '' : window.location.replace('login.html');

const groupId = +localStorage.getItem('groupId');
const groupName = localStorage.getItem('groupName');

const formEl = document.querySelector('.bill_form');
const groupNamesEl = document.querySelector('.group-name');
const tbodyEl = document.querySelector('.bill-table-body');
const navButtonEl = document.querySelector('.back-groups-btn');

const errorMsgElementsArr = document.querySelectorAll('.errorMsgElementsArr');
const errroEl = document.querySelector('.err');

console.log('groupId ===', groupId);
console.log('groupName ===', groupName);

navButtonEl.addEventListener('click', (event) => {
  window.location.replace('groups.html');
});

// eslint-disable-next-line no-use-before-define
renderPage(`bills/${groupId}`, userToken, groupName, groupNamesEl);

formEl.addEventListener('submit', async (event) => {
  event.preventDefault();
  const billObj = {
    token: userToken,
    group_id: groupId,
    amount: formEl.elements.amount.value.trim(),
    description: formEl.elements.description.value.trim(),
  };
  // console.log('errorsArr ===', errorsArr);
  // console.log('billObj ===', billObj);
  // eslint-disable-next-line no-use-before-define
  clearErrors();

  checkInput(billObj.amount, 'amount', ['required', 'positive']);
  checkInput(billObj.description, 'description', ['required', 'minLength-5']);

  if (errorsArr.length) {
    // eslint-disable-next-line no-use-before-define
    handleError(errorsArr);
    return;
  }
  const billsResult = await postFetchToken('bills', billObj);
  console.log('billsResult ===', billsResult);
  if (Array.isArray(billsResult)) {
    // eslint-disable-next-line no-use-before-define
    handleError(billsResult);
    return;
  }
  if (billsResult.error) {
    window.location.replace('login.html');
    return;
  }
  if (!billsResult.success) {
    // eslint-disable-next-line no-use-before-define
    handleError(billsResult.message);
    return;
  }
  formEl.reset();
  const getBills = await getFetchToken(`bills/${groupId}`, userToken);
  console.log('getBills ===', getBills);
  // eslint-disable-next-line no-use-before-define
  renderBillRows(getBills.result, tbodyEl);
});

async function renderPage(endpoint, token, groupsName, groupNameEl) {
  // eslint-disable-next-line no-param-reassign
  groupNameEl.textContent = groupsName;
  const billsResult = await getFetchToken(endpoint, token);
  console.log('billsResult ===', billsResult);
  if (billsResult.error) {
    window.location.replace('login.html');
    return;
  }
  if (!billsResult.success) {
    // eslint-disable-next-line no-use-before-define
    handleError(billsResult.message);
    return;
  }
  // eslint-disable-next-line no-use-before-define
  renderBillRows(billsResult.result, tbodyEl);
}

function renderBillRows(dataArr, destination) {
  dataArr.forEach((billObj) => {
    const tableRowEl = document.createElement('tr');

    const tableDataIdEl = document.createElement('td');
    tableDataIdEl.textContent = billObj.id;

    const tableDataDescriptionEl = document.createElement('td');
    tableDataDescriptionEl.textContent = billObj.description;

    const tableDataAmountEl = document.createElement('td');
    tableDataAmountEl.textContent = `$${billObj.amount}`;

    tableRowEl.append(tableDataIdEl, tableDataDescriptionEl, tableDataAmountEl);

    destination.append(tableRowEl);
  });
}

function handleError(msg) {
  // successEl.textContent = '';
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
