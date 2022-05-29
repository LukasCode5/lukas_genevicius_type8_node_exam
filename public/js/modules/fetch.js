const baseURL = 'http://127.0.0.1:3000/api';

// eslint-disable-next-line consistent-return
export async function getFetch(endpoint) {
  try {
    const response = await fetch(`${baseURL}/${endpoint}`);
    const dataInJs = await response.json();
    // console.log('dataInJs ===', dataInJs);
    return dataInJs;
  } catch (error) {
    console.log('error in getFetch', error);
  }
}

// eslint-disable-next-line consistent-return
export async function getFetchToken(endpoint, token) {
  try {
    const response = await fetch(`${baseURL}/${endpoint}`, {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    });
    const dataInJs = await response.json();
    //  console.log('dataInJs ===', dataInJs);
    return dataInJs;
  } catch (error) {
    console.log('error getFetchToken', error);
  }
}

// eslint-disable-next-line consistent-return
export async function postFetch(endpoint, postObj) {
  try {
    const response = await fetch(`${baseURL}/${endpoint}`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(postObj),
    });
    const dataInJs = await response.json();
    // console.log('dataInJs ===', dataInJs);
    return dataInJs;
  } catch (error) {
    console.log('error postFetch', error);
  }
}

// eslint-disable-next-line consistent-return
export async function postFetchToken(endpoint, postObjWithToken) {
  try {
    const response = await fetch(`${baseURL}/${endpoint}`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(postObjWithToken),
    });
    const dataInJs = await response.json();
    // console.log('dataInJs ===', dataInJs);
    return dataInJs;
  } catch (error) {
    console.log('error postFetchToken', error);
  }
}
