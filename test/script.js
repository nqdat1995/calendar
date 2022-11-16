let list = document.querySelector('.list')

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

Array.from(tasks).forEach((task) => {
  list.innerHTML += `<li>
  <div>${task.taskName}</div>
  <div>${task.startDate.toLocaleDateString()} ${task.startDate.toLocaleTimeString()}</div>
  <div>${task.duration}h</div>
  <div>${task.status}</div>
</li>`
})