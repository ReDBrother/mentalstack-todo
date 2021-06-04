import { forwardRef } from 'react';
import { Dropdown } from 'react-bootstrap';
import { faCircle } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';

const priorities = [
  "Urgently",
  "Important",
  "Normal",
  "Neutral",
];

const priorityToClass = {
  [priorities[0]]: "danger",
  [priorities[1]]: "warning",
  [priorities[2]]: "info",
  [priorities[3]]: "secondary",
}

const getIconComponent = (value) => forwardRef(({ onClick }, ref) => (
  <div
    className={`p-0 px-1 text-${priorityToClass[value]}`}
    onClick={onClick}
    ref={ref}
  >
    <FontAwesomeIcon icon={faCircle} />
  </div>
));

const DropdownPriorityItem = ({ value }) => (
  <Dropdown.Item eventKey={value}>
    <span className={`text-${priorityToClass[value]} me-1`}>
      <FontAwesomeIcon icon={faCircle} />
    </span>
    {value}
  </Dropdown.Item>
);

const PriorityPicker = ({ value, onChange }) => (
  <Dropdown
    id={`dropdown-variants-priority`}
    title="priorities"
    variant="value"
    onSelect={(eventKey) => onChange(eventKey)}
  >
    <Dropdown.Toggle
      as={getIconComponent(value)}
    ></Dropdown.Toggle>
    <Dropdown.Menu>
      {priorities.map((priority) => <DropdownPriorityItem key={priority}value={priority} />)}
    </Dropdown.Menu>
  </Dropdown>
);

export default PriorityPicker;
