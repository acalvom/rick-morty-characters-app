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

  console.log("data", data);

  return (
    <Container maxWidth="sm">
      <Head>
        <title>Character Info</title>
      </Head>
    </Container>
  );
};

export const getStaticPaths: GetStaticPaths = async () => {
  return { paths: [], fallback: "blocking" };
};

export const getStaticProps: GetStaticProps = async (context) => {
  const id = typeof context.params?.id === "string" ? context.params?.id : "0";
  const queryClient = new QueryClient();
  console.log(id);
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
