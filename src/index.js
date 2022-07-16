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
const viewOptions = [
  { value: 'week', label: 'Weekly View' },
  { value: 'month', label: 'Monthly View' },
  { value: 'day', label: 'Daily View' }
]

const calendarTheme = {
  'week.timegridOneHour.height': '36px',
  'week.timegridHalfHour.height': '18px',
};

const templates = {
  milestone: function (schedule) {
    return;
  }
};

/*

%div#calendar-nav{:style => "display: flex; justify-content: space-between; padding: 1%;"}
  %div#btn-container
    %i#prev-week-btn.fas.fa-chevron-circle-left.fa-2x{:style => "cursor: pointer;"}
    %i#today-btn.fas.fa-calendar-day.fa-2x{:style => "cursor: pointer;"}
    %i#next-week-btn.fas.fa-chevron-circle-right.fa-2x{:style => "cursor: pointer;"}

  %div#curr-month-year{:style => "font-size: 2rem;"}

  %select#selection-view.form-select{:style => "width: 200px;"}
    %option{:value => "week", :selected => "selected"} Weekly View
    %option{:value => "month"} Monthly View
    %option{:value => "day"} Daily View

*/

// main function
function App() {
  return (
    <div className="calendar-container">

      <div className="calendar-nav">
        <div className="btn-container">
          <FontAwesomeIcon icon={faCircleChevronLeft} className="fa-2x prev-btn" />
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

        taskView={'false'}


       
        

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
const container = document.getElementById('root');
const root = ReactDOMClient.createRoot(container);
root.render(<App />);








