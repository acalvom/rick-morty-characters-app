import { Circle } from "@mui/icons-material";
import { Status } from "../interfaces/ICharacter";
export default function StatusCircle(props: { status: Status }) {
  const status = props.status;
  const color =
    status === "Alive" ? "green" : status === "Dead" ? "red" : "gray";

  return (
    <Circle
      sx={{ color: color, fontSize: "small", margin: "0 0.5em" }}
    ></Circle>
  );
}
