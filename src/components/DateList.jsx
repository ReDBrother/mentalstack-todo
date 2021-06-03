import { useState } from 'react';

const DateList = ({ tasks, sortedRule }) => {
  return <>{components}</>;
};

const Date = ({ title, tasks, sortedRule }) => {
  const [isClosed, setIsClosed] = useState(false);

  if (isClosed) {
    return (
      <>
        <div>
          <h3>{title}</h3>
          <button onClick={() => setIsClosed(true)}>Show</button>
        </div>
      </>
    );
  }

  return (
    <>
      <div>
        <h3>{title}</h3>
        <button onClick={() => setIsClosed(false)}>Close</button>;
      </div>
      {tasks.map((task) => <Task task={task} />)}
    </>
  );
};

const Task = ({ task }) => {
  const [status, setStatus] = useState(task.status);
  const { id, title, description, dueDate, notification, priority } = task;

  const toggleStatus = () => {
    status === "done"
      ? setStatus("waiting")
      : setStatus("done");
  }

  return (
    <div key={id}>
      <input
        type="radio"
        name={status}
        onChange={toggleStatus}
        checked={status === "done"}
      />
      <h4>{title}</h4>
      {
        description === ""
          ? <span>Add some description</span>
          : <span>{description}</span>
      }
      <span>{`${priority} dueDate notification`}</span>
    </div>
  );
};

export default DateList;
