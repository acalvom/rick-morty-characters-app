const getCharacters = async () => {
  const res = await fetch(
    `https://rickandmortyapi.com/api/character/`
  );
  return await res.json();
};

const getCharactersByPage = async (page: string) => {
    const res = await fetch(
      `https://rickandmortyapi.com/api/character/?page=${page}`
    );
    return await res.json();
  };

  const getCharacterById = async (id: string) => {
    const res = await fetch(
      `https://rickandmortyapi.com/api/character/${id}`
    );
    return await res.json();
  };



  const CharacterService = {
    getCharacters: getCharacters, getCharactersByPage, getCharacterById
  }
  export default CharacterService;
  