import { faChevronDown, faChevronUp, faTrash } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { useState } from 'react';
import {Button, Modal} from 'react-bootstrap';
import NotificationPicker from './NotificationPicker';
import PriorityPicker from './PriorityPicker';
import TimePicker from './TimePicker';

const days = ["Monday", "Tuesday", "Wedenesday", "Thursday", "Friday", "Saturday", "Sunday"];
const months = ["January", "February", "March", "April", "May", "June", "July", "August", "September", "October", "November", "December"];

const getTaskTitle = (date) => `${days[date.getDay()]}, ${months[date.getMonth()]} ${date.getDate()}`

const sortByRule = (rule) => (a, b) => {
  switch(rule) {
    case "priority/+": return b.priority - a.priority;
    case "priority/-": return a.priority - b.priority;
    case "dueDate/+": {
      const hoursDiff = a.dueDate.hours - b.dueDate.hours;
      const minutesDiff = a.dueDate.minutes - b.dueDate.minutes;
      return hoursDiff * 60 + minutesDiff;
    }
    case "dueDate/-": {
      const hoursDiff = b.dueDate.hours - a.dueDate.hours;
      const minutesDiff = b.dueDate.minutes - a.dueDate.minutes;
      return hoursDiff * 60 + minutesDiff;
    }
    default:
      throw new Error("Unnexpected sorted rule");
  }
};

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


  if (tasks.length === 0) {
    return <div className="mt-5 w-100 h-100 text-center">You don't have a tasks</div>
  }

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
          {!isClosed && tasks
              .sort(sortByRule(sortedRule))
              .map(task =>
                <Task
                  key={task.id}
                  task={task}
                  updateTask={updateTask}
                  removeTask={removeTask}
                />
              )}
        </div>
      </div>
    </>
  );
};

const RemoveTaskButton = ({ removeTask }) => {
  const [show, setShow] = useState(false);

  const handleShow = () => setShow(true);
  const handleClose = () => setShow(false);

  return(<>
    <Button
      className="input-group-text border-0 bg-transparent"
      aria-label="remove-task-submit"
      onClick={handleShow}
    >
      <FontAwesomeIcon icon={faTrash} className="text-danger" />
    </Button>
    <Modal show={show} onHide={handleClose}>
      <Modal.Header closeButton>
        <Modal.Title>Warning</Modal.Title>
      </Modal.Header>
      <Modal.Body>Are you sure you want to delete the task</Modal.Body>
      <Modal.Footer>
        <Button variant="secondary" onClick={handleClose}>
          Abort
        </Button>
        <Button variant="danger" aria-label="remove-confirm" onClick={removeTask}>
          Delete Task
        </Button>
      </Modal.Footer>
    </Modal>
  </>);

};

const Task = ({ task, updateTask, removeTask }) => {
  const {
    id,
    title,
    status,
    description,
    dueDate,
    notification,
    priority,
  } = task;

  const taskClassName = `d-flex p-2 ${ status === "done" ? "" : "" }`

  return (
    <div key={id} className={taskClassName}>
      <div>
        <input
          type="checkbox"
          className="me-2 mt-1"
          name="status"
          onChange={() => {
            updateTask({ id, status: status === "done" ? "ready" : "done"})
          }}
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
            view
          />
          <TimePicker
            value={dueDate}
            onChange={(newDueDate) => {
              updateTask({ id, dueDate: newDueDate });
            }}
            view
          />
          <NotificationPicker
            value={notification}
            onChange={(newNotification) => {
              updateTask({ id, notification: newNotification });
            }}
            view
          />
        </div>
      </div>
      <div className="ms-auto">
        <RemoveTaskButton
          removeTask={() => removeTask({ id })}
        />
      </div>
    </div>
  );
};

export default DateList;
