

const getCharacters = async (page: string) => {
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
    getCharacters, getCharacterById
  }
  export default CharacterService;
  