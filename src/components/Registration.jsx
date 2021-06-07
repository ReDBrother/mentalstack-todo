import { Redirect, NavLink } from 'react-router-dom';
import { Form, Button } from 'react-bootstrap';
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
        <Redirect to="/sign-in" />
      )
    }
    <div className="row justify-content-center">
      <div className="col-6 m-2 mt-5">
        <Form onSubmit={onSubmit}>
          <h3 className="text-center">Registration</h3>
          <Form.Group className="my-2" controlId="email">
            <Form.Label>E-mail</Form.Label>
            <Form.Control type="email" {...emailInputProps} isInvalid={errors && errors.email} required/>
            {
              errors && errors.email &&
                <Form.Control.Feedback type="invalid">{errors.email}</Form.Control.Feedback>
            }
          </Form.Group>
          <Form.Group className="my-2" controlId="password">
            <Form.Label>Password</Form.Label>
            <Form.Control type="password" {...passwordInputProps} isInvalid={errors && errors.password} required/>
            {
              errors && errors.password &&
                <Form.Control.Feedback type="invalid">{errors.password}</Form.Control.Feedback>
            }
          </Form.Group>
          <Form.Group className="my-2" controlId="confirmPassword">
            <Form.Label>Confirm password</Form.Label>
            <Form.Control type="password" {...confirmPasswordInputProps} isInvalid={errors && errors.confirmPassword} required/>
            {
              errors && errors.confirmPassword &&
                <Form.Control.Feedback type="invalid">{errors.confirmPassword}</Form.Control.Feedback>
            }
          </Form.Group>
          <div className="m-1 mb-2 text-center">
            <NavLink className="me-2" to='/sign-in'>Sign in</NavLink>
            <span className="text-muted">if you already registrated</span>
          </div>
          <Button className='w-100' variant="primary" type="submit">
            Submit
          </Button>
        </Form>
      </div>
    </div>
  </>;
};

export default Registration;
