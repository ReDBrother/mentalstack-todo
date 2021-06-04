import { useState, useEffect } from 'react';
import _ from 'lodash';

import {
  saveUser,
  loginUser,
  setUserSession,
  removeUserSession,
  getTasks,
  create,
  update,
  remove,
  verifyToken,
} from '../utils/';

import { validateEmail, validatePassword } from '../utils/validators';

export const useFetchTaskList = (user) => {
  const [status, setStatus] = useState("loading");
  const [list, setList] = useState([]);

  useEffect(() => {
    setList(getTasks(user));
    setStatus("successLoading");
  }, []);

  const createTask = (task) => {
    create(task, user);
    setList(getTasks(user));
  };

  const updateTask = (task) => {
    update(task, user);
    setList(getTasks(user));
  };

  const removeTask = (task) => {
    remove(task, user);
    setList(getTasks(user));
  };

  return {
    list,
    status,
    createTask,
    updateTask,
    removeTask,
  };
}

export const useLogin = (token) => {
  const [authLoading, setAuthLoading] = useState(true);

  useEffect(() => {
    if (!token) {
      return;
    }

    const { token: newToken, user } = verifyToken(token);
    if (newToken) {
      setUserSession(newToken, user);
    } else {
      removeUserSession(false);
    }

    setAuthLoading(false);
  }, []);

  return authLoading;
};

const handleChange = (callback) => (event) => {
  callback(event.target.value);
};

export const useRegistrationForm = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [errors, setErrors] = useState({});
  const [isRegistered, setIsRegistered] = useState(false);

  const onSubmit = (event) => {
    event.preventDefault();

    const newErrors = {};

    const emailValidationStatus = validateEmail(email);

    if (!emailValidationStatus.result) {
      newErrors.email = emailValidationStatus.message;
    }

    const passwordValidationStatus = validatePassword(password);

    if (!passwordValidationStatus.result) {
      newErrors.password = passwordValidationStatus.message;
    }

    if (password !== confirmPassword) {
      newErrors.confirmPassword = "The password doesn't match";
    }

    if (!_.isEmpty(newErrors)) {
      setErrors(newErrors);
      return;
    }

    const result = saveUser({ email, password });
    if (result.error) {
      console.log(result);
      setErrors(result.error);
      return;
    }

    setIsRegistered(true);
  };

  return {
    emailInputProps: { value: email, onChange: handleChange(setEmail) },
    passwordInputProps: { value: password, onChange: handleChange(setPassword) },
    confirmPasswordInputProps: { value: confirmPassword, onChange: handleChange(setConfirmPassword) },
    isRegistered,
    onSubmit,
    errors,
  };
};

export const useLoginForm = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [errors, setErrors] = useState({});
  const [isLogged, setIsLogged] = useState(false);

  const onSubmit = (event) => {
    event.preventDefault();

    const newErrors = {};

    const emailValidationStatus = validateEmail(email);

    if (!emailValidationStatus.result) {
      newErrors.email = emailValidationStatus.message;
    }

    const passwordValidationStatus = validatePassword(password);

    if (!passwordValidationStatus.result) {
      newErrors.password = passwordValidationStatus.message;
    }

    if (!_.isEmpty(newErrors)) {
      setErrors(newErrors);
    } else {
      const result = loginUser({ email, password });

      if (result.error) {
        setErrors(result.error);
      } else {
        setUserSession(result.token, result.user);
        setIsLogged(true);
      }
    }
  };

  return {
    emailInputProps: { value: email, onChange: handleChange(setEmail) },
    passwordInputProps: { value: password, onChange: handleChange(setPassword) },
    onSubmit,
    isLogged,
    errors,
  };
}
