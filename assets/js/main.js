const pokemonList = document.getElementById("pokemonList");
const LoadMoreButton = document.getElementById("loadMoreButton");

const limit = 10;
let offset = 0;
const maxRecords = 151;

function convertPokemonToLi(pokemon) {
  return `
      <li class="pokemon ${pokemon.type}">
          <span class="number">#${pokemon.number}</span>
          <span class="name">${pokemon.name}</span>

          <div class="detail">
              <ol class="types">
                  ${pokemon.types
                    .map((type) => `<li class="type ${type}">${type}</li>`)
                    .join("")}
              </ol>

              <img src="${pokemon.photo}"
                   alt="${pokemon.name}">
          </div>
      </li>
  `;
}

function loadPokemonItens(offset, limit) {
  pokeApi.getPokemons(offset, limit).then((pokemons = []) => {
    pokemonList.innerHTML += pokemons.map(convertPokemonToLi).join("");
  });
}

loadPokemonItens(offset, limit);

LoadMoreButton.addEventListener("click", () => {
  offset += limit;

  const qtdRecordNextPage = offset + limit;

  if (qtdRecordNextPage >= maxRecords) {
    const newLimit = maxRecords - offset;
    loadPokemonItens(offset, newLimit);

    LoadMoreButton.parentElement.removeChild(LoadMoreButton);
  } else {
    loadPokemonItens(offset, limit);
  }
});
