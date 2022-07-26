/**
 * JS calendar template using ToastUI framework.
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
    this.schedules = [
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
    ];
    this.calendars = [
      {
        id: "1",
        name: "My Calendar",
        color: "#ffffff",
        bgColor: "#9e5fff",
        dragBgColor: "#9e5fff",
        borderColor: "#9e5fff"
      },
      {
        id: "2",
        name: "Company",
        color: "#ffffff",
        bgColor: "#00a9ff",
        dragBgColor: "#00a9ff",
        borderColor: "#00a9ff"
      }
    ];
    this.theme = {
      'week.timegridOneHour.height': '36px',
      'week.timegridHalfHour.height': '18px',
    };
    this.state = { 
      selectedViewType: 'month', 
      renderDate: `${moment(new Date()).format('MMMM YYYY')}`
    };


    // rather temp
    // this.calendarOptions = {
    //   taskView: false
    // };
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

  handleViewSelection = (currViewType) => {
    this.setState({ selectedViewType: currViewType.value }, () => {
      this.setupDateHeader();
    });
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

  

  






  // handle clicking on the calendar grid
  onUpdateSchedule = (e, callback) => {
    console.log("onAddSchedule : " + callback);
  };
  
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
            defaultValue={{ value: 'month', label: 'Monthly View' }} 
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
          useCreationPopup={true}
          useDetailPopup={true}

          onUpdateSchedule={this.onUpdateSchedule}

          // functions to manipulate calendar events

          // testing 
          //onClickSchedule={this.onClickSchedule}


          // calendars
          schedules={this.schedules}
          calendars={this.calendars}
        />
      </div>
    );
  }
}


const container = document.getElementById('root');
const root = ReactDOMClient.createRoot(container);
root.render(<CalendarComponent />);