import useSWR from "swr"
import {baseUrl} from "../site-settings"
import moment from "moment"

export const fetcher = (...args) => fetch(...args).then(res => res.json())
const scheduleFetcher = (...args) => {
  return(
    fetch(...args).then(res => res.json().then(schedule => {

      return schedule.filter(item => {
        const dayOfTheWeek = (new Date()).getDay()
        const scheduleBlock = item.meta_box.schedule_weekdays_or_weekends
        let correctBlock = false


        if(dayOfTheWeek < 6 && dayOfTheWeek > 0){
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
        if(dayOfTheWeek === 0){
          scheduleBlock.forEach(block => {
            if(block === 'sun'){
              correctBlock = true
            }
          })
          if(!correctBlock){
            return false
          }
        }

        const startTime = item.meta_box.schedule_start_time.replace(':', '')
        const endTime = item.meta_box.schedule_end_time.replace(':', '')
        /*const localeString = (new Date).toLocaleString('en-US', {
          hour: '2-digit',
          minute: '2-digit',
          timeZone: 'America/Denver'
        }).toLowerCase().replace(':', '')*/
        const localeString = moment().format('hhmm a')

        const convertTo24 = time => {
          return time.slice(-2) === 'am'
            ? parseInt(time.slice(0, -2))
            : Number(parseInt(time.slice(0, -2))) === 1200 ?
              Number(parseInt(time.slice(0, -2)))
              : Number(parseInt(time.slice(0, -2))) + 1200
        }

        const startTime24 = convertTo24(startTime)
        const endTime24 = convertTo24(endTime)
        const currentTime24 = convertTo24(localeString)

        return (startTime24 <= currentTime24   && currentTime24 <= endTime24)
      })
    }
    ))
  )
}
const announcementFetcher = (...args) => {
  return(
    fetch(...args).then(res => res.json().then(announcement => {
        return announcement.filter(item => {
          return item.meta_box.psa_date + 25200 > (Math.floor(Date.now()/1000))
        })
      }
    ))
  )
}
const closureFetcher = (...args) => {
  return(
    fetch(...args).then(res => res.json().then(closure => {
        return closure.filter(closure => {
          return closure.meta_box.closureIsShowing === '1'
        })
      }
    ))
  )
}

export function useNav () {
  const { data, error } = useSWR(`${baseUrl}/wp-json/menus/v1/menus/main-navigation`, fetcher)

  return {
    data: data,
    isLoading: !error && !data,
    isError: error
  }
}

export function useBannerAds () {
  const { data, error } = useSWR(`${baseUrl}/wp-json/wp/v2/banner_ad?_embed&per_page=10`, fetcher)

  return {
    data: data,
    isLoading: !error && !data,
    isError: error
  }
}

export function useSchedule () {
  const { data, error } = useSWR(`${baseUrl}/wp-json/wp/v2/listenliveschedule?per_page=100`, scheduleFetcher)

  return {
    data: data,
    isLoading: !error && !data,
    isError: error
  }
}

export function useAnnouncements () {
  const { data, error } = useSWR(`https://psa.homesliceweb.com/wp-json/wp/v2/psas`, announcementFetcher)

  return {
    announcementItems: data,
    isLoading: !error && !data,
    isError: error
  }
}

export function useClosures () {
  const { data, error } = useSWR(`https://psa.homesliceweb.com/wp-json/wp/v2/closures`, closureFetcher)

  return {
    closureItems: data,
    isLoading: !error && !data,
    isError: error
  }
}

export function useArticles ({url=`${baseUrl}/wp-json/wp/v2/posts?per_page=100`,initialData= null}) {
  const {data, error} = useSWR(url, fetcher, {initialData: initialData})
  return {
    articles: data,
    isLoading: !error && !data,
    isError: error
  }
}