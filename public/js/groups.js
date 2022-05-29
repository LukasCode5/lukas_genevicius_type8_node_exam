import { getFetch, getFetchToken, postFetchToken } from './modules/fetch.js';

const userToken = localStorage.getItem('userToken');
// eslint-disable-next-line no-unused-expressions
userToken ? '' : window.location.replace('login.html');

const cardContainerEl = document.querySelector('.card-container');
const errorCardsEl = document.querySelector('.error-msg');
const errorSelectionEl = document.querySelector('.error-selection');
const selectGroupsEl = document.querySelector('.select');
const formEl = document.querySelector('.group_form');

// eslint-disable-next-line no-use-before-define
showGroups('accounts', userToken, cardContainerEl, errorCardsEl);
// eslint-disable-next-line no-use-before-define
showGroupSelection('groups', selectGroupsEl, errorSelectionEl);

formEl.addEventListener('submit', async (event) => {
  event.preventDefault();
  // eslint-disable-next-line no-unused-expressions
  if (!localStorage.getItem('userToken')) {
    window.location.replace('login.html');
    return;
  }

  const userTokeN = localStorage.getItem('userToken');

  const groupsSelectionObj = {
    token: userTokeN,
    group_id: formEl.elements.groups.value.trim(),
  };
  const postGroupSelection = await postFetchToken('accounts', groupsSelectionObj);
  console.log('postGroupSelection ===', postGroupSelection);
  if (postGroupSelection.error) {
    window.location.replace('login.html');
    return;
  }

  if (!postGroupSelection.success) {
    errorSelectionEl.textContent = postGroupSelection.message;
    return;
  }
  errorSelectionEl.textContent = '';
  // eslint-disable-next-line no-use-before-define
  showGroups('accounts', userToken, cardContainerEl, errorCardsEl);
});

async function showGroups(endpoint, token, destination, errorElement) {
  try {
    // eslint-disable-next-line no-param-reassign
    destination.innerHTML = '';
    // eslint-disable-next-line no-param-reassign
    errorElement.textContent = '';
    const groupsResult = await getFetchToken(endpoint, token);
    if (groupsResult.error) {
      window.location.replace('login.html');
      return;
    }
    if (!groupsResult.success) {
      // eslint-disable-next-line no-param-reassign
      errorElement.textContent = groupsResult.message;
      return;
    }
    const groupsSorted = groupsResult.result.sort(
      (groupObjA, groupObjB) => groupObjA.group_id - groupObjB.group_id
    );
    // console.log('groupsSorted ===', groupsSorted);
    // eslint-disable-next-line no-use-before-define
    renderGroupCards(groupsSorted, destination);
  } catch (error) {
    console.log('error in showGroups', error);
  }
}

function renderGroupCards(dataArr, destination) {
  dataArr.forEach((groupObj) => {
    const groupCardEl = document.createElement('div');
    groupCardEl.className = 'card';
    groupCardEl.addEventListener('click', () => {
      localStorage.setItem('groupId', groupObj.group_id);
      localStorage.setItem('groupName', groupObj.name);
      window.location.href = 'bills.html';
    });

    const groupIdEl = document.createElement('h3');
    groupIdEl.className = 'card-id';
    groupIdEl.textContent = `ID: ${groupObj.group_id}`;

    const groupNameEl = document.createElement('p');
    groupNameEl.className = 'card-name';
    groupNameEl.textContent = groupObj.name;

    groupCardEl.append(groupIdEl, groupNameEl);
    destination.append(groupCardEl);
  });
}

async function showGroupSelection(endpoint, destination, errorElement) {
  try {
    // eslint-disable-next-line no-param-reassign
    errorElement.textContent = '';
    const groupsSelection = await getFetch(endpoint);
    if (!groupsSelection.success) {
      // eslint-disable-next-line no-param-reassign
      errorElement.textContent = groupsSelection.message;
      return;
    }
    // eslint-disable-next-line no-use-before-define
    renderGroupSelection(groupsSelection.result, destination);
  } catch (error) {
    console.log('error in showGroupSelection', error);
  }
}
function renderGroupSelection(dataArr, destination) {
  dataArr.forEach((groupObj) => {
    const optionEl = document.createElement('option');
    optionEl.className = 'group-option';
    optionEl.textContent = groupObj.id;
    optionEl.setAttribute('value', groupObj.id);
    destination.append(optionEl);
  });
}
