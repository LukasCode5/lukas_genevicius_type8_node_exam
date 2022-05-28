// eslint-disable-next-line import/no-mutable-exports
export let errorsArr = [];

export function clearErrorsArr() {
  errorsArr = [];
}

function addError(message, field) {
  errorsArr.push({
    message,
    field,
  });
  // console.log('errorsArr ===', errorsArr);
}

export function checkInput(valueToCheck, field, rulesArr) {
  // eslint-disable-next-line no-restricted-syntax
  for (const rule of rulesArr) {
    if (rule === 'required') {
      if (valueToCheck === '') {
        addError('This field is required', field);
        return;
      }
    }
    if (rule === 'positive') {
      if (valueToCheck < 0) {
        addError('must be positive', field);
        return;
      }
    }
    if (rule.split('-')[0] === 'minLength') {
      const min = rule.split('-')[1];
      if (valueToCheck.length <= min) {
        addError(`Too short. Length must be more than ${min}`, field);
      }
    }
    if (rule.split('-')[0] === 'maxLength') {
      const max = rule.split('-')[1];
      if (valueToCheck.length >= max) {
        addError(`Too long. Length must be less than ${max}`, field);
      }
    }
    if (rule === 'fullName') {
      if (valueToCheck.split(' ').length === 1) {
        addError('Please enter first and last name', field);
        return;
      }
    }
    if (rule.split('-')[0] === 'regPassword') {
      const repeatPassword = rule.split('-')[1];
      if (valueToCheck !== repeatPassword) {
        addError('Both password fields must match', field);
        return;
      }
    }
  }
}
