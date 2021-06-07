import { Fragment, useState } from 'react';

import DateList from './DateList';
import DatePicker from './DatePicker';
import TimePicker from './TimePicker';
import NotificationPicker from './NotificationPicker';
import PriorityPicker from './PriorityPicker';

import { useFetchTaskList } from '../hooks';

import { getUser } from '../utils/';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faChevronUp, faChevronDown } from '@fortawesome/free-solid-svg-icons';

const defaultDate = new Date();
const defaultDueDate = { hours: 0, minutes: 0 };
const defaultNotification = 30;
const defaultPriority = 0;

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
      status: "ready",
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
            placeholder="Create title for new task..."
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

const getActiveStatus = (property, orientation, currentRule) =>
  `${property}/${orientation}` === currentRule ? "active" : "";

const getPropertyTitle = (str) => str[0].toUpperCase() + str.slice(1);

const SidebarPanel = ({ sortedRule, setSortedRule }) => {
  return <ul className="col-2 list-group bg-light">
    {["dueDate", "priority"].map((property) => {
      return (
        <Fragment key={property}>
          <li
            className={`list-group-item border-0 ${getActiveStatus(property, "+", sortedRule)}`}
            onClick={() => setSortedRule(`${property}/+`)}
          >
            <p>
              {getPropertyTitle(property)}
              <FontAwesomeIcon className="ms-2" icon={faChevronUp}/>
            </p>
          </li>
          <li
            className={`list-group-item border-0 ${getActiveStatus(property, "-", sortedRule)}`}
            onClick={() => setSortedRule(`${property}/-`)}
          >
            <p>
              {getPropertyTitle(property)}
              <FontAwesomeIcon className="ms-2" icon={faChevronDown}/>
            </p>
          </li>
        </Fragment>
      )})}
  </ul>;
}

const Home = () => {
  const [sortedRule, setSortedRule] = useState("dueDate/+");
  const user = getUser();
  const {
    status,
    list,
    createTask,
    updateTask,
    removeTask
  } = useFetchTaskList(user);

  if (status === "loading") {
    return <div>Loading data</div>;
  }

  return (
    <div className="container vh-100">
      <div className="d-flex">
        <SidebarPanel
          sortedRule={sortedRule}
          setSortedRule={setSortedRule}
        />
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

export default Home;
