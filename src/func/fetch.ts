import axios from 'axios';

export const revalidate = async () => {
  return await axios
    .create({
      baseURL: 'http://localhost:3000/api',
      timeout: 5000,
    })
    .post('/revalidate', null, { params: { tags: 'products' } });
};
