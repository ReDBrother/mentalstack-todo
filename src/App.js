import { BrowserRouter, Switch, Route } from 'react-router-dom';

import Home from './components/Home';
import Registration from './components/Registration';
import Login from './components/Login';
import PublicRoute from './components/PublicRoute';
import SignOutRoute from './components/SignOutRoute';

import { useLogin } from './hooks/';
import { getToken } from './utils/';

function App() {
  const token = getToken();
  const authLoading = useLogin(token);

  if (authLoading && token) {
    return <div className="container">Checking Authentication...</div>;
  }

  return (
    <div className="App">
      <BrowserRouter>
        <header className="row py-4">
          <h1>Mentalstack ToDo</h1>
        </header>
        <main>
          <Switch>
            <Route exact path="/" component={Home} />
            <PublicRoute path="/sign-in" component={Login} />
            <PublicRoute path="/sign-up" component={Registration} />
            <SignOutRoute path="/sign-out" component={Login} />
          </Switch>
        </main>
      </BrowserRouter>
    </div>
  );
}

export default App;
