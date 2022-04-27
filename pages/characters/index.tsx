import { Box, Container, Grid } from "@mui/material";
import type { GetStaticProps, NextPage } from "next";
import Head from "next/head";
import { useEffect, useState } from "react";
import { dehydrate, QueryClient, useQuery } from "react-query";
import CharacterCard from "../../components/CharacterCard";
import PageButton from "../../components/PageButton";
import SearchInput from "../../components/SearchInput";
import { Characters } from "../../interfaces/ICharacter";
import CharacterService from "../../services/CharacterService";

const Characters: NextPage = () => {
  const [page, setPage] = useState("1");
  const [characters, setCharacters] = useState({} as Characters); // Empty object with Character object interface
  const { data, isPreviousData } = useQuery<Characters>(
    ["characters", page],
    () => CharacterService.getCharactersByPage(page),
    { keepPreviousData: true }
  );

  const handlePrevious = () => {
    parseInt(page) > 0 && setPage(`${parseInt(page) - 1}`);
  };
  const handleNext = () => {
    if (characters && parseInt(page) < characters.info.pages)
      setPage(`${parseInt(page) + 1}`);
    else setPage(`${characters.info.pages}`);
  };

  useEffect(() => {
    // useEffect to set data and avoid 'undefined' from Characters
    data && setCharacters(data);
  }, [data]);

  return (
    <Container className="main-container">
      <Head>
        <title>Rick and Morty</title>
        <link rel="icon" href="/rick-morty.ico" />
      </Head>

      <SearchInput characters={characters.results} />

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
          {characters.results &&
            characters.results.map((character) => (
              <Grid item key={character.id}>
                <CharacterCard character={character}></CharacterCard>
              </Grid>
            ))}
        </Grid>
      </Box>
    </Container>
  );
};

export default Characters;

export const getStaticProps: GetStaticProps = async (context) => {
  //revalidate
  const page =
    typeof context.params?.page === "string" ? context.params?.page : "1";
  const queryClient = new QueryClient();
  await queryClient.prefetchQuery(["characters", page], () =>
    CharacterService.getCharactersByPage(page)
  );

  return {
    props: {
      dehydratedState: dehydrate(queryClient),
    },
  };
};
