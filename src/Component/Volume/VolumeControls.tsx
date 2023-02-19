import React, { useState } from "react";
import { makeStyles } from "@mui/styles";
import styled from "@emotion/styled";
import { IconButton, Slider } from "@mui/material";
import { VolumeUp, VolumeOff } from "@mui/icons-material";
import ReactPlayer from "react-player";

const useStyles = makeStyles((theme) => ({
  root: {
    display: "flex",
    alignItems: "center",
  },
  volumeIcon: {},
}));
interface VolumeControlsProps {
  playerRef: React.RefObject<ReactPlayer>;
  volume: number;
  setVolume: (volume: number) => void;
}

const SliderStyled = styled(Slider)`
  width: 100%;
  height: 100%;
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

const IconButtonStyled = styled(IconButton)`
  width: 40px;
  height: 40px;
  color: #fff;
  margin-left: 10px;
  & svg {
    font-size: 2.5rem;
  }
`;

const VolumeControls = (props: VolumeControlsProps) => {
  const { playerRef, volume, setVolume } = props;
  const classes = useStyles();
  const handleMuteClick = () => {
    if (playerRef.current) {
      if (volume > 0) {
        setVolume(0);
      } else {
        setVolume(0.5);
      }
    }
  };
  const handleVolumeChange = (
    event: React.ChangeEvent<{}>,
    value: number | number[]
  ) => {
    if (typeof value === "number") {
      setVolume(value);
    }
  };
  return (
    <div className={"flex items-center w-full h-2/4 ml-3"}>
      <IconButtonStyled onClick={handleMuteClick}>
        {volume > 0 ? (
          <VolumeUp className={classes.volumeIcon} />
        ) : (
          <VolumeOff className={classes.volumeIcon} />
        )}
      </IconButtonStyled>
      <SliderStyled
        value={volume}
        //@ts-ignore
        onChange={handleVolumeChange}
        step={0.01}
        min={0}
        max={1}
      />
    </div>
  );
};

export default VolumeControls;
