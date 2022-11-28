export const pokemonAPI = async (page) => {
  try {
    const urlPokemon = "/pokemon";
    const response = await fetch(
      `${process.env.REACT_APP_API_URL}${urlPokemon}?page=${page}`
    );
    const data = await response.json();
    return data;
  } catch (error) {
    return error;
  }
};

export const pokemonById = async (id) => {
  try {
    const urlPokemonById = `/pokemon/${id}`;
    const response = await fetch(
      `${process.env.REACT_APP_API_URL}${urlPokemonById}`
    );
    const data = await response.json();
    return data;
  } catch (error) {
    return error;
  }
};
export const characteristPokemon = async (id) => {
  try {
    const urlPokemonById = `/pokemon/characteristic/${id}`;
    const response = await fetch(
      `${process.env.REACT_APP_API_URL}${urlPokemonById}`
    );
    const data = await response.json();
    return data;
  } catch (error) {
    return error;
  }
};
