import { LocationSearching } from "@mui/icons-material";
import { Button } from "@mui/material";
import Autocomplete from "@mui/material/Autocomplete";
import Stack from "@mui/material/Stack";
import TextField from "@mui/material/TextField";
import * as React from "react";
import { Character } from "../interfaces/ICharacter";

export default function SearchInput(props: { characters: Character[] }) {
  const characters = props.characters ?? []; // If characters in undefined, set to empty array
  return (
    <Stack spacing={2} direction="row" justifyContent="center">
      <Autocomplete
        freeSolo
        sx={{ width: 400 }}
        id="free-solo-2-demo"
        selectOnFocus
        clearOnBlur
        disableClearable
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
      <Button
        sx={{ backgroundColor: "#ffc300" }}
        variant="contained"
        aria-label="search-character"
        endIcon={<LocationSearching />}
      >
        Find
      </Button>
    </Stack>
  );
}
