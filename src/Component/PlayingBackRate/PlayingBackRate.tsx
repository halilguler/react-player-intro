import React from "react";
import { IconButton } from "@mui/material";
import { Slider, Popover, Typography, Box } from "@mui/material";
import styled from "@emotion/styled";
import { Speed } from "@mui/icons-material";

interface PlayingBackRateProps {
  playbackRate: number;
  handlePlaybackRateChange: (
    event: React.ChangeEvent<{ value: number }>
  ) => void;
  playBackRateRef: React.RefObject<HTMLDivElement>;
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
const marks = [
  {
    value: 0.5,
    label: "0.5x",
  },
  {
    value: 0.75,
    label: "0.75x",
  },
  {
    value: 1,
    label: "1x",
  },
  {
    value: 1.25,
    label: "1.25x",
  },
  {
    value: 1.5,
    label: "1.5x",
  },
];

const PlayingBackRate = (props: PlayingBackRateProps) => {
  const { playbackRate, handlePlaybackRateChange } = props;
  const [value, setValue] = React.useState<number>(playbackRate);
  const [visible, setVisible] = React.useState<boolean>(false);
  const handlePopoverOpen = (event: React.MouseEvent<HTMLElement>) => {
    event.stopPropagation();
    setVisible((prev) => !prev);
  };

  const handlePopoverChange = (value: number) => {
    setValue(value);

    handlePlaybackRateChange({ target: { value } } as any);
  };

  return (
    <>
      {visible && (
        <div
          style={{
            display: "flex",
            alignItems: "center",
            position: "relative",
            left: "unset",
          }}
        >
          <Box
            width={350}
            className="absolute top-unset bottom-16 z-10 bg-white rounded-md shadow-md flex flex-col"
            sx={{ p: 2, transform: "translateX(-90%)" }}
          >
            <div className="ml-2">
              <Typography className="flex ml-3" variant="h6" gutterBottom>
                Yürütme Hızı
              </Typography>
            </div>
            <div className="flex items-center justify-center">
              <Slider
                className="flex justify-center items-center"
                value={value}
                onChange={(event, newValue) =>
                  handlePopoverChange(newValue as number)
                }
                step={0.25}
                marks={marks}
                min={0.5}
                max={1.5}
                valueLabelDisplay={"auto"}
                valueLabelFormat={(value) => `${value}x`}
                sx={{ width: 300 }}
              />
            </div>
          </Box>
        </div>
      )}

      <IconButtonStyled
        onClick={handlePopoverOpen}
        size="small"
        // onMouseEnter={handlePopoverOpen}
        sx={{ ml: 2 }}
      >
        <Speed />
      </IconButtonStyled>
    </>
  );
};

export default PlayingBackRate;
