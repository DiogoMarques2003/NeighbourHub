import { COMMON_AREA_TYPES } from "./constants";


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
  if(!field) {
    const { name, value } = e.target;

    setFunction(prev => ({
      ...prev,
      [name]: value
    }));
  } else {
    
    setFunction(prev => ({
      ...prev,
      [field]: e
    }));
  }
  
};

export { getToken, setToken, removeToken, encodeQueryData, getCommonAreaTypeName, handleFormDataChange };
