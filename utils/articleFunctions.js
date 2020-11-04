export const articleDate = date => {
  const months = [
    "January",
    "February",
    "March",
    "April",
    "May",
    "June",
    "July",
    "August",
    "September",
    "October",
    "November",
    "December"
  ]
  const dateObject = new Date(date)
  const month = months[dateObject.getMonth()]
  const dateNumber = dateObject.getDate()
  const year = dateObject.getFullYear()

  return `${month} ${dateNumber}, ${year}`

}

export const categoryColor = {
  News: "#3E3E3E",
  Local: "#3B73B1",
  Sports: "#CA0000",
  Business: "#1A6F18"
}