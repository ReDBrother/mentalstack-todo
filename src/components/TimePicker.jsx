import { forwardRef, useState } from 'react';
import _ from 'lodash';
import { Dropdown } from 'react-bootstrap';
import { faClock, faChevronUp, faChevronDown } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';

const getTimeTitle = (value) => {
  return `${getTimeText(value.hours)}:${getTimeText(value.minutes)}`
};

const getTimeText = (value) => {
  if (value < 10) {
    return `0${value}`;
  }

  return `${value}`;
};

const Content = forwardRef(({ onClick, children }, ref) => (
  <div className="px-1" onClick={onClick} ref={ref}>
    <FontAwesomeIcon icon={faClock} />
    {children}
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

const TimePicker = ({ value, onChange, view }) => {
  const [time, setTime] = useState(value);

  return (
    <Dropdown
      onToggle={(isOpened) => {
        if (!isOpened && !_.isEqual(time, value)) {
          onChange(time);
        }
      }}
    >
      <Dropdown.Toggle
        as={Content}
      >
        {
          view &&
            <span className="mx-1 me-4">
              {getTimeTitle(value)}
            </span>
        }
      </Dropdown.Toggle>
      <Dropdown.Menu as={CustomMenu}>
        <TimeInput
          onChange={(newHours) => {
            setTime({ ...time, hours: newHours });
          }}
          value={time.hours}
          from={0}
          to={23}
        />
        <TimeInput
          onChange={(newMinutes) => {
            setTime({ ...time, minutes: newMinutes });
          }}
          value={time.minutes}
          from={0}
          to={59}
        />
      </Dropdown.Menu>
    </Dropdown>
  );
};

export default TimePicker;
