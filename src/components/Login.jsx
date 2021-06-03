import { NavLink, Redirect } from 'react-router-dom';
import { useLoginForm } from '../hooks/';

const Login = () => {
  const {
    emailInputProps,
    passwordInputProps,
    isLogged,
    onSubmit,
    errors,
  } = useLoginForm();

  return <>
    {
      isLogged && (
        <Redirect to="/" state="Successful Sign In" />
      )
    }
    {
      errors && errors.message && (
        <Redirect to="/sign-in" state={errors.message} />
      )
    }
    <form onSubmit={onSubmit}>
      <input
        id="email"
        type="email"
        {...emailInputProps}
      />
      {errors.email && <>{errors.email}</>}
      <input
        id="password"
        type="password"
        {...passwordInputProps}
      />
      {errors.password && <>{errors.password}</>}
      <button type="submit">Login</button>
      <NavLink activeClassName="active" to="/sign-up">SignUp</NavLink>
    </form>
  </>;
};

export default Login;
