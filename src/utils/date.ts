const timeFormatter = new Intl.DateTimeFormat('ru-RU', {
  hour: '2-digit',
  minute: '2-digit',
})

const dateFormatter = new Intl.DateTimeFormat('ru-RU', {
  day: '2-digit',
  month: '2-digit',
  year: '2-digit',
})

export function formatTime(timestamp: number) {
  return timeFormatter.format(timestamp)
}

export function formatChatDate(timestamp: number) {
  const date = new Date(timestamp)
  const isToday = date.toDateString() === new Date().toDateString()

  return isToday ? timeFormatter.format(date) : dateFormatter.format(date)
}
