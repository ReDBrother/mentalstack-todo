import { Route, Redirect } from 'react-router-dom';
import Welcome from './Welcome';

import { getToken } from '../utils/';

const PublicRoute = ({ component: Component, ...rest }) => {
  return (
    <Route
      {...rest}
      render={(props) => getToken() ? <Component {...props} /> : <Welcome />}
    />
  )
}

export default PublicRoute;
