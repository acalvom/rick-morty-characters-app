import { Characters } from '../interfaces/ICharacter';


const getCharacters = async (page: string) => {
    const res = await fetch(
      `https://rickandmortyapi.com/api/character/?page=${page}`
    );
    const characters: Characters = await res.json();
    return characters;
  };


  const CharacterService = {
    getCharacters
  }
  export default CharacterService;
  