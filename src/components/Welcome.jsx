import { NavLink } from 'react-router-dom';

const Welcome = () => {
  return (<>
    <div className="p-5 bg-light rounded-3 my-2">
      <div className="container-fluid">
        <h1 className="display-4 fw-bold">Welcome to Mentalstack ToDo</h1>
        <NavLink className="btn btn-primary btn-lg" to="/sign-in">Sign In</NavLink>
      </div>
    </div>
  </>);
};

export default Welcome;
