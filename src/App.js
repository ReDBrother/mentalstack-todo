import { BrowserRouter, NavLink, Switch, Route } from 'react-router-dom';

import Home from './components/Home';
import Registration from './components/Registration';
import Login from './components/Login';
import PublicRoute from './components/PublicRoute';
import SignOutRoute from './components/SignOutRoute';

import { useLogin } from './hooks/';
import { getToken } from './utils/';

import 'bootstrap/dist/css/bootstrap.css';

function App() {
  const token = getToken();
  const authLoading = useLogin();

  if (authLoading && token) {
    return <div className="content">Checking Authentication...</div>;
  }

  return (
    <div className="App">
      <BrowserRouter>
        <div>
          <div className="header">
            <NavLink exact activeClassName="active" to="/">Home</NavLink>
            {!token && <>
              <NavLink activeClassName="active" to="/sign-in">Login</NavLink>
              <NavLink activeClassName="active" to="/sign-up">Registration</NavLink>
            </>}
            {token && <NavLink activeClassName="active" to="/sign-out">Sign Out</NavLink>}
          </div>
          <div className="content">
            <Switch>
              <Route exact path="/" component={Home} />
              <PublicRoute path="/sign-in" component={Login} />
              <PublicRoute path="/sign-up" component={Registration} />
              <SignOutRoute path="/sign-out" component={Login} />
            </Switch>
          </div>
        </div>
      </BrowserRouter>
    </div>
  );
}

export default App;
