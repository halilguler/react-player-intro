import React from "react";
import { IconButton } from "@mui/material";
import { PlayArrow, Pause } from "@mui/icons-material";
import styled from "@emotion/styled";

interface PlayControlsProps {
  isPlaying: boolean;
  setIsPlaying: (isPlaying: boolean) => void;
  handlePlayPause: () => void;
}

const IconButtonStyled = styled(IconButton)`
  width: 40px;
  height: 40px;
  color: #fff;
  margin-left: 10px;

  & svg {
    font-size: 2.5rem;
  }
`;

const PlayControls = (props: PlayControlsProps) => {
  const { isPlaying, setIsPlaying, handlePlayPause } = props;
  return (
    <IconButtonStyled onClick={handlePlayPause}>
      {isPlaying ? <Pause /> : <PlayArrow />}
    </IconButtonStyled>
  );
};

export default PlayControls;
