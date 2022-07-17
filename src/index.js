/**
 * Project name here...
 * 
 * Author: Filip J. Cierkosz
 * 
 * Date: 07/2022
 */


import React, { useCallback, useRef } from "react";
import * as ReactDOMClient from 'react-dom/client';

import Calendar from '@toast-ui/react-calendar';
import '@toast-ui/calendar/dist/toastui-calendar.min.css';
import 'tui-calendar/dist/tui-calendar.css';
import 'tui-date-picker/dist/tui-date-picker.css';
import 'tui-time-picker/dist/tui-time-picker.css';

import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faCircleChevronLeft, faCircleChevronRight, faCalendarDay } from '@fortawesome/free-solid-svg-icons';

import moment from 'moment';
import Select from 'react-select';
import 'bootstrap/dist/css/bootstrap.css';
import "./styles.css";


class CalendarComponent extends React.Component {
  constructor(props) {
    super(props);
    this.calendarRef = React.createRef();
    this.viewOptions = [
      { value: 'week', label: 'Weekly View' },
      { value: 'month', label: 'Monthly View' },
      { value: 'day', label: 'Daily View' }
    ];
    this.theme = {
      'week.timegridOneHour.height': '36px',
      'week.timegridHalfHour.height': '18px',
    };
    this.state = { 
      selectedViewType: 'week', 
      renderDate: ''
    };
  }

  handleShowPrev = () => {
    const calendar = this.calendarRef.current.getInstance();
    calendar.prev();
    this.setupDateHeader();
  };

  handleShowCurr = () => {
    const calendar = this.calendarRef.current.getInstance();
    calendar.today();
    this.setupDateHeader();
  }

  handleShowNext = () => {
    const calendar = this.calendarRef.current.getInstance();
    calendar.next();
    this.setupDateHeader();
  }

  handleViewSelection = (currViewType) => {
    this.setState({ selectedViewType: currViewType.value }, () => {
      this.setupDateHeader();
    });
  }

  setupDateHeader = () => {
    let currDate;
    const startDate = this.calendarRef.current.getInstance().getDateRangeStart().toDate();
    const endDate = this.calendarRef.current.getInstance().getDateRangeEnd().toDate();
  
    if (this.calendarRef.current.getInstance().getViewName() === 'day') {
      currDate = moment(startDate).format('D MMMM YYYY');
    } else if (this.calendarRef.current.getInstance().getViewName() === 'month') {
      currDate = moment(startDate).add(15, "days").format('MMMM YYYY');
    } else {
      currDate = `${moment(startDate).format('D MMM YYYY')} - ${moment(endDate).format('D MMM YYYY')}`;
    }

    this.setState({ renderDate: currDate });
  }

  // handle click on schedule
  // onClickSchedule = useCallback((event) => {
  //   const { calendarId, id } = event.schedule;
  //   const el = cal.current.calendarInst.getElement(id, calendarId);

  //   console.log(e, el.getBoundingClientRect());
  // }, []);
  // onClickSchedule = () => {
  //   console.log('clicked the schedule...');
  // }

  // onBeforeCreateSchedule = () => {
  //   console.log('before creation of new schedule...');
  // }

  handleCalendar = () => {
    console.log('clicked calendar');
    // this.calendarRef.current.getInstance().on({
    //   'beforeCreateSchedule': function(event) {
    //     // saveSchedule(event);
    //     console.log('about to save something new...')
    //   },
    //   'beforeUpdateSchedule': function(event) {
    //     const schedule = event.schedule;
    //     const updates = event.changes;
    //     //calendar.updateSchedule(schedule.id, schedule.calendarId, updates);
    //     console.log('about to update something...')
    //   },
    //   'beforeDeleteSchedule': function(event) {
    //     //calendar.deleteSchedule(event.schedule.id, event.schedule.calendarId);
    //     console.log('about to delete some event...')
    //   }
    // });
  }
  

  render() {
    const { currViewType } = this.state;

    return (
      <div className="calendar-container">
        <div className="calendar-nav">
          <div className="btn-container">
            <FontAwesomeIcon icon={faCircleChevronLeft} className="fa-2x prev-btn" 
              onClick={this.handleShowPrev} />
            <FontAwesomeIcon icon={faCalendarDay} className="fa-2x today-btn"
              onClick={this.handleShowCurr} />
            <FontAwesomeIcon icon={faCircleChevronRight} className="fa-2x next-btn" 
              onClick={this.handleShowNext} />
          </div>

          <div className="curr-date" >{this.state.renderDate}</div>

          <Select
            className="view-selection"
            options={this.viewOptions}
            defaultValue={{ value: 'week', label: 'Weekly View' }} 
            value={currViewType}
            onChange={this.handleViewSelection}
          />
        </div>

        <Calendar
          // defining view (just the way it looks)
          height="85vh"
          view={this.state.selectedViewType}
          theme={this.theme}
            
          // functions
          ref={ this.calendarRef }
          disableDblClick={true}
          disableClick={false}
          isReadOnly={false}
          useCreationPopup
          useDetailPopup

          // functions to add events
          onClickSchedule
          onBeforeCreateSchedule

          // testing 
          onClick={this.handleCalendar}


          // calendars
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
              name: 'Physical Activity',
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
}


const container = document.getElementById('root');
const root = ReactDOMClient.createRoot(container);
root.render(<CalendarComponent />);