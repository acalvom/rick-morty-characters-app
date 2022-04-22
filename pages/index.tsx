import { Box, Container, Grid } from "@mui/material";
import type { NextPage } from "next";
import Head from "next/head";
import { useQuery } from "react-query";
import CharacterCard from "../components/CharacterCard";
import { Characters } from "../interfaces/ICharacter";

const Home: NextPage = () => {
  const getCharacters = async () => {
    const res = await fetch("https://rickandmortyapi.com/api/character");
    const data: Characters = await res.json();
    return data;
  };

  const { data, isLoading, isFetching, isError } = useQuery(
    ["characters"],
    getCharacters
  );

  console.log(data);
  return (
    <Container className="main-container">
      <Head>
        <title>Rick and Morty</title>
        <link rel="icon" href="/favicon.ico" />
      </Head>

      <Box alignContent="center">
        <Grid className="card-list" container spacing={1}>
          {data &&
            data.results.map((character) => (
              <Grid item>
                <CharacterCard character={character}></CharacterCard>
              </Grid>
            ))}
        </Grid>
      </Box>
    </Container>
  );
};

export default Home;

// export const getStaticProps: GetStaticProps = async ({}) => {
//   const res = await fetch("https://rickandmortyapi.com/api/character");
//   const data = await res.json();
//   console.log(data);
//   return data;
// };
