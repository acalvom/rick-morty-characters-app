import { Box, Button, Container, Grid } from "@mui/material";
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
  const [page, setPage] = useState("1");
  const { data, isPreviousData } = useQuery(
    ["characters", page],
    () => getCharacters(page),
    { keepPreviousData: true }
  );

  // console.log(data, page);

  return (
    <Container className="main-container">
      <Head>
        <title>Rick and Morty</title>
        <link rel="icon" href="/favicon.ico" />
      </Head>

      <Box className="page-btn-box">
        <Button
          className="page-btn"
          variant="contained"
          disabled={isPreviousData}
          onClick={() => parseInt(page) > 0 && setPage(`${parseInt(page) - 1}`)}
        >
          Previous
        </Button>
        <Button
          className="page-btn"
          variant="contained"
          disabled={isPreviousData}
          onClick={() => setPage(`${parseInt(page) + 1}`)}
        >
          Next
        </Button>
      </Box>

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
