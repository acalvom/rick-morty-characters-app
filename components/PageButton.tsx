import { Button } from "@mui/material";
export default function PageButton(props: {
  handleClick: () => void;
  isPreviousData: boolean;
  name: string;
}) {
  const handleClick = props.handleClick;
  return (
    <Button
      className="page-btn"
      variant="contained"
      disabled={props.isPreviousData}
      onClick={handleClick}
    >
      {props.name}
    </Button>
  );
}
