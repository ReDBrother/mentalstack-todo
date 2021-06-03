import { Dropdown, Badge } from 'react-bootstrap';

const notifications = [5, 30, 60, 60 * 3, 60 * 24, 60 * 24 * 7];

const notificationsToStr = {
  5: "5 min.",
  30: "30 min.",
  60: "1 hour.",
  [60 * 3]: "3 hours.",
  [60 * 24]: "1 day.",
  [60 * 24 * 7]: "1 week.",
};

const DropdownNotificationItem = ({ value }) => (
  <Dropdown.Item eventKey={value}>
    <Badge variant={notificationsToStr[value]}>""</Badge>
  </Dropdown.Item>
);

const NotificationPicker = ({ value, onChange }) => (
  <Dropdown
    as={() => <img alt={value} src="#" />}
    id={`dropdown-variants-notification`}
    title="notifications"
    onSelect={(eventKey) => onChange(eventKey)}
  >
    {notifications.map((priority) => <DropdownNotificationItem value={priority} />)}
  </Dropdown>
);

export default NotificationPicker;
