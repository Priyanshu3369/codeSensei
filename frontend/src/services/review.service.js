import api from './api';

export const fetchReviews = async () => {
  const token = localStorage.getItem('token');

  const res = await api.get('/reviews', {
    headers: {
      Authorization: `Bearer ${token}`
    }
  });

  return res.data;
};
