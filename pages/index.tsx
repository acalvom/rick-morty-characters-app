import { Box, Container, Grid, Typography } from "@mui/material";
import type { NextPage } from "next";
import Head from "next/head";
import { useQuery } from "react-query";
import CharacterCard from "../components/CharacterCard";

const Home: NextPage = () => {
  const getCharacters: any = async () => {
    const res = await fetch("https://rickandmortyapi.com/api/character");
    const data = await res.json();
    console.log(data);
    return data;
  };

  const { data, status, error } = useQuery(["characters"], getCharacters);

  console.log("query", data, status, error);

  return (
    <Container>
      <Head>
        <title>Rick and Morty</title>
        <link rel="icon" href="/favicon.ico" />
      </Head>
      <Typography variant="h2" align="center" gutterBottom component="div">
        Characters
      </Typography>

      <Box alignContent="center">
        <Grid className="card-list" container spacing={1}>
          <Grid item>
            <CharacterCard />
          </Grid>
          <Grid item>
            <CharacterCard />
          </Grid>
          <Grid item>
            <CharacterCard />
          </Grid>
          <Grid item>
            <CharacterCard />
          </Grid>
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
