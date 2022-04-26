import { Container } from "@mui/material";
import type { GetStaticPaths, GetStaticProps, NextPage } from "next";
import Head from "next/head";
import { dehydrate, QueryClient } from "react-query";
import { Character } from "../../interfaces/ICharacter";

const CharacterInfo: NextPage<{ character: Character }> = ({ character }) => {
  return (
    <Container maxWidth="sm">
      <Head>
        <title>Character Info</title>
      </Head>
    </Container>
  );
};

export const getStaticPaths: GetStaticPaths = async () => {
  return {
    paths: [],
    fallback: "blocking",
  };
};
export const getStaticProps: GetStaticProps = async (context) => {
  const queryClient = new QueryClient();

  return {
    props: {
      dehydratedState: dehydrate(queryClient),
    },
  };
};

export default CharacterInfo;
