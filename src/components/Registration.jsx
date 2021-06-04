import { Redirect } from 'react-router-dom';
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
        <Redirect to="/sign-in" state="Successful Registered" />
      )
    }
    <Form onSubmit={onSubmit}>
      <Form.Group className="my-2" controlId="email">
        <Form.Label>E-mail</Form.Label>
        <Form.Control type="email" {...emailInputProps} isInvalid={errors && errors.email} required/>
        {
          errors && errors.email &&
            <Form.Control.Feedback type="invalid">{errors.email}</Form.Control.Feedback>
        }
      </Form.Group>
      <Form.Group clasName="my-2" controlId="password">
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
      <Button variant="primary" type="submit">
        Submit
      </Button>
    </Form>
  </>;
};

export default Registration;
