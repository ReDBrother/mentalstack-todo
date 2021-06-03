export const getUser = () => {
  const userStr = sessionStorage.getItem('user');
  if (userStr) {
    return JSON.parse(userStr);
  }
}

export const getToken = () => {
  return sessionStorage.getItem('token');
}

export const removeUserSession = () => {
  sessionStorage.removeItem('token');
  sessionStorage.removeItem('user');
}

export const setUserSession = (token, user) => {
  sessionStorage.setItem('token', token);
  sessionStorage.setItem('user', JSON.stringify(user));
}
