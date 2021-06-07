import { BrowserRouter, Switch, NavLink } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import { Alert } from 'react-bootstrap';

import Home from './components/Home';
import Registration from './components/Registration';
import Login from './components/Login';
import PrivateRoute from './components/PrivateRoute';
import PublicRoute from './components/PublicRoute';
import SignOutRoute from './components/SignOutRoute';

import { useLogin } from './hooks/';
import { actions } from './slices/';

function App() {
  const { token, setToken } = useLogin();
  const dispatch = useDispatch();
  const alert = useSelector(state => {
    return state.alert;
  });

  return (
    <BrowserRouter>
      <header>
        <nav className="navbar navbar-expand-md navbar-light bg-light px-2">
          <a className="navbar-brand text-muted" href="/">Mentalstack ToDo</a>
          <button
            type="button"
            className="navbar-toggler"
            data-bs-toggle="collapse"
            data-bs-target="#navbarCollapse"
            aria-controls="navbarCollapse"
            aria-expanded="false"
            aria-label="Toggle navigation"
          >
            <span
              className="navbar-toggler-icon"
            ></span>
          </button>
          <div
            id="navbarCollapse"
            className="collapse navbar-collapse"
          >
            <ul
              className="navbar-nav ms-auto"
            >
              {token && <li className="nav-item">
                <NavLink className="mx-2" to="/sign-out">Sign Out</NavLink>
              </li>}
              {!token && <>
                <li className="nav-item">
                  <NavLink className="mx-2" to="/sign-in">Sign In</NavLink>
                </li>
                <li className="nav-item">
                  <NavLink className="mx-2" to="/sign-up">Sign Up</NavLink>
                </li>
              </>}
            </ul>
          </div>
        </nav>
      </header>
      {
        alert.status &&
          <Alert
            variant={alert.status}
            onClose={() => dispatch(actions.clearAlert())}
            dismissible
          >
            <span className="ps-2">{alert.message}</span>
          </Alert>
      }
      <main>
        <Switch>
          <PrivateRoute exact path="/" component={Home} />
          <PublicRoute path="/sign-in" component={Login} setToken={setToken}/>
          <PublicRoute path="/sign-up" component={Registration} />
          <SignOutRoute path="/sign-out" component={Login} setToken={setToken}/>
        </Switch>
      </main>
    </BrowserRouter>
  );
}

export default App;
