import { PlayArrowRounded } from "@mui/icons-material";
import { CircularProgress, Container, Slider } from "@mui/material";
import React, { useCallback, useEffect, useRef, useState } from "react";
import ReactPlayer from "react-player";
import PlayControls from "./Component/PlayControls.tsx/PlayControls";
import { VideoSlider } from "./Component/Slider/VideoSlider";
import TimeCurrent from "./Component/TimeCurrent/TimeCurrent";
import VolumeControls from "./Component/Volume/VolumeControls";
import styled from "@emotion/styled";
import PlayerOverlay from "./Component/PlayerOverlay/PlayerOverlay";
import FullScreen from "./Component/FullScreen/FullScreen";
import FastForwardSeekTo from "./Component/FastForwardSeekTo/ForwardSeekTo";
import PlayingBackRate from "./Component/PlayingBackRate/PlayingBackRate";
interface VideoPlayerProps {
  url: string;
  light?: string;
}

const StyledPlayerControls = styled.div`
  position: absolute;
  padding: 10px;
  box-sizing: border-box;
  bottom: 0;
  width: 100%;
  height: 100%;
  display: flex;
  left: 0;
  width: 100%;
  background-color: rgba(0, 0, 0, 0.1);
  transition: opacity 0.2s ease-in-out;
`;

const StyledPlayer = styled.div`
  position: relative;
  aspect-ratio: 16/9;
  overflow: hidden;
  .react-player__preview:before {
    content: "";
    display: block;
    position: absolute;
    top: 0;
    left: 0;
    width: 100%;
    height: 100%;
    background: linear-gradient(to top, rgba(0, 0, 0, 0.1), transparent);
  }
`;

const CircularProgressStyled = styled(CircularProgress)`
  position: absolute;
  top: 50%;
  left: 50%;
  transform: translate(-50%, -50%);
  & .MuiCircularProgress-svg {
    color: #fff;
  }
`;

