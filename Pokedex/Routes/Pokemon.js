const express = require("express");
const router = express.Router();
const PokemonController = require("../Controllers/PokemonController");

router.get("/pokemons", PokemonController.GetPokemonList);

router.get("/create-pokemon", PokemonController.GetCreatePokemon);

router.post("/create-pokemon", PokemonController.PostCreatePokemon);

router.get("/edit-pokemon/:pokemonId", PokemonController.GetEditPokemon);

router.post("/edit-pokemon", PokemonController.PostEditPokemon);

router.post("/delete-pokemon", PokemonController.PostDeletePokemon);

module.exports = router;