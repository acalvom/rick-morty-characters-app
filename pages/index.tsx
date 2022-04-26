import type { NextPage } from "next";
import router from "next/router";
import { useEffect } from "react";

const Home: NextPage = () => {
  useEffect(() => {
    router.push("/characters");
  }, []);

  return <></>;
};

export default Home;
