import { Slider } from "@mui/material";
import React, { useState, useCallback, useEffect } from "react";
import ReactPlayer from "react-player";
import styled from "@emotion/styled";
interface VideoSliderProps {
  isDragging: boolean;
  duration: number;
  setDuration: (duration: number) => void;
  setIsDragging: (isDragging: boolean) => void;
  currentTime: number;
  setCurrentTime: (currentTime: number) => void;
  handleDuration: (duration: number) => void;
  handleSliderChange: (event: any, value: number | number[]) => void;
  playerRef: React.RefObject<ReactPlayer>;
}

const SliderStyled = styled(Slider)`
  width: 100%;
  margin-left: 10px;
  margin-right: 10px;
  .MuiSlider-rail {
    height: 4px;
    border-radius: 2px;
    background-color: #fff;
  }
  .MuiSlider-track {
    height: 10px;
    border-radius: 2px;
    background-color: #fff;
  }
  .MuiSlider-thumb {
    width: 12px;
    height: 12px;
    border-radius: 50%;
    background-color: #fff;
  }
`;

export const VideoSlider = (props: VideoSliderProps) => {
  const {
    isDragging,
    duration,
    setCurrentTime,
    currentTime,
    setIsDragging,
    handleSliderChange,
    playerRef,
  } = props;

  const handleMouseMove = useCallback(
    (event: MouseEvent | TouchEvent) => {
      if (isDragging) {
        const slider = document.querySelector(".MuiSlider-root") as HTMLElement;
        const sliderRect = slider.getBoundingClientRect();
        const offsetX =
          (event instanceof MouseEvent
            ? event.clientX
            : event.touches[0].clientX) - sliderRect.left;
        const percent = offsetX / sliderRect.width;
        const time = percent * duration;
        setCurrentTime(time);
        playerRef.current!.seekTo(time, "seconds");
      }
    },
    [isDragging, duration]
  );

  useEffect(() => {
    if (isDragging) {
      window.addEventListener("mousemove", handleMouseMove);
      window.addEventListener("touchmove", handleMouseMove);
    }
    return () => {
      window.removeEventListener("mousemove", handleMouseMove);
      window.removeEventListener("touchmove", handleMouseMove);
    };
  }, [isDragging, handleMouseMove]);

  const valueLabelFormat = useCallback(
    (value: number) => {
      const currentSeconds = Math.round(currentTime);
      const durationSeconds = Math.round(duration);

      return `${formatTime(currentSeconds)} / ${formatTime(durationSeconds)}`;
    },
    [currentTime, duration]
  );

  const handleSliderDragStart = () => {
    setIsDragging(true);
  };

  const handleSliderDragEnd = () => {
    setIsDragging(false);
  };

  const formatTime = useCallback((seconds: number) => {
    const minutes = Math.floor(seconds / 60);
    const remainingSeconds = seconds % 60;

    return `${minutes}:${remainingSeconds < 10 ? "0" : ""}${remainingSeconds}`;
  }, []);

  return (
    <SliderStyled
      min={0}
      max={100}
      value={(currentTime / duration) * 100}
      valueLabelFormat={valueLabelFormat}
      onChange={handleSliderChange}
      onMouseDown={handleSliderDragStart}
      onTouchStart={handleSliderDragStart}
      onMouseUp={handleSliderDragEnd}
      onTouchEnd={handleSliderDragEnd}
      aria-labelledby="continuous-slider"
    />
  );
};
