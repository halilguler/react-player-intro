import { Forward10, Replay10 } from "@mui/icons-material";
import { IconButton } from "@mui/material";
import styled from "@emotion/styled";
interface ForwardSeekToProps {
  handleFastForward: () => void;
  handleRewindForward: () => void;
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

const FastForwardSeekTo = (props: ForwardSeekToProps) => {
  const { handleFastForward, handleRewindForward } = props;
  return (
    <>
      <div className="flex">
        <IconButtonStyled>
          <Replay10 onClick={handleRewindForward} />
        </IconButtonStyled>
      </div>
      <div className="flex">
        <IconButtonStyled>
          <Forward10 onClick={handleFastForward} />
        </IconButtonStyled>
      </div>
    </>
  );
};

export default FastForwardSeekTo;
