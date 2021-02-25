import React, {useState} from "react"
import ReactHtmlParser from "react-html-parser"
import {Media, Player, controls} from 'react-media-player'

const AudioTrack = props => {
  return (
    <button className="track-item" onClick={() => props.setCurrentTrackNumber(props.trackNumber)}>
      {ReactHtmlParser(props.title)}
      <style jsx>
        {`
          .track-item {
            display: block;
            border: none;
            width: 100%;
            background: #f3f3f3;
            color: ${props.currentTrackNumber === props.trackNumber ? "#01005c" : "#151515"};
            font-weight: ${props.currentTrackNumber === props.trackNumber ? "bold" : "normal"};
            padding: 7px;
            border-bottom: solid 1px black;
            box-sizing: border-box;
            cursor: pointer;
            text-align: left;
          }

          .track-item:hover {
            background: #e5e7ed;
          }
        `}
      </style>
    </button>
  )
}

const PrevTrack = ({onClick, className}) => {
  return (
    <button className={className} onClick={onClick}><svg style={{transform:"scale(-1,1)"}} xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24"><path d="M19 12l-18 12v-24l18 12zm4-11h-4v22h4v-22z"/></svg></button>
  )
}

const NextTrack = ({onClick, className}) => {
  return (
    <button className={className} onClick={onClick}><svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24"><path d="M19 12l-18 12v-24l18 12zm4-11h-4v22h4v-22z"/></svg></button>
  )
}
const PlayPause = ({onClick, className, mediaProps}) => {
  return (
    <button className={className} onClick={onClick}>
      <svg style={{display: mediaProps.isPlaying ? "none" : "block"}} xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24"><path d="M3 22v-20l18 10-18 10z"/></svg>
      <svg style={{display: mediaProps.isPlaying ? "block" : "none"}} xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24"><path d="M11 22h-4v-20h4v20zm6-20h-4v20h4v-20z"/></svg>
    </button>
  )
}

const PlayListControl = ({onClick, className}) => {
  return (
    <button className={className} onClick={onClick}><svg width="24" height="24" xmlns="http://www.w3.org/2000/svg" fill-rule="evenodd" clip-rule="evenodd"><path d="M15 21v-10l9 5-9 5zm-3 0h-12v-2h12v2zm0-4.024h-12v-2h12v2zm0-3.976h-12v-2h12v2zm12-4h-24v-2h24v2zm0-6v2h-24v-2h24z"/></svg></button>
  )
}

