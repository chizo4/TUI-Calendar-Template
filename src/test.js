import Calendar from 'tui-calendar';
import 'tui-calendar/dist/tui-calendar.css';
import 'tui-date-picker/dist/tui-date-picker.css';
import 'tui-time-picker/dist/tui-time-picker.css';
import moment from 'moment';

let calendar;

document.addEventListener("turbolinks:load", () => {
  if (!document.getElementById('calendar')) {
    return;
  }

  initCalendar();

  // Handle different calendar actions.
  calendar.on({
    'beforeCreateSchedule': function(event) {
      saveSchedule(event);
    },
    'beforeUpdateSchedule': function(event) {
      const schedule = event.schedule;
      const updates = event.changes;
      calendar.updateSchedule(schedule.id, schedule.calendarId, updates);
    },
    'beforeDeleteSchedule': function(event) {
      calendar.deleteSchedule(event.schedule.id, event.schedule.calendarId);
    }
  });

  const prevWeekBtn = document.getElementById("prev-week-btn");
  prevWeekBtn.addEventListener('click', (event) => {
    calendar.prev();
    setupDateHeader();
  });

  const nextWeekBtn = document.getElementById("next-week-btn");
  nextWeekBtn.addEventListener('click', (event) => {
    calendar.next();
    setupDateHeader();
  });

  const todayBtn = document.getElementById("today-btn");
  todayBtn.addEventListener('click', (event) => {
    calendar.today();
    setupDateHeader();
  });

  const viewSelection = document.getElementById("selection-view");
  viewSelection.addEventListener('change', (event) => {
    let selectedView = event.target.value;
    calendar.changeView(selectedView, true);
    setupDateHeader();
  });

  // Handle refreshing the page.
  calendar.changeView(viewSelection.value, true);
  setupDateHeader();
});

const setupDateHeader = () => {
  const headerElement = document.getElementById("curr-month-year");
  const startDate = calendar.getDateRangeStart().toDate();
  const endDate = calendar.getDateRangeEnd().toDate();
  let renderDate;

  if (calendar.getViewName() === 'day') {
    renderDate = moment(startDate).format('D MMMM YYYY');
  } else if (calendar.getViewName() === 'month') {
    renderDate = moment(startDate).add(15, "days").format('MMMM YYYY');
  } else {
    renderDate = `${moment(startDate).format('D MMM YYYY')} - ${moment(endDate).format('D MMM YYYY')}`;
  }

  headerElement.innerText = renderDate;
}

function saveSchedule(data) {
  const scheduleId = String(Date.now())+Math.random();
  const schedule = {
    id: scheduleId,
    calendarId: data.calendarId,
    title: data.title,
    body: data.body,
    start: data.start,
    end: data.end,
    isAllDay: data.isAllDay,
    category: data.isAllDay ? 'allday' : 'time',
    dueDateClass: '',
    isVisible: data.isVisible,
    isReadOnly: data.isReadOnly,
    color: calendars.color,
    bgColor: calendars.bgColor,
    dragBgColor: calendars.bgColor,
    borderColor: calendars.borderColor,
  };
  calendar.createSchedules([schedule]);
}

const initCalendar = () => {
  calendar = new Calendar('#calendar', {
    defaultView: 'week',
    taskView: false,
    scheduleView: ['time'],
    useCreationPopup: true,
    useDetailPopup: true,
    template: {
      allday: function(schedule) {
        return schedule.title + ' <i class="fa fa-refresh"></i>';
      },
      alldayTitle: function() {
        return 'All Day';
      },
      monthDayname: function (dayname) {
        return (
          '<span class="calendar-week-dayname-name">' +
          dayname.label +
          '</span>'
        );
      },
    },
    theme: calendarTheme,
    calendars
  });
};

const calendarTheme = {
  'week.timegridOneHour.height': '36px',
  'week.timegridHalfHour.height': '18px',
};

// Sample calendars (for testing the grid working).
const calendars = [
  {
    id: "001",
    name: "Personal",
    color: "#ffffff",
    bgColor: "#11ed2a",
    dragBgColor: "#11ed2a",
    borderColor: "#11ed2a"
  },
  {
    id: "002",
    name: "Work",
    color: "#ffffff",
    bgColor: "#ed1114",
    dragBgColor: "#ed1114",
    borderColor: "#ed1114"
  }
];