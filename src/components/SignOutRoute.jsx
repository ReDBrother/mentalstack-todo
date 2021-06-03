import { Route, Redirect } from 'react-router-dom';

import { getToken, removeUserSession } from '../utils/';

function SignOutRoute({ component: Component, ...rest }) {
  removeUserSession();

  return (
    <Route
      {...rest}
      render={(props) => getToken() ? <Component {...props} /> : <Redirect to={{ pathname: '/sign-in', state: { from: props.location } }} />}
    />
  )
}

export default SignOutRoute;
