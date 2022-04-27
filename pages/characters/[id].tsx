import { Container } from "@mui/material";
import type { GetStaticPaths, GetStaticProps, NextPage } from "next";
import Head from "next/head";
import { useRouter } from "next/router";
import { dehydrate, QueryClient, useQuery } from "react-query";
import { Character } from "../../interfaces/ICharacter";
import CharacterService from "../../services/CharacterService";

const CharacterInfo: NextPage = () => {
  const router = useRouter();
  const { data } = useQuery<Character>(
    ["character", router.query.id],
    () => CharacterService.getCharacterById(String(router.query.id)),
    { keepPreviousData: true }
  );

  // console.log("data", data);

  return (
    <Container maxWidth="sm">
      <Head>
        <title>Character Info</title>
      </Head>
      <h1>{data?.name}</h1>
    </Container>
  );
};

export const getStaticPaths: GetStaticPaths = async () => {
  // const characters = await CharacterService.getCharacters();
  // console.log(characters);
  return {
    paths: [{ params: { id: "1" } }, { params: { id: "2" } }],
    fallback: true,
  };
};

export const getStaticProps: GetStaticProps = async (context) => {
  const id = typeof context.params?.id === "string" ? context.params?.id : "1";
  const queryClient = new QueryClient();
  await queryClient.prefetchQuery(["character", id], () =>
    CharacterService.getCharacterById(id)
  );
  return {
    props: {
      dehydratedState: dehydrate(queryClient),
    },
  };
};

export default CharacterInfo;
