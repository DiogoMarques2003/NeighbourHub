const getToken = () => localStorage.getItem('token');
const setToken = (token) => localStorage.setItem('token', token);
const removeToken = () => localStorage.removeItem('token');

const encodeQueryData = (data = {}) => {
  const queryStrings = [];
  for (let query in data) {
    if (typeof data[query] === 'undefined') continue;
    queryStrings.push(encodeURIComponent(query) + '=' + encodeURIComponent(data[query]));
  }
  return `?${queryStrings.join('&')}`;
};

const getTypeName = (type) => {
  const types = {
    1: 'Lazer',
    2: 'Fitness',
  };
  return types[type] || 'Outros';
};

export { getToken, setToken, removeToken, encodeQueryData, getTypeName };
