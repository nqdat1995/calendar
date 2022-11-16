let calendar = document.querySelector('.calendar')

const month_names = ['January', 'February', 'March', 'April', 'May', 'June', 'July', 'August', 'September', 'October', 'November', 'December']

isLeapYear = (year) => {
    return (year % 4 === 0 && year % 100 !== 0 && year % 400 !== 0) || (year % 100 === 0 && year % 400 === 0)
}

getFebDays = (year) => {
    return isLeapYear(year) ? 29 : 28
}

let tasks = [
    {
        taskName: 'Go to work',
        startDate: new Date(2022, 10, 15, 08, 00, 00),
        duration: 8,
        status: 'Started'
    },
    {
        taskName: 'Go to sleep',
        startDate: new Date(2022, 10, 15, 23, 00, 00),
        duration: 7,
        status: 'Not Start'
    }
]

let generateTask = () => {
    let listHtml = ''
    Array.from(tasks).forEach((task) => {
        listHtml += `<li>
      <div>${task.taskName}</div>
      <div>${task.startDate.toLocaleDateString()} ${task.startDate.toLocaleTimeString()}</div>
      <div>${task.duration}h</div>
      <div>${task.status}</div>
    </li>`
    })
    return listHtml
}

let month_picker = calendar.querySelector('#month-picker')

month_picker.onclick = () => {
    month_list.classList.add('show')
}

generateCalendar = (month, year) => {

    let calendar_days = calendar.querySelector('.calendar-days')
    let calendar_header_year = calendar.querySelector('#year')

    let days_of_month = [31, getFebDays(year), 31, 30, 31, 30, 31, 31, 30, 31, 30, 31]

    calendar_days.innerHTML = ''

    let currDate = new Date()
    if (month > 11 || month < 0) month = currDate.getMonth()
    if (!year) year = currDate.getFullYear()

    let curr_month = `${month_names[month]}`
    month_picker.innerHTML = curr_month
    calendar_header_year.innerHTML = year

    // get first day of month

    let first_day = new Date(year, month, 1)

    for (let i = 0; i <= days_of_month[month] + first_day.getDay() - 1; i++) {
        let day = document.createElement('div')
        if (i >= first_day.getDay()) {
            day.classList.add('calendar-day-hover')
            day.addEventListener('click', () => {
                let list = document.querySelector('.list')
                list.innerHTML = `<li>
                    <div>Task Name</div>
                    <div>Start Date</div>
                    <div>Duration</div>
                    <div>Status</div>
                </li>`
                let realDay = i - first_day.getDay() + 1;
                if (realDay === 15) {
                    list.innerHTML += generateTask()
                }
            })
            day.innerHTML = i - first_day.getDay() + 1
            day.innerHTML += `<span></span>
                            <span></span>
                            <span></span>
                            <span></span>`
            if (i - first_day.getDay() + 1 === currDate.getDate() && year === currDate.getFullYear() && month === currDate.getMonth()) {
                day.classList.add('curr-date')
            }
        }
        calendar_days.appendChild(day)
    }
}

let month_list = calendar.querySelector('.month-list')

month_names.forEach((e, index) => {
    let month = document.createElement('div')
    month.innerHTML = `<div data-month="${index}">${e}</div>`
    month.querySelector('div').onclick = () => {
        month_list.classList.remove('show')
        curr_month.value = index
        generateCalendar(index, curr_year.value)
    }
    month_list.appendChild(month)
})

let currDate = new Date()

let curr_month = { value: currDate.getMonth() }
let curr_year = { value: currDate.getFullYear() }

generateCalendar(curr_month.value, curr_year.value)

document.querySelector('#prev-year').onclick = () => {
    --curr_year.value
    generateCalendar(curr_month.value, curr_year.value)
}

document.querySelector('#next-year').onclick = () => {
    ++curr_year.value
    generateCalendar(curr_month.value, curr_year.value)
}

document.querySelector('#prev-month').onclick = () => {
    if (curr_month.value === 0) {
        curr_month.value = 11
        --curr_year.value
    }
    else {
        --curr_month.value
    }
    generateCalendar(curr_month.value, curr_year.value)
}

document.querySelector('#next-month').onclick = () => {
    if (curr_month.value === 11) {
        curr_month.value = 0
        ++curr_year.value
    }
    else {
        ++curr_month.value
    }
    generateCalendar(curr_month.value, curr_year.value)
}