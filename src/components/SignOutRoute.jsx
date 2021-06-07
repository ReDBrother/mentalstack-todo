import { Route, Redirect } from 'react-router-dom';

import { getToken, removeUserSession } from '../utils/';

const SignOutRoute = ({ component: Component, setToken, ...rest }) => {
  removeUserSession();
  setToken(undefined);

  return (
    <Route
      {...rest}
      render={(props) => getToken() ? <Component {...props} setToken={setToken}/> : <Redirect to={{ pathname: '/sign-in', state: { from: props.location } }} />}
    />
  )
}

export default SignOutRoute;
