import { CardActionArea } from "@mui/material";
import Card from "@mui/material/Card";
import CardContent from "@mui/material/CardContent";
import CardMedia from "@mui/material/CardMedia";
import Typography from "@mui/material/Typography";
import * as React from "react";
import { Character } from "../interfaces/ICharacter";

export default function CharacterCard(props: { character: Character }) {
  console.log("character", props.character);
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
          <Typography align="center" gutterBottom variant="h6" component="div">
            {character.name}
          </Typography>
          <Typography variant="overline" display="block" gutterBottom>
            {character.status} - {character.species} ({character.gender})
          </Typography>
          <Typography variant="body2" color="text.secondary">
            Lizards are a widespread group of squamate reptiles, with over 6,000
            species, ranging across all continents except Antarctica
          </Typography>
        </CardContent>
      </CardActionArea>
    </Card>
  );
}
