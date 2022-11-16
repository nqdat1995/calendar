import { useEffect, useRef, useState } from "react";

function Calendar() {
  const currDate = new Date();
  const [currMonth, setCurrMonth] = useState(currDate.getMonth());
  const [currYear, setCurrYear] = useState(currDate.getFullYear());
  const calendarDaysRef = useRef<HTMLDivElement>(null);
  const calendarYearRef = useRef<HTMLDivElement>(null);
  const monthPickerRef = useRef<HTMLDivElement>(null);
  const monthListRef = useRef<HTMLDivElement>(null);
  const month_names = ['January', 'February', 'March', 'April', 'May', 'June', 'July', 'August', 'September', 'October', 'November', 'December']

  const isLeapYear = (year: number) => {
    return (year % 4 === 0 && year % 100 !== 0 && year % 400 !== 0) || (year % 100 === 0 && year % 400 === 0)
  }
  const getFebDays = (year: number) => {
    return isLeapYear(year) ? 29 : 28
  }
  const generateCalendar = (month: number, year: number) => {
    let days_of_month = [31, getFebDays(year), 31, 30, 31, 30, 31, 31, 30, 31, 30, 31];
    calendarDaysRef.current!.innerHTML = "";

    if (month > 11 || month < 0) month = currDate.getMonth();
    if (!year) year = currDate.getFullYear();

    let curr_month = `${month_names[month]}`
    console.log(curr_month);
    monthPickerRef.current!.innerHTML = curr_month;

    let first_day = new Date(year, month, 1);
    for (let i = 0; i <= days_of_month[month] + first_day.getDay() - 1; i++) {
      let day = document.createElement('div')
      if (i >= first_day.getDay()) {
        day.classList.add('calendar-day-hover')
        day.innerHTML = `${i - first_day.getDay() + 1}`
        day.innerHTML += `<span></span>
                            <span></span>
                            <span></span>
                            <span></span>`
        if (i - first_day.getDay() + 1 === currDate.getDate() && year === currDate.getFullYear() && month === currDate.getMonth()) {
          day.classList.add('curr-date')
        }
      }
      calendarDaysRef.current?.appendChild(day);
    }
  }
  const nextYear = () => {
    setCurrYear(currYear + 1);
  }
  const prevYear = () => {
    setCurrYear(currYear - 1);
  }
  const prevMonth = () => {
    if (currMonth === 0) {
      setCurrMonth(11);
      setCurrYear(currYear - 1)
    }
    else {
      setCurrMonth(currMonth - 1);
    }
  }
  const nextMonth = () => {
    if (currMonth === 11) {
      setCurrMonth(0);
      setCurrYear(currYear + 1)
    }
    else {
      setCurrMonth(currMonth + 1);
    }
  }
  const showMonths = () => {
    monthListRef.current?.classList.add('show');
    console.log(monthPickerRef.current);
  }

  useEffect(() => {
    month_names.forEach((e, index) => {
      let month = document.createElement('div')
      month.innerHTML = `<div data-month="${index}">${e}</div>`
      month.querySelector('div')!.onclick = () => {
        monthListRef.current?.classList.remove('show');
        setCurrMonth(index);
      }
      monthListRef.current?.appendChild(month)
    });

    return () => {
      monthListRef.current!.innerHTML = '';
    }
  }, []);

  useEffect(() => {
    generateCalendar(currMonth, currYear);
  }, [currMonth, currYear])

  return (
    <div className="calendar">
      <span className="month-change" id="prev-month" onClick={prevMonth}>
        <pre>{'<'}</pre>
      </span>
      <span className="month-change" id="next-month" onClick={nextMonth}>
        <pre>{'>'}</pre>
      </span>
      <div className="calendar-header">
        <span className="month-picker" id="month-picker" ref={monthPickerRef} onClick={showMonths}>April</span>
        <div className="year-picker">
          <span className="year-change" id="prev-year" onClick={prevYear}>
            <pre>{'<'}</pre>
          </span>
          <span id="year" ref={calendarYearRef}>{currYear}</span>
          <span className="year-change" id="next-year" onClick={nextYear}>
            <pre>{'>'}</pre>
          </span>
        </div>
      </div>
      <div className="calendar-body">
        <div className="calendar-week-day">
          <div>Sun</div>
          <div>Mon</div>
          <div>Tue</div>
          <div>Wed</div>
          <div>Thu</div>
          <div>Fri</div>
          <div>Sat</div>
        </div>
        <div className="calendar-days" ref={calendarDaysRef}></div>
      </div>

      <div className="month-list" ref={monthListRef}></div>
    </div>
  )
}

export default Calendar;