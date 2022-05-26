const mysql = require('mysql2/promise');
const { dbConfig, jwtSecret } = require('../config');

async function executeDb(sql, dataToDbArray = []) {
  let conn;
  try {
    conn = await mysql.createConnection(dbConfig);
    const [result] = await conn.execute(sql, dataToDbArray);
    return result;
  } catch (error) {
    console.log('error executeb', error);
    throw error;
  } finally {
    conn?.end();
  }
}

async function registerUserDb(userObj) {
  // console.log('registerUserDb model ran');
  const sql = 'INSERT INTO users(full_name, email, password) VALUES(?,?,?)';
  return executeDb(sql, [userObj.full_name, userObj.email, userObj.password]);
}

async function findUserByEmailDb(userEmail) {
  // console.log('findUserByEmailDb model ran');
  const sql = 'SELECT * FROM users WHERE email = ?';
  const findResult = await executeDb(sql, [userEmail]);
  return findResult[0];
}

async function addToAccountsDb(userId, groupId) {
  console.log('addToAccountsDb model ran');
  //  console.log('groupId ===', groupId);
  // console.log('userId ===', userId);
  try {
    const sqlCheckIfGroupExists = `SELECT * FROM groups 
        WHERE id = ?`;
    const checkGroupResult = await executeDb(sqlCheckIfGroupExists, [groupId]);
    //   console.log('checkGroupResult ===', checkGroupResult.length);
    if (checkGroupResult.length === 0) {
      return { success: false, message: 'group not found' };
    }

    const sqlCheckForDuplicate = `SELECT * FROM accounts 
          WHERE user_id = ? AND group_id = ?`;
    const checkDuplicateResult = await executeDb(sqlCheckForDuplicate, [userId, groupId]);
    if (checkDuplicateResult.length !== 0) {
      return { success: false, message: 'duplicate entry' };
    }

    const sqlInsert = `INSERT INTO accounts(group_id, user_id)
        VALUES(?,?)`;
    const insertAccountResult = await executeDb(sqlInsert, [groupId, userId]);
    //  console.log('insertAccountResult ===', insertAccountResult);
    return { success: true, result: insertAccountResult };
  } catch (error) {
    console.log('error in addToAccountsDb ===', error);
    throw error;
  }
}

async function getAccountsAndGroupsDb() {
  // console.log('getAccountsAndGroupsDb model ran');
  const sql = `SELECT accounts.user_id, groups.id AS group_id , groups.name FROM accounts 
  LEFT JOIN groups 
  ON accounts.group_id = groups.id;`;
  return executeDb(sql);
}

async function getBillsOfGroupDB(groupId) {
  console.log('getBillsOfGroupDB model ran');
  const sql = 'SELECT * FROM bills';
  return executeDb(sql, [groupId]);
}

async function postBillDb(billObj) {
  console.log('postBillDb model ran');
  const { group_id, amount, description } = billObj;

  const sqlCheckGroup = 'SELECT * FROM groups WHERE id = ? ';
  const checkGroupResult = await executeDb(sqlCheckGroup, [group_id]);
  if (checkGroupResult.length === 0) {
    return { success: false, message: 'Group not found' };
  }

  const sqlInserBill = `INSERT INTO bills(group_id, amount, description)
VALUES(?,?,?)`;
  const insertBillResult = await executeDb(sqlInserBill, [group_id, amount, description]);
  if (insertBillResult.length === 1);

  return { success: true, result: checkGroupResult };
}

module.exports = {
  registerUserDb,
  findUserByEmailDb,
  addToAccountsDb,
  getAccountsAndGroupsDb,
  getBillsOfGroupDB,
  postBillDb,
};
