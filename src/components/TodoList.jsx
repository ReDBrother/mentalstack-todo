import { useState } from 'react';
import { Nav } from 'react-bootstrap';

import "react-datepicker/dist/react-datepicker.css";

import DateList from './DateList';
import DatePicker from './DatePicker';
import TimePicker from './TimePicker';
import NotificationPicker from './NotificationPicker';
import PriorityPicker from './PriorityPicker';

import { useFetchTaskList } from '../hooks';

import { getUser } from '../utils/';

const defaultDate = new Date();
const defaultDueDate = { hours: 0, minutes: 0 };
const defaultNotification = 30;
const defaultPriority = "Neutral";

const CreateTaskComponent = ({ createTask }) => {
  const [title, setTitle] = useState("");
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

    const params = {
      title,
      date,
      dueDate,
      notification,
      priority,
    };

    // reset form
    setTitle("");
    setDate(defaultDate);
    setDueDate(defaultDueDate);
    setNotification(defaultNotification);
    setPriority(defaultPriority);

    // create new Task
    createTask(params);
  };

  return (
    <div className="create-task-panel w-auto">
      <div className="card-footer">
        <div className="input-group flex-nowrap">
          <input
            type="text"
            aria-label="new-task-title-input"
            className="form-control"
            value={title}
            onChange={handleChangeTitle}
          />
          <button
            name="Create Task"
            aria-label="new-task-submit"
            className="btn btn-primary"
            type="submit"
            onClick={handleCreateTask}
          >
            Send
          </button>
        </div>
        <div className="d-inline-flex align-items-baseline p-2">
          <DatePicker
            value={date}
            onChange={setDate}
          />
          <TimePicker
            value={dueDate}
            onChange={setDueDate}
          />
          <NotificationPicker
            value={notification}
            onChange={setNotification} />
          <PriorityPicker
            value={priority}
            onChange={setPriority}
          />
        </div>
      </div>
    </div>
  );
};

const TodoList = () => {
  const sortedRule = "priority";
  const user = getUser();
  const {
    status,
    list,
    createTask,
    updateTask,
    removeTask,
    error,
  } = useFetchTaskList(user);

  if (status === "failureLoading") {
    return <div>{error.message}</div>;
  }

  if (status === "loading") {
    return <div>Loading data</div>;
  }

  return (
    <div className="container vh-100">
      <div className="d-flex">
        <Nav className="flex-column col-2 d-md-block bg-light sidebar"
          activeKey="/home"
        >
          <div className="sidebar-sticky"></div>
          <Nav.Item>
            <Nav.Link href="/home">
              Active
            </Nav.Link>
          </Nav.Item>
          <Nav.Item>
            <Nav.Link eventKey="link-1">
            </Nav.Link>
          </Nav.Item>
          <Nav.Item>
            <Nav.Link eventKey="link-2">
            </Nav.Link>
          </Nav.Item>
          <Nav.Item>
            <Nav.Link eventKey="disabled" disabled>
            </Nav.Link>
          </Nav.Item>
        </Nav>
        <div className="col-10">
          <DateList
            tasks={list}
            sortedRule={sortedRule}
            updateTask={updateTask}
            removeTask={removeTask}
          />
          <CreateTaskComponent createTask={createTask}/>
        </div>
      </div>
    </div>
  );
};

export default TodoList;
