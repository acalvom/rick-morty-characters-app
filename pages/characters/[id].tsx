import { Container } from "@mui/material";
import type { GetStaticPaths, GetStaticProps, NextPage } from "next";
import Head from "next/head";
import { dehydrate, QueryClient, useQuery } from "react-query";
import { Character } from "../../interfaces/ICharacter";
import CharacterService from "../../services/CharacterService";

interface Props {
  id: string;
}

const CharacterInfo: NextPage<Props> = ({ id }) => {
  const { data } = useQuery<Character>(
    ["character", id],
    () => CharacterService.getCharacterById(id),
    { keepPreviousData: true, refetchOnWindowFocus: false }
  );

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
  return {
    paths: [],
    fallback: "blocking",
  };
};

export const getStaticProps: GetStaticProps = async ({ params }) => {
  const id = typeof params?.id === "string" ? params?.id : "1";
  const queryClient = new QueryClient();
  await queryClient.prefetchQuery(["character", id], () =>
    CharacterService.getCharacterById(id)
  );
  return {
    props: {
      id,
      dehydratedState: dehydrate(queryClient),
    },
  };
};

export default CharacterInfo;
