// libraries

const getMe = (axios) => async (payload) => {
  const res = await axios().get('/users/me', payload);
  return res.data;
};

export default { getMe };
