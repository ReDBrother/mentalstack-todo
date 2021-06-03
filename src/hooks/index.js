import { useState, useEffect } from 'react';
import axios from 'axios'
import _ from 'lodash';

import { setUserSession, removeUserSession } from '../utils/';
import { validateEmail, validatePassword } from '../utils/validators';

export const useFetchTaskList = (user) => {
  const [status, setStatus] = useState("loading");
  const [list, setList] = useState([
    {id: 1, title: "hi", description: "", priority: "Important"},
    {id: 2, title: "hello", priority: "Urgently"},
  ]);
  const [error, setError] = useState();

  useEffect(() => {
    //   axios.get(`/todos/${user.id}`)
    //     .then(response => {
    setStatus("successLoading");
    //       setList(response.list);
    //     })
    //     .catch(error => {
    //       setStatus("failureLoading");
    //       setError(error);
    //     });
  }, []);

  const addTask = (task) => {
    axios.post(`/todos/${user.id}/task`, task)
      .then((response) => {
        setList([...list, response.task]);
      })
      .catch(setError);
  };

  const updateTask = (task) => {
    axios.update(`/todos/${user.id}/task`, task)
      .then((response) => {
        const newList = list.map(task => {
          if (task.id === response.task.id) {
            return response.task;
          }

          return task;
        });

        setList(newList);
      })
      .catch(setError);
  };

  const removeTask = (task) => {
    axios.delete(`/todos/${user.id}/task`, task)
      .then((response) => {
        const newList = list
          .filter(task => task.id !== response.task.id);

        setList(newList);
      })
      .catch(setError);
  };

  return {
    list,
    status,
    addTask,
    updateTask,
    removeTask,
    error,
  };
}

export const useLogin = (token) => {
  const [authLoading, setAuthLoading] = useState(true);

  useEffect(() => {
    if (!token) {
      return;
    }

    axios.get(`/verifyToken?token=${token}`)
      .then(response => {
        setUserSession(response.data.token, response.data.user);
      })
      .catch(() => {
        removeUserSession();
      })
      .then(() =>{
        setAuthLoading(false);
      });
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
      newErrors.confirmPassword = "Password do not match";
    }

    if (!_.isEmpty(newErrors)) {
      setErrors(newErrors);
    } else {
      axios.post("/users", {})
        .then(() => {
          setIsRegistered(true);
        })
        .catch((error) => {
          setErrors({ message: error.message });
        });
    }
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
      axios.post("/login", { email, password })
        .then((response) => {
          setUserSession(response.token, response.user);
          setIsLogged(true);
        })
        .catch((error) => {
          setErrors({ message: error.message });
        });
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
