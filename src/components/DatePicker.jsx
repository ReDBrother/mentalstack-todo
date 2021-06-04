import { forwardRef } from "react";
import ReactDatePicker from 'react-datepicker';
import { faCalendar } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';

const CustomDateInput = forwardRef(({ onClick }, ref) => (
  <div className="px-1" ref={ref} onClick={onClick}>
    <FontAwesomeIcon icon={faCalendar} />
  </div>
));

const DatePicker = ({ value, onChange }) => (
    <ReactDatePicker
      selected={value}
      onChange={onChange}
      customInput={<CustomDateInput />}
    />
);

export default DatePicker;
