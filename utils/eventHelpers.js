const timestamp = (date = null) => {
  return  date ?
    Math.round((new Date(date).getTime() /1000))
    : Math.round((new Date().getTime() /1000))
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