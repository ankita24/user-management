import axios from 'axios';

const URL = 'http://demo9197058.mockable.io/users';

export const getUser = () => {
  return axios.get(URL).then(({ data }) => data);
};
