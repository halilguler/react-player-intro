import * as React from "react";
import { Box, Chip, Fade, styled, Typography } from "@mui/material";
import { ReactPlayerProps } from "react-player";

const StyledPlayerOverlay = styled("div")<ReactPlayerProps>`
  position: absolute;
  width: 100%;
  box-sizing: border-box;
  pointer-events: none;
  display: flex;
  flex-direction: column;
  justify-content: end;
  left: 0;
  top: 0;
  bottom: ${({ state }) => (state.light ? "0" : "94px")};
  background-color: ${({ state }) =>
    state.light || state.playing ? "transparent" : "rgba(0, 0, 0, 0.4)"};
  opacity: ${({ state }) => (state.playing ? "0" : "1")};
  transition: opacity 0.2s ease-in-out;

  .video-player__overlay-inner {
    padding-left: ${({ state }) => (state.light ? "50px" : "25px")};
    padding-bottom: ${({ state }) => (state.light ? "50px" : "38px")};
    width: ${({ state }) => (state.light ? "auto" : "100%")};
  }
`;

interface PlayerOverlayProps {
  lightState?: boolean;
  playing: boolean;
}

const PlayerOverlay = (props: PlayerOverlayProps) => {
  return (
    <StyledPlayerOverlay state={props}>
      <Box className={"video-player__overlay-inner"}>
        <Fade in>
          <Chip label={"#1 in series"} color={"warning"} />
        </Fade>
        <Fade in>
          <Typography variant="h4" color={"white"} mt={2}>
            Lost in Japan
          </Typography>
        </Fade>
        <Fade in>
          <Typography variant="overline" color={"white"}>
            2022
          </Typography>
        </Fade>
      </Box>
    </StyledPlayerOverlay>
  );
};

export default PlayerOverlay;
