// sessionStorage also imitation of db and server;

export const getUser = () => {
  const userStr = sessionStorage.getItem('user');
  if (userStr) {
    return JSON.parse(userStr);
  }
};

export const loginUser = ({ email, password }) => {
  const oldPassword = localStorage.getItem(`user/${email}`);
  if (!oldPassword) {
    return {
      error: { email: "The user is not registered" },
    };
  }

  if(oldPassword !== password) {
    return {
      erorr: { password: "The Password doesn't match" },
    };
  }

  const user = { id: email };
  return { token: "token", user };
}

export const saveUser = ({ email, password }) => {
  const oldPassword = localStorage.getItem(`user/${email}`);
  if (oldPassword) {
    return {
      error: { email: "The user is already registered" },
    };
  }
  localStorage.setItem(`user/${email}`, password);
  return { email, password };
};

export const getTasks = (user) => {
  const listStr = localStorage.getItem(`tasks/${user.id}`) || "[]";
  const parseDate = (task) => ({...task, date: new Date(task.date)});
  return JSON.parse(listStr).map((task) => parseDate(task));
};

export const create = (params, user) => {
  const listStr = localStorage.getItem(`tasks/${user.id}`) || "[]";
  const counter = localStorage.getItem(`counter`) || "1";

  const id = Number(counter) + 1;
  const task = { ...params, id };
  const list = JSON.parse(listStr);
  localStorage.setItem(`tasks/${user.id}`, JSON.stringify([...list, task]));
  localStorage.setItem(`counter`, id);
};

export const update = (params, user) => {
  const listStr = localStorage.getItem(`tasks/${user.id}`) || "[]";
  const list = JSON.parse(listStr).map(oldTask => {
    if (oldTask.id === params.id) {
      return {...oldTask, ...params};
    }

    return oldTask;
  });

  localStorage.setItem(`tasks/${user.id}`, JSON.stringify(list));
};

export const remove = (params, user) => {
  const listStr = localStorage.getItem(`tasks/${user.id}`) || "[]";
  const list = JSON.parse(listStr).reduce((acc, oldTask) => {
    if (oldTask.id === params.id) {
      return acc;
    }

    return [...acc, oldTask];
  }, [])

  localStorage.setItem(`tasks/${user.id}`, JSON.stringify(list));
};

export const getToken = () => {
  return sessionStorage.getItem('token');
};

export const removeUserSession = () => {
  sessionStorage.removeItem('token');
  sessionStorage.removeItem('user');
};

export const setUserSession = (token, user) => {
  sessionStorage.setItem('token', token);
  sessionStorage.setItem('user', JSON.stringify(user));
};

export const verifyToken = (token) => {
  return {
    token,
    user: sessionStorage.getItem('user'),
  };
};
