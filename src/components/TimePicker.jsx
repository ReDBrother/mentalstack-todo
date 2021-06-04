import { forwardRef } from 'react';
import { Dropdown } from 'react-bootstrap';
import { faClock, faChevronUp, faChevronDown } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';

import { getTimeText } from '../utils/';

const Icon = forwardRef(({ onClick }, ref) => (
  <div className="px-1" onClick={onClick} ref={ref}>
    <FontAwesomeIcon icon={faClock} />
  </div>
));

const CustomMenu = forwardRef(
  ({ children, style, className, "aria-labelledby": labeledBy }, ref) => {
    return (
      <div
        ref={ref}
        style={style}
        className={`d-flex ${className} ms-time-dropdown p-1`}
        aria-labelledby={labeledBy}
      >
        {children}
      </div>
    );
  }
);

const TimeInput = ({ onChange, value, from, to }) => {
  const handleClickUp = () => {
    onChange(value === to ? from : value + 1);
  };
  const handleClickDown = () => {
    onChange(value === from ? to : value - 1);
  };

  return (
    <div className="d-flex-column p-1 px-2">
      <div className="text-center" onClick={handleClickUp}><FontAwesomeIcon icon={faChevronUp} /></div>
      <span>{getTimeText(value)}</span>
      <div className="text-center" onClick={handleClickDown}><FontAwesomeIcon icon={faChevronDown} /></div>
    </div>
  );
};

const TimePicker = ({ value, onChange }) => (
  <Dropdown>
    <Dropdown.Toggle as={Icon}></Dropdown.Toggle>
    <Dropdown.Menu as={CustomMenu}>
      <TimeInput
        onChange={(newHours) => {
          onChange({...value, hours: newHours });
        }}
        value={value.hours}
        from={0}
        to={23}
      />
      <TimeInput
        onChange={(newMinutes) => {
          onChange({...value, minutes: newMinutes});
        }}
        value={value.minutes}
        from={0}
        to={59}
      />
    </Dropdown.Menu>
  </Dropdown>
);

export default TimePicker;
