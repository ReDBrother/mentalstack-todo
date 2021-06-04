// sessionStorage also imitation of db and server;

export const getUser = () => {
  const userStr = sessionStorage.getItem('user');
  if (userStr) {
    return JSON.parse(userStr);
  }
};

export const loginUser = ({ email, password }) => {
  const oldPassword = sessionStorage.getItem(`user/${email}`);
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
  const oldPassword = sessionStorage.getItem(`user/${email}`);
  if (oldPassword) {
    return {
      error: { email: "The user is already registered" },
    };
  }
  sessionStorage.setItem(`user/${email}`, password);
  return { email, password };
};

export const getTasks = (user) => {
  const listStr = sessionStorage.getItem(`tasks/${user.email}`) || "[]";
  const parseDate = (task) => ({...task, date: new Date(task.date)});
  return JSON.parse(listStr).map((task) => parseDate(task));
};

export const create = (params, user) => {
  const listStr = sessionStorage.getItem(`tasks/${user.email}`) || "[]";
  const counter = sessionStorage.getItem(`counter`) || "1";

  const id = Number(counter) + 1;
  const task = { ...params, id };
  const list = JSON.parse(listStr);
  sessionStorage.setItem(`tasks/${user.email}`, JSON.stringify([...list, task]));
  sessionStorage.setItem(`counter`, id);
};

export const update = (params, user) => {
  const listStr = sessionStorage.getItem(`tasks/${user.email}`) || "[]";
  const list = JSON.parse(listStr).map(oldTask => {
    if (oldTask.id === params.id) {
      return {...oldTask, ...params};
    }

    return oldTask;
  });

  sessionStorage.setItem(`tasks/${user.email}`, JSON.stringify(list));
};

export const remove = (params, user) => {
  const listStr = sessionStorage.getItem(`tasks/${user.email}`) || "[]";
  const list = JSON.parse(listStr).reduce((acc, oldTask) => {
    if (oldTask.id === params.id) {
      return acc;
    }

    return [...acc, oldTask];
  }, [])

  sessionStorage.setItem(`tasks/${user.email}`, JSON.stringify(list));
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

export const getTimeTitle = (value) => {
  return `${getTimeText(value.hours)}:${getTimeText(value.minutes)}`
};

export const getTimeText = (value) => {
  if (value < 10) {
    return `0${value}`;
  }

  return `${value}`;
};

const notificationsToStr = {
  5: "5 min.",
  30: "30 min.",
  60: "1 hour.",
  [60 * 3]: "3 hours.",
  [60 * 24]: "1 day.",
  [60 * 24 * 7]: "1 week.",
};

export const getNotificationTitle = (value) => notificationsToStr[value];
