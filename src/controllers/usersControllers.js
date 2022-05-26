/* eslint-disable camelcase */
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
const { jwtSecret } = require('../config');
const {
  registerUserDb,
  findUserByEmailDb,
  addToAccountsDb,
  getAccountsAndGroupsDb,
  getBillsOfGroupDB,
  postBillDb,
} = require('../models/usersModels');

async function registerUser(req, res) {
  // console.log('registerUser controller ran');

  const newUser = req.body;
  newUser.password = bcrypt.hashSync(newUser.password, 10);

  try {
    const registerUserResult = await registerUserDb(newUser);
    if (registerUserResult.affectedRows === 1) {
      res.status(201).json('User has been registered');
    }
  } catch (error) {
    // console.log('error in registerUser ===', error);
    if (error.code === 'ER_DUP_ENTRY') {
      res.status(400).json('user alredy exists');
      return;
    }
    res.sendStatus(500);
  }
}

async function loginUser(req, res) {
  // console.log('loginUser controller ran');
  const logUser = req.body;
  try {
    // console.log('logUser.email ===', logUser.email);
    const foundUserResult = await findUserByEmailDb(logUser.email);
    // console.log('foundUserResult ===', foundUserResult);

    if (!foundUserResult) {
      res.status(400).json('email or password not found (email)');
      return;
    }

    if (!bcrypt.compareSync(logUser.password, foundUserResult.password)) {
      res.status(400).json('email or password not found (password)');
      return;
    }

    if (!jwtSecret) {
      res.sendStatus(500);
      return;
    }

    const payload = { userId: foundUserResult.id };
    const token = jwt.sign(payload, jwtSecret, { expiresIn: '1h' });

    res.json({ success: true, token });
  } catch (error) {
    console.log('error in loginUser ===', error);
    res.sendStatus(500);
  }
}

async function addToAccounts(req, res) {
  console.log('addtoAccounts controller ran');
  const { userId, group_id } = req.body;

  try {
    const addToAccountsResult = await addToAccountsDb(userId, group_id);
    // console.log('addToAccountsResult ===', addToAccountsResult);
    if (!addToAccountsResult.success && addToAccountsResult.message === 'group not found') {
      res.status(400).json({ success: false, message: 'Group not found' });
      return;
    }

    if (!addToAccountsResult.success && addToAccountsResult.message === 'duplicate entry') {
      res.status(400).json({ success: false, message: 'User is already in this group' });
      return;
    }

    res.status(201).json({ success: true, message: 'Group successfully added' });
  } catch (error) {
    console.log('error in addToAccounts ===', error);
    res.sendStatus(500);
  }
}

async function getAccountsAndGroups(req, res) {
  console.log('getAccountsAndGroups controller ran');
  try {
    const getAccountsResult = await getAccountsAndGroupsDb();
    // console.log('getAccountsResult ===', getAccountsResult);
    res.json(getAccountsResult);
  } catch (error) {
    console.log('error in getAccountsAndGroups ===', error);
  }
}

async function getBillsOfGroup(req, res) {
  console.log('getBillsOfGroup controller ran');
  const groupId = +req.params.group_id;
  // console.log('groupId ===', typeof groupId, groupId);
  try {
    const getBillsOfGroupResult = await getBillsOfGroupDB(groupId);
    console.log('getBillsOfGroupResult ===', getBillsOfGroupResult);
  } catch (error) {
    console.log('error in getBillsOfGroup', error);
    res.sendStatus(500);
  }
}

async function postBill(req, res) {
  console.log('postBill controller ran');
  const newBill = req.body;
  try {
    const postBillResult = await postBillDb(newBill);
    if (!postBillResult.success) {
      res.status(400).json({ success: false, message: 'Group not found' });
      return;
    }
    res.status(201).json({ success: true, message: 'Bill successfully added' });
  } catch (error) {
    console.log('error in postBill', error);
    res.sendStatus(500);
  }
}

module.exports = {
  registerUser,
  loginUser,
  addToAccounts,
  getAccountsAndGroups,
  getBillsOfGroup,
  postBill,
};
