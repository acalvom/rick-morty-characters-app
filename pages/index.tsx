import { Box, Container, Grid } from "@mui/material";
import type { GetStaticProps, NextPage } from "next";
import Head from "next/head";
import { useState } from "react";
import { dehydrate, QueryClient, useQuery } from "react-query";
import CharacterCard from "../components/CharacterCard";
import PageButton from "../components/PageButton";
import SearchInput from "../components/SearchInput";
import { Characters } from "../interfaces/ICharacter";
import CharacterService from "../services/CharacterService";

const Home: NextPage = () => {
  const [page, setPage] = useState("1");
  // const [characters, setCharacters] = useState([]);
  const { data, isPreviousData } = useQuery<Characters>(
    ["characters", page],
    () => CharacterService.getCharacters(page),
    { keepPreviousData: true }
  );

  const handlePrevious = () => {
    setPage(`${parseInt(page) - 1}`);
  };
  const handleNext = () => {
    setPage(`${parseInt(page) + 1}`);
  };

  return (
    <Container className="main-container">
      <Head>
        <title>Rick and Morty</title>
        <link rel="icon" href="/rick-morty.ico" />
      </Head>

      <SearchInput characters={data?.results} />

      <Box className="page-btn-box">
        <PageButton
          isPreviousData={isPreviousData}
          handleClick={handlePrevious}
          name="Previous"
        />
        <PageButton
          isPreviousData={isPreviousData}
          handleClick={handleNext}
          name="Next"
        />
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

export const getStaticProps: GetStaticProps = async (context) => {
  const page =
    typeof context.params?.page === "string" ? context.params?.page : "1";
  const queryClient = new QueryClient();
  await queryClient.prefetchQuery(["characters", page], () =>
    CharacterService.getCharacters(page)
  );

  return {
    props: {
      dehydratedState: dehydrate(queryClient),
    },
  };
};
