// libraries
import api from './api';

const signIn = async (payload) => {
  const res = await api().post('/auth/signin', payload);
  return res.data;
};

const signUp = async (payload) => {
  const res = await api().post('/auth/signup', payload);

  return res.data;
};

export default { signIn, signUp };