const App: React.FC<VideoPlayerProps> = ({ url, light }) => {
  const playerRef = useRef<ReactPlayer | null>(null);
  const timeoutRef = useRef<NodeJS.Timeout>();
  const wrapperRef = useRef<HTMLDivElement>(null);

  const [playing, setPlaying] = useState<boolean>(false);
  const [duration, setDuration] = useState<number>(0);
  const [currentTime, setCurrentTime] = useState<number>(0);
  const [isDragging, setIsDragging] = useState<boolean>(false);
  const [volume, setVolume] = useState(0.5);
  const [controls, setControls] = useState(false);
  const [lightState, setLightState] = useState(true);
  const [buffer, setBuffer] = useState(false);
  const controlRef = useRef<HTMLDivElement>(null);
  const [trackLang, setTrackLang] = useState("it");
  const [playbackRate, setPlaybackRate] = useState<number>(1);
  const [showControls, setShowControls] = useState<boolean>(false);

  const config = {
    file: {
      attributes: {
        crossOrigin: "anonymous",
      },
    },
    tracks: [
      {
        kind: "subtitles",
        src: "https://raw.githubusercontent.com/benwfreed/test-subtitles/master/mmvo72166981784.vtt",
        srcLang: "tr",
        default: true,
        mode: trackLang === "it" ? "showing" : "hidden",
      },
    ],
  };
  useEffect(() => {
    const textTracks = playerRef.current!.getInternalPlayer()?.textTracks;

    for (var i = 0; textTracks?.length && i < textTracks.length; i++) {
      // For the 'subtitles-off' button, the first condition will never match so all will subtitles be turned off
      if (textTracks[i].language === trackLang) {
        textTracks[i].mode = "showing";
      } else {
        textTracks[i].mode = "hidden";
      }
    }
  }, [trackLang]);
  const handlePlayPause = useCallback(() => {
    setPlaying((prevPlaying) => !prevPlaying);
  }, []);

  useEffect(() => {
    const intervalId = setInterval(() => {
      if (playerRef.current && !isDragging) {
        setCurrentTime(playerRef.current.getCurrentTime());
      }
    }, 250);

    return () => {
      clearInterval(intervalId);
    };
  }, [isDragging]);

  const handleMouseMove = () => {
    setShowControls(true);
    document.body.style.cursor = "auto";

    clearTimeout(timeoutRef.current);
    timeoutRef.current = setTimeout(() => {
      setShowControls(false);
      document.body.style.cursor = "none";
    }, 3000);
  };

  const handleMouseLeave = () => {
    clearTimeout(timeoutRef.current);
    timeoutRef.current = setTimeout(() => {
      setShowControls(false);
    }, 2000);
  };

  const handleDuration = (duration: number) => {
    setDuration(duration);
  };
  const handleSliderChange = (event: any, value: number | number[]) => {
    const time = (+value / 100) * duration;
    setCurrentTime(time);
    playerRef.current!.seekTo(time, "seconds");
  };

  const handlePreview = () => {
    setControls(true);
    setPlaying(true);
  };

  const handleEnded = () => {
    playerRef.current?.showPreview();
  };

  const bufferStartHandler = () => {
    setBuffer(true);
  };

  const bufferEndHandler = () => {
    setBuffer(false);
  };

  const handleFastFoward = () => {
    playerRef.current!.seekTo(playerRef.current!.getCurrentTime() + 10);
  };
  const handleRewindFoward = () => {
    playerRef.current!.seekTo(playerRef.current!.getCurrentTime() - 10);
  };

  const handlePlaybackRateChange = (
    event: React.ChangeEvent<{ value: number }>
  ) => {
    setPlaybackRate(event.target.value);
  };
  return (
    <div>
      <StyledPlayer ref={wrapperRef}>
        <div onMouseMove={handleMouseMove} onMouseLeave={handleMouseLeave}>
          <ReactPlayer
            ref={playerRef}
            url={url}
            playing={playing}
            muted={false}
            playIcon={
              <PlayArrowRounded
                sx={{
                  color: "white",
                  fontSize: "6rem",
                }}
              />
            }
            config={config}
            width="100%"
            height="100%"
            controls={controls}
            volume={volume}
            onDuration={handleDuration}
            onProgress={(progress) => {
              if (!isDragging) {
                setCurrentTime(progress.playedSeconds);
              }
            }}
            onClickPreview={handlePreview}
            onBuffer={bufferStartHandler}
            onBufferEnd={bufferEndHandler}
            onEnded={handleEnded}
            playbackRate={playbackRate}
          />
          {buffer && <CircularProgressStyled />}
          {trackLang}
          <PlayerOverlay lightState={lightState} playing={playing} />
          {showControls && (
            <StyledPlayerControls
              className="video-player__controls flex flex-col"
              ref={controlRef}
            >
              <div
                className="flex h-full"
                onClick={() => {
                  handlePlayPause();
                }}
              ></div>
              <div className="flex flex-col w-full ">
                <div className="flex w-full">
                  <VideoSlider
                    playerRef={playerRef}
                    duration={duration}
                    setDuration={setDuration}
                    currentTime={currentTime}
                    setCurrentTime={setCurrentTime}
                    handleDuration={handleDuration}
                    handleSliderChange={handleSliderChange}
                    isDragging={isDragging}
                    setIsDragging={setIsDragging}
                  />
                </div>
                <div className="flex items-center w-full justify-between">
                  <div className="flex items-center w-full">
                    <div className="flex gap-3">
                      <div className="flex">
                        <PlayControls
                          isPlaying={playing}
                          setIsPlaying={setPlaying}
                          handlePlayPause={handlePlayPause}
                        />
                      </div>
                      <div className="flex gap-2">
                        <FastForwardSeekTo
                          handleFastForward={handleFastFoward}
                          handleRewindForward={handleRewindFoward}
                        />
                      </div>
                    </div>
                    <div className="flex w-1/5">
                      <VolumeControls
                        volume={volume}
                        setVolume={setVolume}
                        playerRef={playerRef}
                      />
                    </div>
                    <div className="flex ml-6">
                      <TimeCurrent
                        currentTime={currentTime}
                        duration={duration}
                      />
                    </div>
                  </div>
                  <div className="flex">
                    <PlayingBackRate
                      playbackRate={playbackRate}
                      handlePlaybackRateChange={handlePlaybackRateChange}
                      playBackRateRef={wrapperRef}
                    />
                    <FullScreen wrapperRef={wrapperRef} />
                  </div>
                </div>
              </div>
            </StyledPlayerControls>
          )}
        </div>
      </StyledPlayer>
    </div>
  );
};

export default App;
