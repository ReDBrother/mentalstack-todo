import { Redirect, NavLink } from 'react-router-dom';
import { Form, Button } from 'react-bootstrap';
import { useLoginForm } from '../hooks/';

const Login = ({ setToken }) => {
  const {
    emailInputProps,
    passwordInputProps,
    isLogged,
    onSubmit,
    errors,
  } = useLoginForm(setToken);

  return <>
    {
      isLogged && (
        <Redirect to="/" />
      )
    }
    <div className="row justify-content-center">
      <div className="col-6 m-2 mt-5">
        <h3 className="text-center">Login</h3>
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
          <div className="m-1 mb-2 text-center">
            <NavLink className="me-2" to='/sign-up'>Sign up</NavLink>
            <span className="text-muted">if you are not registrated</span>
          </div>
          <Button className='w-100' variant="primary" type="submit">
            Submit
          </Button>
        </Form>
      </div>
    </div>
  </>;
};

export default Login;
