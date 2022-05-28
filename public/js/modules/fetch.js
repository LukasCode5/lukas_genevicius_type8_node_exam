const baseURL = 'http://127.0.0.1:3000/api';

export async function getFetch(endpoint) {
  try {
    const response = await fetch(`${baseURL}/${endpoint}`);
    const dataInJs = await response.json();
    console.log('dataInJs ===', dataInJs);
    return dataInJs;
  } catch (error) {
    console.log('error in getFetch', error);
  }
}

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
    console.log('error postFetch', error);
  }
}
