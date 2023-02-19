import React from "react";
import styled from "@emotion/styled";
interface TimeCurrentProps {
  currentTime: number;
  duration: number;
}

const DivStyled = styled.div`
  color: #fff;
  font-size: 14px;
  font-weight: 500;
  line-height: 1.5;
  letter-spacing: 0.5px;
  text-align: center;
`;

const TimeCurrent = (props: TimeCurrentProps) => {
  const { currentTime, duration } = props;
  const secondsToTime = (seconds: number): string => {
    const hours = Math.floor(seconds / 3600);
    const minutes = Math.floor((seconds % 3600) / 60);
    const remainingSeconds = Math.floor(seconds % 60);

    const formattedHours = hours.toString().padStart(2, "0");
    const formattedMinutes = minutes.toString().padStart(2, "0");
    const formattedSeconds = remainingSeconds.toString().padStart(2, "0");

    return `${formattedHours}:${formattedMinutes}:${formattedSeconds}`;
  };
  return (
    <DivStyled>
      {secondsToTime(currentTime)} / {secondsToTime(duration)}
    </DivStyled>
  );
};

export default TimeCurrent;
