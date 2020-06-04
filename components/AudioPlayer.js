import React, {useState, useEffect} from "react"
import ReactHtmlParser from "react-html-parser"

const AudioTrack = props => {
  //test
  return (
    <button className="track-item" onClick={() => props.setCurrentTrackNumber(props.trackNumber)}>
      {ReactHtmlParser(props.title)}
      <style jsx>
        {`
          .track-item{
            display: block;
            border: none;
            width:100%;
            background: #f3f3f3;
            color: ${props.currentTrackNumber === props.trackNumber ? "#01005c" : "#151515"};
            font-weight: ${props.currentTrackNumber === props.trackNumber ? "bold" : "normal"};
            padding: 7px;
            border-bottom: solid 1px black;
            box-sizing: border-box;
            cursor: pointer;
            text-align:left;
          }
          .track-item:hover{
            background: #e5e7ed;
          }
        `}
      </style>
    </button>
  )
}

const AudioPlayer = props => {
  const [currentTrackNumber, setCurrentTrackNumber] = useState(0)
  const [autoplayIsOn, setAutoPlay] = useState(false)

  const tracks = props.audio.map((track, index) => {
    return (
      <AudioTrack
        key={track.title}
        title={track.title}
        trackNumber={index}
        setCurrentTrackNumber={setCurrentTrackNumber}
        currentTrackNumber={currentTrackNumber}
      />
    )
  })

  useEffect(() => {
    document.getElementById('audio').load()
    autoplayIsOn ? document.getElementById('audio').play() : setAutoPlay(!autoplayIsOn)
  }, [currentTrackNumber])


  return (
    <div className="audio-player-container">
      <div className="track-and-controls">
        <div className="current-track">
          {ReactHtmlParser(props.audio[currentTrackNumber].title)}
        </div>
        <audio id="audio" controls onEnded={() => {
          setCurrentTrackNumber(
            (currentTrackNumber + 1) === props.audio.length ? 0 : currentTrackNumber + 1
          )
          if (currentTrackNumber + 1 === props.audio.length) {
            setAutoPlay(!autoplayIsOn)
          }
        }}>
          <source src={props.audio[currentTrackNumber].url}/>
        </audio>
      </div>
      <div className="track-list">
        {tracks}
      </div>
      <style jsx>
        {`
          .audio-player-container{
            display: block;
            width: 750px;
            padding: 7px;
            box-sizing: border-box;
            margin-left: auto;
            margin-right: auto;
            min-width: 50%;
            max-width: 100%;
            background: #353535;
            margin-bottom: 14px;
          }
          .track-and-controls{
            background: black;
            padding: 7px;
            box-sizing: border-box;
          }
          .current-track{
            text-align: center;
            font-weight: bold;
            margin-bottom: 7px;
            font-size: 1.5em;
          }
          #audio{
            max-width:100%;
            width: 500px;
            margin-left:auto;
            margin-right:auto;
            display:block;
            margin-bottom:7px;
            border-radius: 0;
          }
          @keyframes expand-down {
            from {
            max-height: 0;
            }
          
            to {
              max-height:500px;
            }
          }
          .track-list{
            width: 500px;
            margin-left:auto;
            margin-right:auto;
            max-width:100%;
            animation-name: expand-down;
            animation-duration: 1s;
            overflow-y: auto;
            max-height:500px;
          }
        `}
      </style>
    </div>
  )
}

export default AudioPlayer