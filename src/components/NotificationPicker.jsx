import { forwardRef } from 'react';
import { Dropdown } from 'react-bootstrap';
import { faBell } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'

import { getNotificationTitle } from '../utils/';

const notifications = [5, 30, 60, 60 * 3, 60 * 24, 60 * 24 * 7];

const Icon = forwardRef(({ onClick }, ref) => (
  <div className="px-1" onClick={onClick} ref={ref}>
    <FontAwesomeIcon icon={faBell} />
  </div>
));

const DropdownNotificationItem = ({ value }) => (
  <Dropdown.Item eventKey={value}>
    {getNotificationTitle(value)}
  </Dropdown.Item>
);

const NotificationPicker = ({ value, onChange }) => (
  <Dropdown
    id={`dropdown-variants-notification`}
    title="notifications"
    variant={value}
    onSelect={(eventKey) => onChange(Number(eventKey))}
  >
    <Dropdown.Toggle as={Icon}></Dropdown.Toggle>
    <Dropdown.Menu>
      {notifications.map((notification) => <DropdownNotificationItem key={notification} value={notification} />)}
    </Dropdown.Menu>
  </Dropdown>
);

export default NotificationPicker;
