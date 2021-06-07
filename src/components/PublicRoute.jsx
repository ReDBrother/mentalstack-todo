import { Route, Redirect } from 'react-router-dom';

import { getToken } from '../utils/';

const PublicRoute = ({ component: Component, setToken, ...rest }) => {
  return (
    <Route
      {...rest}
      render={(props) => !getToken() ? <Component {...props} setToken={setToken} /> : <Redirect to={{ pathname: '/' }} />}
    />
  )
}

export default PublicRoute;
