import { CardActionArea } from "@mui/material";
import Card from "@mui/material/Card";
import CardContent from "@mui/material/CardContent";
import CardMedia from "@mui/material/CardMedia";
import Typography from "@mui/material/Typography";
import * as React from "react";
import { Character } from "../interfaces/ICharacter";
import StatusCircle from "./StatusCircle";
export default function CharacterCard(props: { character: Character }) {
  const character = props.character;
  return (
    <Card sx={{ maxWidth: 300 }}>
      <CardActionArea>
        <CardMedia
          component="img"
          image={character.image}
          alt={character.name}
        />
        <CardContent>
          <Typography
            align="center"
            fontWeight="bold"
            gutterBottom
            variant="h6"
            component="div"
          >
            {character.name}
          </Typography>
          <Typography variant="overline" gutterBottom>
            <StatusCircle status={character.status} />
            {character.status} - {character.species} ({character.gender})
          </Typography>

          <Typography variant="subtitle2" color="text.secondary">
            <span className="subtitle-span">Last seen: </span>
            {character.location.name}
          </Typography>
        </CardContent>
      </CardActionArea>
    </Card>
  );
}
