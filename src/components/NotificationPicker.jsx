import { forwardRef } from 'react';
import { Dropdown } from 'react-bootstrap';
import { faBell } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'

const notifications = [5, 30, 60, 60 * 3, 60 * 24, 60 * 24 * 7];

const notificationsToStr = {
  5: "5 min.",
  30: "30 min.",
  60: "1 hour.",
  [60 * 3]: "3 hours.",
  [60 * 24]: "1 day.",
  [60 * 24 * 7]: "1 week.",
};

const getContent = (value, view) => forwardRef(({ onClick }, ref) => (
  <div className="px-1" onClick={onClick} ref={ref}>
    <FontAwesomeIcon icon={faBell} />
    {
      view &&
        <span className="mx-1">
          {notificationsToStr[value]}
        </span>
    }
  </div>
));

const DropdownNotificationItem = ({ value }) => (
  <Dropdown.Item eventKey={value}>
    {notificationsToStr[value]}
  </Dropdown.Item>
);

const NotificationPicker = ({ value, onChange, view }) => (
  <Dropdown
    id={`dropdown-variants-notification`}
    title="notifications"
    variant={value}
    onSelect={(eventKey) => onChange(Number(eventKey))}
  >
    <Dropdown.Toggle as={getContent(value, view)}></Dropdown.Toggle>
    <Dropdown.Menu>
      {notifications.map((notification) => <DropdownNotificationItem key={notification} value={notification} />)}
    </Dropdown.Menu>
  </Dropdown>
);

export default NotificationPicker;
