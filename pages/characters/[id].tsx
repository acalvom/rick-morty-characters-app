import { Box, Button, Container } from "@mui/material";
import type { GetServerSideProps, NextPage } from "next";
import Head from "next/head";
import Link from "next/link";
import { dehydrate, QueryClient, useQuery } from "react-query";
import CharacterCard from "../../components/CharacterCard";
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

      <Box
        alignItems="center"
        display="flex"
        flexDirection="column"
        margin="2em"
      >
        {data && <CharacterCard character={data} />}
        <Link href="/characters">
          <Button
            sx={{ margin: "1em" }}
            className="back-to-btn"
            variant="contained"
          >
            Back Home
          </Button>
        </Link>
      </Box>
    </Container>
  );
};

// export const getStaticPaths: GetStaticPaths = async () => {
//   return {
//     paths: [],
//     fallback: "blocking",
//   };
// };

export const getServerSideProps: GetServerSideProps = async ({ query }) => {
  const id = typeof query?.id === "string" ? query?.id : "1";
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
