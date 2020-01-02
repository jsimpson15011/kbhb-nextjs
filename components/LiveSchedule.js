import React from "react"
import mainTheme from "../styles/katTheme"
import {useSelector} from "react-redux"
import {withRedux} from "../lib/redux"

const LiveSchedule = () => {
  const scheduleData = useSelector(state => state.schedule)

  if (scheduleData === null || !scheduleData.schedule[0]){
    return (
      <></>
    )
  }
  return (
    <div className="listen-live">
      <a href="http://kout.tunegenie.com/#listenlive" className="top">
        <img className='personality-image' alt='' src={scheduleData.schedule[0].meta_box.schedule_square_image[0].full_url}/>
        <div className="sound-img-and-text">
          <img alt='' src='/img/sound-wave.png'/>
          <div>
            <h3>Listen Live</h3>
            <p>
              <b>{scheduleData.schedule[0].title.rendered}</b> {scheduleData.schedule[0].meta_box.schedule_start_time} - {scheduleData.schedule[0].meta_box.schedule_end_time}
            </p>
          </div>
        </div>
      </a>
      <div className="bottom">
        <p>Request: text or call 605-348-3939</p>
      </div>
      <style jsx>
        {`
          .listen-live{
            background: #fff7f2;
            color: ${mainTheme.accent};
            box-sizing: border-box;
            display: flex;
            flex-direction: column;
            justify-content: flex-end;
          }
          .listen-live a{
            color: ${mainTheme.accent};
            text-decoration: none;
          }
          .personality-image{
            width: 100px;
          }
          h3{
            text-transform: uppercase;
            font-weight: bold;
            margin-bottom: 7px;
          }
          p{
            margin-bottom: 7px;
          }
          .sound-img-and-text{
            display: flex;
            justify-content: space-between;
            align-items: center;
          }
          .sound-img-and-text img{
            margin: 0 14px;
          }
          .top{
            padding: 0 14px 0 0;
            display: flex;
            justify-content: space-around;
            height: 100%;
            flex-wrap: wrap;
          }
          .bottom{
            background: #333333;
            color: #f3f3f3;
            font-weight: bold;
            margin-top: auto;
            text-align: center;
          }
          .bottom p{
            margin: 7px 0;
          }
        `}
      </style>
    </div>
  )
}

export default withRedux(LiveSchedule)