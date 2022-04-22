import { Box, Container, Grid } from "@mui/material";
import type { GetStaticProps, NextPage } from "next";
import Head from "next/head";
import { dehydrate, QueryClient, useQuery } from "react-query";
import CharacterCard from "../components/CharacterCard";
import { Characters } from "../interfaces/ICharacter";

const getCharacters = async () => {
  const res = await fetch("https://rickandmortyapi.com/api/character");
  const characters: Characters = await res.json();
  return characters;
};

const Home: NextPage = () => {
  const { data } = useQuery("characters", getCharacters);

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
              <Grid item key={character.id}>
                <CharacterCard character={character}></CharacterCard>
              </Grid>
            ))}
        </Grid>
      </Box>
    </Container>
  );
};

export default Home;

export const getStaticProps: GetStaticProps = async ({}) => {
  const queryClient = new QueryClient();
  await queryClient.prefetchQuery("characters", getCharacters);

  return {
    props: {
      dehydratedState: dehydrate(queryClient),
    },
  };
};
