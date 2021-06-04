import { faChevronDown, faChevronUp, faTrash } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { useState } from 'react';
import {getNotificationTitle, getTimeTitle} from '../utils';
import NotificationPicker from './NotificationPicker';
import PriorityPicker from './PriorityPicker';
import TimePicker from './TimePicker';

const days = ["Monday", "Tuesday", "Wedenesday", "Thursday", "Friday", "Saturday", "Sunday"];
const months = ["January", "February", "March", "April", "May", "June", "July", "August", "September", "October", "November", "December"];

const getTaskTitle = (date) => `${days[date.getDay()]}, ${months[date.getMonth()]} ${date.getDate()}`

const DateList = ({ tasks, sortedRule, updateTask, removeTask }) => {
  const dates = tasks.reduce((acc, task) => {
    const taskTitle = getTaskTitle(task.date);
    if (!acc[taskTitle]) {
      return {...acc, [taskTitle]: [task]};
    }

    return {...acc, [taskTitle]: [...acc[taskTitle], task]};
  }, {});

  const components = Object.keys(dates)
    .sort((a, b) => new Date(a) > new Date(b) ? 1 : -1)
    .map(title => {
      const dateTasks = dates[title];

      return <DateComponent
        key={title}
        title={title}
        tasks={dateTasks}
        sortedRule={sortedRule}
        updateTask={updateTask}
        removeTask={removeTask}
      />
    });
  return <>{components}</>;
};

const DateComponent = ({ title, tasks, sortedRule, updateTask, removeTask }) => {
  const [isClosed, setIsClosed] = useState(false);
  const chevrone = isClosed ? faChevronDown : faChevronUp;

  return (
    <>
      <div className="ps-3">
        <div className="d-flex mb-2">
          <h3 className="m-0">{title}</h3>
          <button
            className="input-group-text border-0 bg-transparent"
            onClick={() => setIsClosed(!isClosed)}
          >
            <FontAwesomeIcon icon={chevrone} />
          </button>
        </div>
        <div className="ms-task-list">
          {!isClosed && tasks.map(task => <Task key={task.id} task={task} updateTask={updateTask} removeTask={removeTask}/>)}
        </div>
      </div>
    </>
  );
};

const Task = ({ task , updateTask, removeTask }) => {
  const [status, setStatus] = useState(task.status);
  const { id, title, description, dueDate, notification, priority } = task;

  const toggleStatus = () => {
    status === "done"
      ? setStatus("waiting")
      : setStatus("done");
  }

  return (
    <div key={id} className="d-flex p-2">
      <div>
        <input
          type="checkbox"
          className="me-2 mt-1"
          name={status}
          onChange={toggleStatus}
          checked={status === "done"}
        />
      </div>
      <div className="d-flex-column">
        <div>
          <input
            type="text"
            className="input-control border-0 bg-transparent mb-1"
            value={title}
            onChange={event => {
              updateTask({ id, title: event.target.value });
            }}
          />
        </div>
        <div>
          <input
            type="text"
            className="input-control text-muted border-0 bg-transparent mb-3"
            placeholder="Add some description..."
            value={description}
            onChange={event => {
              updateTask({ id, description: event.target.value })
            }}
          />
        </div>
        <div className="d-inline-flex align-items-baseline">
          <PriorityPicker
            value={priority}
            onChange={newPriority => {
              updateTask({ id, priority: newPriority });
            }}
          />
          <span className="mx-1 me-4">{`${priority} Priority`}</span>
          <TimePicker
            value={dueDate}
            onChange={(newDueDate) => {
              updateTask({ id, dueDate: newDueDate });
            }}
          />
          <span className="mx-1 me-4">{getTimeTitle(dueDate)}</span>
          <NotificationPicker
            value={notification}
            onChange={(newNotification) => {
              updateTask({ id, notification: newNotification });
            }}
          />
          <span className="mx-1">{getNotificationTitle(notification)}</span>
        </div>
      </div>
      <div className="ms-auto">
        <button
          className="input-group-text border-0 bg-transparent"
          data-confirm="Are you sure you want to delete the task"
          onClick={() => {
            removeTask({ id });
          }}
        >
          <FontAwesomeIcon icon={faTrash} className="text-danger" />
        </button>
      </div>
    </div>
  );
};

export default DateList;
