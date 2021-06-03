import { Dropdown, Badge } from 'react-bootstrap';

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

const DropdownPriorityItem = ({ value }) => (
  <Dropdown.Item eventKey={value}>
    <Badge variant={priorityToClass[value]}>""</Badge>
    <span className="p-1">{value}</span>
  </Dropdown.Item>
);

const PriorityPicker = ({ value, onChange }) => (
  <Dropdown
    as={() => <Badge variant={priorityToClass[value]}>""</Badge>}
    id={`dropdown-variants-priority`}
    title="priorities"
    onSelect={(eventKey) => onChange(eventKey)}
  >
    {priorities.map((priority) => <DropdownPriorityItem value={priority} />)}
  </Dropdown>
);

export default PriorityPicker;
