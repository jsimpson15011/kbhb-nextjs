import fetch from "isomorphic-unfetch"
import {baseUrl} from '../site-settings'

export const getSchedule = async (reduxStore) => {
  const {dispatch} = reduxStore

  const scheduleRes = await fetch(`${baseUrl}/wp-json/wp/v2/listenliveschedule?per_page=100`)
  const scheduleData = await scheduleRes.json()

  const currentSchedule = scheduleData.filter(item => {
    const dayOfTheWeek = (new Date()).getDay()
    const scheduleBlock = item.meta_box.schedule_weekdays_or_weekends
    let correctBlock = false


    if(dayOfTheWeek < 6){
      scheduleBlock.forEach(block => {
        if(block === 'mf'){
          correctBlock = true
        }
      })
      if(!correctBlock){
        return false
      }
    }
    if(dayOfTheWeek === 6){
      scheduleBlock.forEach(block => {
        if(block === 'sat'){
          correctBlock = true
        }
      })
      if(!correctBlock){
        return false
      }
    }
    if(dayOfTheWeek === 7){
      scheduleBlock.forEach(block => {
        if(block === 'sun'){
          correctBlock = true
        }
      })
      if(!correctBlock){
        return false
      }
    }

    const startTime = item.meta_box.schedule_start_time.replace(':', '.')
    const endTime = item.meta_box.schedule_end_time.replace(':', '.')
    const localeString = (new Date).toLocaleString('en-US', {
      hour: '2-digit',
      minute: '2-digit',
      timeZone: 'America/Denver'
    }).toLowerCase().replace(':', '.')

    const convertTo24 = time => {
      return time.slice(-2) === 'am'
        ? parseFloat(time.slice(0, -2)).toFixed(2)
        : Number(parseFloat(time.slice(0, -2)).toFixed(2)) + 12
    }

    const startTime24 = convertTo24(startTime)
    const endTime24 = convertTo24(endTime)
    const currentTime24 = convertTo24(localeString)

    return (currentTime24 >= startTime24 && currentTime24 >= endTime24)
  })

  dispatch({
    type: 'GET_SCHEDULE',
    data: currentSchedule
  })
}

const scheduleReducer = (state = null, action) => {
  switch (action.type) {
    case 'GET_SCHEDULE':
      return {
        schedule: action.data
      }
    default:
      return state
  }
}

export default scheduleReducer