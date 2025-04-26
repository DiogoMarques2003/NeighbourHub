import { COMMON_AREA_TYPES } from './constants';

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

const getCommonAreaTypeName = (type) => {
  return COMMON_AREA_TYPES[type] || 'Outros';
};

const handleFormDataChange = (e, setFunction, field) => {
  if (!field) {
    const { name, value } = e.target;

    setFunction((prev) => ({
      ...prev,
      [name]: value,
    }));
  } else {
    setFunction((prev) => ({
      ...prev,
      [field]: e,
    }));
  }
};

function dateFormat(date) {
  const day = String(date.getDate()).padStart(2, '0');
  const month = String(date.getMonth() + 1).padStart(2, '0');
  const year = date.getFullYear();
  const hours = String(date.getHours()).padStart(2, '0');
  const minutes = String(date.getMinutes()).padStart(2, '0');

  return `${day}/${month}/${year} ${hours}:${minutes}`;
}

export { getToken, setToken, removeToken, encodeQueryData, getCommonAreaTypeName, handleFormDataChange, dateFormat };
