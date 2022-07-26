// react imports
import React, { useCallback, useRef } from "react";
import * as ReactDOMClient from 'react-dom/client';

// basic stylesheet
import "./styles.css";

// react-select imports
import Select from 'react-select';

// font awesome imports
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faCircleChevronLeft } from '@fortawesome/free-solid-svg-icons';
import { faCircleChevronRight } from "@fortawesome/free-solid-svg-icons";
import { faCalendarDay } from "@fortawesome/free-solid-svg-icons";

// bootstrap imports
import 'bootstrap/dist/css/bootstrap.css';

// tui-calendar imports
import Calendar from '@toast-ui/react-calendar';
import '@toast-ui/calendar/dist/toastui-calendar.min.css';
import 'tui-calendar/dist/tui-calendar.css';
import 'tui-date-picker/dist/tui-date-picker.css';
import 'tui-time-picker/dist/tui-time-picker.css';

// moment imports
import moment from 'moment';


//import { ISchedule, ICalendarInfo } from "tui-calendar";





let calendar;

// set sample calendars


// set options for the Select component


const calendarTheme = {
  'week.timegridOneHour.height': '36px',
  'week.timegridHalfHour.height': '18px',
};

const templates = {
  milestone: function (schedule) {
    return;
  }
};

const viewOptions = [
  { value: 'week', label: 'Weekly View' },
  { value: 'month', label: 'Monthly View' },
  { value: 'day', label: 'Daily View' }
]



// navigation, includes: buttons, date, selection
// function Nav() {
 

//   return (
    
//   );
// }


// main function to return calendar component
function CalendarComponent() {
  const showPrev = () => {
    Calendar.prev();
  }

  return (
    <div className="calendar-container">

      <div className="calendar-nav">
        <div className="btn-container">
          <FontAwesomeIcon icon={faCircleChevronLeft} className="fa-2x prev-btn" 
            onClick={() => showPrev()} />
          <FontAwesomeIcon icon={faCalendarDay} className="fa-2x today-btn" />
          <FontAwesomeIcon icon={faCircleChevronRight} className="fa-2x next-btn" />
        </div>

        <div className="curr-date">date to be added here...</div>

        <Select
          options={viewOptions}
          defaultValue={{ value: 'week', label: 'Weekly View' }} 
          className="view-selection"
        />
      </div>

      <Calendar
        height="85vh"
        theme={calendarTheme}
        disableDblClick={true}
        disableClick={false}
        isReadOnly={false}
        useCreationPopup={true}
        useDetailPopup={true}
        //ref={cal}
        view='week'

        taskView
        // schedules={schedules}
        // onClickSchedule={onClickSchedule}
        // onBeforeCreateSchedule={onBeforeCreateSchedule}
        // onBeforeDeleteSchedule={onBeforeDeleteSchedule}
        // onBeforeUpdateSchedule={onBeforeUpdateSchedule}

        
        schedules = {[
          {
            id: '0',
            name: 'Work',
            color: '#ffffff',
            bgColor: '#11ed2a',
            dragBgColor: '#11ed2a',
            borderColor: '#11ed2a'
          },
          {
            id: '1',
            name: 'Studies',
            color: '#ffffff',
            bgColor: '#ed1114',
            dragBgColor: '#ed1114',
            borderColor: '#ed1114'
          },
          {
            id: '2',
            name: 'Sport',
            color: '#ffffff',
            bgColor: '#ed1114',
            dragBgColor: '#ed1114',
            borderColor: '#ed1114'
          }
        ]}
      />
        
    
    </div>
  );
}


// rendering in root
// const container = document.getElementById('root');
// const root = ReactDOMClient.createRoot(container);
// root.render(<CalendarComponent />);
