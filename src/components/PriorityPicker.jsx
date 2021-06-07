import { forwardRef } from 'react';
import { Dropdown } from 'react-bootstrap';
import { faCircle } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';

const priorities = [
  0,
  1,
  2,
  3,
];

const priorityToTitle = {
  0: "Neutral",
  1: "Normal",
  2: "Important",
  3: "Urgently",
}

const priorityToClass = {
  0: "secondary",
  1: "info",
  2: "warning",
  3: "danger",
}

const getContent = (value, view) => forwardRef(({ onClick }, ref) => (
  <div
    className="p-0 px-1"
    onClick={onClick}
    ref={ref}
  >
    <FontAwesomeIcon className={`text-${priorityToClass[value]}`} icon={faCircle} />
    {
      view &&
        <span className="mx-1 me-4">
          {`${priorityToTitle[value]} Priority`}
        </span>
    }
  </div>
));

const DropdownPriorityItem = ({ value }) => (
  <Dropdown.Item eventKey={value}>
    <span className={`text-${priorityToClass[value]} me-1`}>
      <FontAwesomeIcon icon={faCircle} />
    </span>
    {priorityToTitle[value]}
  </Dropdown.Item>
);

const PriorityPicker = ({ value, onChange, view }) => (
  <Dropdown
    id={`dropdown-variants-priority`}
    title="priorities"
    variant="value"
    onSelect={(eventKey) => onChange(eventKey)}
  >
    <Dropdown.Toggle
      as={getContent(value, view)}
    />
    <Dropdown.Menu>
      {
        priorities.map(priority =>
          <DropdownPriorityItem
            key={priority}
            value={priority}
          />)
      }
    </Dropdown.Menu>
  </Dropdown>
);

export default PriorityPicker;
