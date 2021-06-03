import { useState } from 'react';
import DatePicker from 'react-date-picker';
import TimePicker from 'react-time-picker';

import DateList from './DateList';
import NotificationPicker from './NotificationPicker';
import PriorityPicker from './PriorityPicker';

import { useFetchTaskList } from '../hooks';

import { getUser } from '../utils/';

const CreateTaskComponent = ({ addTask }) => {
  const defaultDate = new Date();
  const defaultDueDate = "23:59";
  const defaultNotification = 30;
  const defaultPriority = "Neutral";

  const [title, setTitle] = useState();
  const [date, setDate] = useState(defaultDate);
  const [dueDate, setDueDate] = useState(defaultDueDate);
  const [notification, setNotification] = useState(defaultNotification);
  const [priority, setPriority] = useState(defaultPriority);

  const handleChangeTitle = (event) => setTitle(event.target.value);
  const handleCreateTask = (event) => {
    event.preventDefault();

    if (!title) {
      return;
    }

    const task = {
      title,
      date,
      dueDate,
      notification,
      priority,
    };

    // reset form
    setTitle();
    setDate(defaultDate);
    setDueDate(defaultDueDate);
    setNotification(defaultNotification);
    setPriority(defaultPriority);

    // create new Task
    addTask(task);
  };

  return (
    <>
      <form onSubmit={handleCreateTask}>
        <div className="form-group">
          <input type="text" className="form-control" value={title} onChange={handleChangeTitle} />
          <button className="btn btn-primary form-control" type="submit" >Send</button>
        </div>
        <div className="d-inline-flex p-2">
          <DatePicker selected={date} onChange={setDate} />
          <TimePicker value={dueDate} onChange={setDueDate} />
          <NotificationPicker value={notification} onChange={setNotification} />
          <PriorityPicker value={priority} onChange={setPriority} />
        </div>
      </form>
    </>
  );
};

const TodoList = () => {
  const [sortedRule, setSortedRule] = useState("priority");

  const user = getUser();
  const {status, list, addTask, error} = useFetchTaskList(user);

  if (status === "failureLoading") {
    return <div>{error.message}</div>;
  }

  if (status === "loading") {
    return <div>Loading data</div>;
  }

  return (<>
    <nav></nav>
    <div>
      <DateList list={list} sortedRule={sortedRule} />
      <CreateTaskComponent addTask={addTask}/>
    </div>
  </>);
};

export default TodoList;