const AudioPlayer = props => {
  const {
    CurrentTime,
    SeekBar,
    Duration,
    Volume,
  } = controls

  const [currentTrackNumber, setCurrentTrackNumber] = useState(0)
  const [currentTrack, setCurrentTrack] = useState(props.audio[currentTrackNumber])
  const [autoplayIsOn, setAutoPlay] = useState(false)
  const [showPlayList, setPlayListVisibility] = useState(true)

  const updateTrackNumberAndUrl = (trackNumber) => {
    setCurrentTrack(props.audio[trackNumber])
    setCurrentTrackNumber(trackNumber)
  }

  const handleTrackChange = (trackNumber) => {
    updateTrackNumberAndUrl(trackNumber)
    setAutoPlay(true)
  }
  const handlePrevTrack = () => {
    const prevTrack = currentTrackNumber >= 1 ? currentTrackNumber - 1 : props.audio.length - 1
    updateTrackNumberAndUrl(prevTrack)
    setAutoPlay(true)
  }
  const handleNextTrack = () => {
    const nextTrack = currentTrackNumber + 1 < props.audio.length - 1 ? currentTrackNumber + 1 : 0
    updateTrackNumberAndUrl(nextTrack)
    setAutoPlay(true)
  }
  const handlePlaylistVisibility = () => {
    setPlayListVisibility(!showPlayList)
  }

  const tracks = props.audio.map((track, index) => {
    return (
      <AudioTrack
        key={track.title}
        title={track.title}
        trackNumber={index}
        setCurrentTrackNumber={handleTrackChange}
        currentTrackNumber={currentTrackNumber}
      />
    )
  })

  if (!tracks.length){
    return ("")
  }
  return (
    <div className="audio-player-container">
      <div className="track-and-controls">
        <div className="thumbnail-and-track">
      {/*    {
            currentTrack.thumbnail ?
              <Image
                className="track_thumb"
                src={currentTrack.thumbnail[0]}
                width={currentTrack.thumbnail[1]}
                height={currentTrack.thumbnail[2]}
                alt=""
              /> :
              ""
          }*/}
          <div className="current-track">
            {ReactHtmlParser(props.audio[currentTrackNumber].title)}
          </div>
        </div>
        <Media>
          {mediaProps => (
            <div>
              <div
                className="media-player-element"
              >
                <Player
                  src={props.audio[currentTrackNumber].url}
                  vendor="audio"
                  autoPlay={autoplayIsOn}
                  onEnded={() => handleNextTrack()}
                />
              </div>
              <div className="media-controls media-controls--full">
                <div className="media-row">
                  <div className="media-control-group">
                    <PrevTrack
                      className="media-control media-control--button media-control--prev-track"
                      onClick={() => {
                        handlePrevTrack()
                        mediaProps.play()
                      }}
                    />
                    <PlayPause
                      mediaProps={mediaProps}
                      className="media-control media-control--button media-control--button-outlined media-control--play-pause"
                      onClick={() => mediaProps.playPause()}/>
                    <NextTrack
                      className="media-control media-control--button media-control--next-track"
                      onClick={() => handleNextTrack(mediaProps)}
                    />
                  </div>
                  <div className="media-control-group">
                    <SeekBar className="media-control media-control--seekbar"/>
                    <CurrentTime className="media-control media-control--current-time"/>
                    /
                    <Duration className="media-control media-control--duration"/>
                  </div>
                </div>
                <div className="media-row">
                  <PlayListControl className="media-control media-control--button media-control--play-list-control"
                                   onClick={() => handlePlaylistVisibility()}/>
                  <svg style={{fill: "#dbdbdb", marginRight:"4px"}} xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24"><path d="M3 9v6h-1v-6h1zm13-7l-9 5v2.288l7-3.889v13.202l-7-3.889v2.288l9 5v-20zm-11 5h-5v10h5v-10zm13.008 2.093c.742.743 1.2 1.77 1.198 2.903-.002 1.133-.462 2.158-1.205 2.9l1.219 1.223c1.057-1.053 1.712-2.511 1.715-4.121.002-1.611-.648-3.068-1.702-4.125l-1.225 1.22zm2.142-2.135c1.288 1.292 2.082 3.073 2.079 5.041s-.804 3.75-2.096 5.039l1.25 1.254c1.612-1.608 2.613-3.834 2.616-6.291.005-2.457-.986-4.681-2.595-6.293l-1.254 1.25z"/></svg>
                  <Volume className="media-control media-control--volume"/>
                </div>
              </div>
            </div>
          )}
        </Media>

      </div>
      <div className="track-list">
        {tracks}
      </div>
      <style jsx>
        {`
          .audio-player-container {
            display: block;
            width: 750px;
            overflow: hidden;
            padding: 0;
            padding-bottom: 21px;
            box-sizing: border-box;
            margin-left: auto;
            margin-right: auto;
            min-width: 50%;
            max-width: 100%;
            margin-bottom: 14px;
          }

          .track-and-controls {
            padding: 0;
            box-sizing: border-box;
          }

          .thumbnail-and-track {
            background: ${currentTrack.thumbnail ? `url(${currentTrack.thumbnail[0]})` : "url(/img/audio-player-default-thumb.png)"};
            background-size: contain;
            background-position: center;
            background-repeat: no-repeat;
            background-color: #fafafa;
            text-align: left;
            font-weight: bold;
            font-size: 1.2em;
            color: #0d2d4e;
            width: 100%;
            padding-top: 62%;
            display: flex;
            flex-direction: column;
            position: relative;
          }

          .current-track {
            margin-top: auto;
            background: rgba(255, 255, 255, .9);
            padding: 14px;
            font-size: 1.2rem;
            box-sizing: border-box;
            position: absolute;
            bottom: 0;
            left: 0;
            right: 0;
          }

          audio {
            max-width: 100%;
            width: 500px;
            margin-left: auto;
            margin-right: auto;
            display: block;
            margin-bottom: 7px;
            border-radius: 0;
          }

          .track-list {
            width: 100%;
            margin-left: auto;
            margin-right: auto;
            max-width: 100%;
            overflow-y: auto;
            transition: max-height 2s;
            max-height: ${showPlayList ? '500px' : 0};
          }
        `}
      </style>
    </div>
  )
}

export default AudioPlayer