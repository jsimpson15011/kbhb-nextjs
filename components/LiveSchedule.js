import React from "react"
import mainTheme from "../styles/katTheme"

const LiveSchedule = props => {
  return (
    <div className="listen-live">
      <div className="top">
        <img alt='' src='/img/sound-wave.png'/>
        <div className="sound-img-and-text">
          <img alt='' src='/img/sound-wave.png'/>
          <div>
            <h3>Listen Live</h3>
            <p><b>Test</b> 2:00pm - 7:00pm</p>
          </div>
        </div>
      </div>
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
            border-left: ${mainTheme.accent} solid 3.5px;
          }
          .sound-img-and-text{
            display: flex;
            justify-content: space-between;
          }
          .sound-img-and-text img{
            margin: 0 14px;
          }
          .top{
            padding: 0 14px 0 0;
            display: flex;
            justify-content: space-between;
          }
          .bottom{
            background: #1f1f1f;
            color: white;
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

export default LiveSchedule