import axios from 'axios';
export const makeAPIRequest = ({method, url, data, headers, params}) =>
  new Promise((resolve, reject) => {
    const option = {
      method,
      baseURL: 'https://www.themealdb.com/api/json/v1/1/categories.php',
      url,
      data,
      headers,
      params,
    };
    axios(option)
      .then(response => {
        if (response.status === 200 || response.status === 201) {
          resolve(response);
        } else {
          reject(response);
        }
      })
      .catch(error => {
        console.log('axios error :::', error);
        if (error?.response?.status === 401) {
          console.log('errrr :>> ');
        }
        reject(error);
      });
  });
