import Autocomplete from "@mui/material/Autocomplete";
import Stack from "@mui/material/Stack";
import TextField from "@mui/material/TextField";
import * as React from "react";
import { Character } from "../interfaces/ICharacter";

export default function SearchInput(props: { characters: Character[] }) {
  const characters = props.characters ?? []; // If characters in undefined, set to empty array
  return (
    <Stack spacing={2} sx={{ maxWidth: 500, margin: "auto" }}>
      <Autocomplete
        freeSolo
        id="free-solo-2-demo"
        selectOnFocus
        clearOnBlur
        handleHomeEndKeys
        options={characters.map((item) => item.name)}
        renderInput={(params) => (
          <TextField
            {...params}
            label="Search character"
            InputProps={{
              ...params.InputProps,
              type: "search",
            }}
          />
        )}
      />
    </Stack>
  );
}
