export const activeItemsOnly = items => {
  return items.filter(
    item => {
      const displayStartTime = !parseInt(item.meta_box.event_display_start) ? // If start time isn't defined always show until end time has passed
        0
        : item.meta_box.event_display_start
      const displayEndTime = !parseInt(item.meta_box.event_display_end) ?// If end time isn't defined always show when start date has passed
        2147483647
        : item.meta_box.event_display_end
      const timeNow = Math.round(Date.now() / 1000)

      if (timeNow < displayStartTime || timeNow > displayEndTime) {
        return false
      }

      return item
    })
}