import { Redirect } from 'react-router-dom';
import { Form, Button } from 'react-bootstrap';
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
    <Form onSubmit={onSubmit}>
      <Form.Group className="my-2" controlId="email">
        <Form.Label>E-mail</Form.Label>
        <Form.Control type="email" {...emailInputProps} isInvalid={errors && errors.email}required/>
        {
          errors && errors.email &&
            <Form.Control.Feedback type="invalid">{errors.email}</Form.Control.Feedback>
        }
      </Form.Group>
      <Form.Group className="my-2" controlId="password">
        <Form.Label>Password</Form.Label>
        <Form.Control type="password" {...passwordInputProps} isInvalid={errors && errors.password}required/>
        {
          errors && errors.password &&
            <Form.Control.Feedback type="invalid">{errors.password}</Form.Control.Feedback>
        }
      </Form.Group>
      <Button variant="primary" type="submit">
        Submit
      </Button>
    </Form>
  </>;
};

export default Login;
