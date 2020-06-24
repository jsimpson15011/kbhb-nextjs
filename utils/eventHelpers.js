import moment from "moment"

const timestamp = (date = null) => {
  return  date ?
    Math.round((new Date(date).getTime() /1000))
    : Math.round((new Date().getTime() /1000))
}

export const formatDate = (date = null) => {
  if (!date){return}
  return(' - '+ moment(date).format("dddd, MMMM Do, h:mm a"))
}

export const activeItemsOnly = items => {
  return items.filter(
    item => {
      const displayStartTime = !timestamp(item.meta_box.event_display_start) ? // If start time isn't defined always show until end time has passed
        0
        : timestamp(item.meta_box.event_display_start)
      const displayEndTime = !timestamp(item.meta_box.event_display_end) ?// If end time isn't defined always show when start date has passed
        2147483647
        : timestamp(item.meta_box.event_display_end)
      const timeNow = timestamp()

      if (timeNow < displayStartTime || timeNow > displayEndTime) {
        return false
      }

      return item
    })
}

export const activeItemsOnlySpecific = (items, startName, endName) => {
  return items.filter(
    item => {
      const displayStartTime = !timestamp(item.meta_box[startName]) ? // If start time isn't defined always show until end time has passed
        0
        : timestamp(item.meta_box[startName])
      const displayEndTime = !timestamp(item.meta_box[endName]) ?// If end time isn't defined always show when start date has passed
        2147483647
        : timestamp(item.meta_box[endName])
      const timeNow = timestamp()

      if (timeNow < displayStartTime || timeNow > displayEndTime) {
        return false
      }

      return item
    })
}

export const sortItems = items => {
  const eventsSortedByPublishDate = items.sort((a, b) => {
    const timeA = new Date(a.date).getTime()
    const timeB = new Date(b.date).getTime()
    return timeB - timeA
  })

  return eventsSortedByPublishDate.sort((a, b) => {
    return a.meta_box.event_priority - b.meta_box.event_priority
  })
}

export const shuffle = (array) => {
  let currentIndex = array.length, temporaryValue, randomIndex

  // While there remain elements to shuffle...
  while (0 !== currentIndex) {

    // Pick a remaining element...
    randomIndex = Math.floor(Math.random() * currentIndex);
    currentIndex -= 1;

    // And swap it with the current element.
    temporaryValue = array[currentIndex];
    array[currentIndex] = array[randomIndex];
    array[randomIndex] = temporaryValue;
  }

  return array;
}
