import React, {useState, useEffect} from "react"
import ReactHtmlParser from "react-html-parser"
import {Media, Player, controls, utils} from 'react-media-player'

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

const PrevTrack = ({onClick}) => {
  return (
    <button onClick={onClick}>Prev</button>
  )
}

const NextTrack = ({onClick}) => {
  return (
    <button onClick={onClick}>Next</button>
  )
}
const PlayPause = ({onClick}) => {
  return (
    <button onClick={onClick}>Play/Pause</button>
  )
}
const PlayListControl = ({onClick}) => {
  return (
    <button onClick={onClick}>Show Playlist</button>
  )
}

const AudioPlayer = props => {
  const {
    CurrentTime,
    Progress,
    SeekBar,
    Duration,
    Volume,
    Fullscreen,
  } = controls

  const [currentTrackNumber, setCurrentTrackNumber] = useState(0)
  const [currentTrack, setCurrentTrack] = useState('')
  const [autoplayIsOn, setAutoPlay] = useState(false)
  const [showPlayList, setPlayListVisibility] = useState(false)


  const updateTrackNumberAndUrl = (trackNumber) => {
    setCurrentTrackNumber(trackNumber)
    setCurrentTrack(props.audio[currentTrackNumber].url)
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

  return (
    <div className="audio-player-container">
      <div className="track-and-controls">
        <div className="current-track">
          {ReactHtmlParser(props.audio[currentTrackNumber].title)}
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
                  <SeekBar className="media-control media-control--seekbar"/>
                  <CurrentTime className="media-control media-control--current-time"/>
                  /
                  <Duration className="media-control media-control--duration"/>
                </div>
                <div className="media-row">
                  <div className="media-control-group">

                    <PrevTrack
                      className="media-control media-control--prev-track"
                      onClick={() => {
                        handlePrevTrack()
                        mediaProps.play()
                      }}
                    />
                    <PlayPause className="media-control media-control--play-pause" onClick={() => mediaProps.playPause()}/>
                    <NextTrack
                      className="media-control media-control--next-track"
                      onClick={() => handleNextTrack(mediaProps)}
                    />
                  </div>
                </div>
                <div className="media-row">
                  <PlayListControl onClick={() => handlePlaylistVisibility()}/>
                  <Volume className="media-control media-control--volume" />
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
          .media-row {
            width: 100%;
          }

          .media-control--seekbar {
            width: 100%;
            display: none;
          }

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

          .current-track {
            text-align: left;
            font-weight: bold;
            margin-bottom: 7px;
            font-size: 1.5em;
            color: #0d2d4e;
            width: 400px;
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