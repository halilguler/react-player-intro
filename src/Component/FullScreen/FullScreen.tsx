import { FullscreenRounded,FullscreenExitRounded } from "@mui/icons-material";
import { IconButton } from "@mui/material";
import screenfull from "screenfull";
import React from "react";
import { findDOMNode } from "react-dom";
import styled from "@emotion/styled";

interface FullScreenProps {
  wrapperRef: React.RefObject<HTMLDivElement>;
}

const IconButtonStyled = styled(IconButton)`
  width: 40px;
  height: 40px;
  margin-left: 10px;
`;

const FullScreen = (props: FullScreenProps) => {
  const { wrapperRef } = props;
  const [isFullscreen, setIsFullscreen] = React.useState(false);
  const handleFullscreen = () => {
    screenfull.toggle(findDOMNode(wrapperRef!.current) as Element);
    setIsFullscreen(!isFullscreen);
  };
  return (
    <IconButtonStyled onClick={handleFullscreen}>
      {isFullscreen ? (
        <FullscreenExitRounded sx={{ fontSize: "2rem", color: "white" }} />
        ):(
        <FullscreenRounded sx={{ fontSize: "2rem", color: "white" }} />
        )}
    </IconButtonStyled>
  );
};

export default FullScreen;
