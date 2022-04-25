

const getCharacters = async (page: string) => {
    const res = await fetch(
      `https://rickandmortyapi.com/api/character/?page=${page}`
    );
    return await res.json();
  };


  const CharacterService = {
    getCharacters
  }
  export default CharacterService;
  