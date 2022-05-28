const groupId = +localStorage.getItem('groupId');
const groupName = localStorage.getItem('groupName');

localStorage.removeItem('groupId');
localStorage.removeItem('groupName');

console.log('groupId ===', groupId);
console.log('groupName ===', groupName);
