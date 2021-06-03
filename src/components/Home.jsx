import TodoList from './TodoList';
import { getToken } from '../utils/';

const Home = () => {
  const token = getToken();

  if (!token) {
    return <>Welcome</>
  }

  return <TodoList />;
};

export default Home;
