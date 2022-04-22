import { Box, Container, Grid } from "@mui/material";
import type { NextPage } from "next";
import Head from "next/head";
import { useState } from "react";
import { useQuery } from "react-query";
import CharacterCard from "../components/CharacterCard";
import { Characters } from "../interfaces/ICharacter";

const getCharacters = async (page: string) => {
  const res = await fetch(
    `https://rickandmortyapi.com/api/character/?page=${page}`
  );
  const characters: Characters = await res.json();
  return characters;
};

const Home: NextPage = () => {
  const [page, setPage] = useState("3");
  const { data, isPreviousData } = useQuery(
    ["characters", page],
    () => getCharacters(page),
    { keepPreviousData: true }
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

// export const getStaticProps: GetStaticProps = async (context) => {
//   const page = context.params?.page as string;
//   const queryClient = new QueryClient();
//   await queryClient.prefetchQuery(["characters", page], getCharacters(page));

//   return {
//     props: {
//       dehydratedState: dehydrate(queryClient),
//     },
//   };
// };
