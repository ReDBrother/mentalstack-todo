import { NavLink, Redirect } from 'react-router-dom';
import { useRegistrationForm } from '../hooks/';

const Registration = () => {
  const {
    emailInputProps,
    passwordInputProps,
    confirmPasswordInputProps,
    isRegistered,
    onSubmit,
    errors,
  } = useRegistrationForm();

  return <>
    {
      isRegistered && (
        <Redirect to="/sign-in" state="Successful Registered" />
      )
    }
    {
      errors && errors.message && (
        <Redirect to="/sign-up" state={errors.message} />
      )
    }
    <form onSubmit={onSubmit}>
      <input
        id="email"
        type="email"
        {...emailInputProps} />
      {errors.email && <>{errors.email}</>}
      <input
        id="password"
        type="password"
        {...passwordInputProps} />
      {errors.password && <>{errors.password}</>}
      <input
        id="confirmPassword"
        type="password"
        {...confirmPasswordInputProps} />
      {errors.confirmPassword && <>{errors.confirmPassword}</>}
      <button type="submit">Registration</button>
      <NavLink activeClassName="active" to="/sign-in">SignIn</NavLink>
    </form>
  </>;
};

export default Registration;
