const Pokemon = require("../Models/Pokemon");
const Region = require("../Models/Region");
const Tipo = require("../Models/Tipo");

exports.GetPokemonList = (req, res, next) => {
  Pokemon.findAll({
    include: [{ model: Region }, { model: Tipo }]
  })
    .then((result) => {
      const pokemons = result.map(p => p.get({ plain: true }));
      console.log(JSON.stringify(pokemons, null, 2));
      res.render("pokemon/pokemon-list", {
        pageTitle: "Listado de Pokémon",
        poks: pokemons,
        hasPokemons: pokemons.length > 0,
        IsPokemonList: true,
      });
    })
    .catch((err) => {
      console.log(err);
    });
  
};

exports.GetCreatePokemon = (req, res, next) => {
  Promise.all([Region.findAll(), Tipo.findAll()])
    .then(([regions, types]) => {
      res.render("pokemon/save-pokemon", {
        pageTitle: "Crear Pokémon",
        editMode: false,
        IsPokemonList: true,
        regions: regions.map(r => r.dataValues),
        types: types.map(t => t.dataValues),
      });
    })
    .catch((err) => {
      console.log(err);
    });
};

exports.PostCreatePokemon = async (req, res, next) => {
  const name = req.body.Name?.trim();
  const imageUrl = req.body.imageUrl?.trim();
  const regionId = req.body.regionId;
  const tipoId = req.body.tipoId;

  let errors = [];

  if (!name) errors.push("El nombre es obligatorio.");
  if (!imageUrl) errors.push("La URL de la imagen es obligatoria.");
  if (imageUrl && !imageUrl.startsWith("http")) 
    errors.push("La URL debe ser válida (debe iniciar con http o https).");

  if (!regionId) errors.push("Debe seleccionar una región.");
  if (!tipoId) errors.push("Debe seleccionar un tipo.");

  if (errors.length > 0) {
    const regions = await Region.findAll();
    const types = await Tipo.findAll();

    return res.render("pokemon/save-pokemon", {
      pageTitle: "Crear Pokémon",
      editMode: false,
      errors,
      regions: regions.map(r => r.dataValues),
      types: types.map(t => t.dataValues),
      oldData: { name, imageUrl, regionId, tipoId }
    });
  }

  Pokemon.create({ name, imageUrl, regionId, tipoId })
    .then(() => res.redirect("/pokemons"))
    .catch(err => console.log(err));
};

exports.GetEditPokemon = (req, res, next) => {
  const id = req.params.pokemonId;

  Promise.all([
    Pokemon.findOne({ where: { id }, include: [Region, Tipo] }),
    Region.findAll(),
    Tipo.findAll(),
  ])
    .then(([pokemonResult, regions, types]) => {
      if (!pokemonResult) {
        return res.redirect("/pokemons");
      }

      const pokemon = pokemonResult.dataValues;

      res.render("pokemon/save-pokemon", {
        pageTitle: `Editar Pokémon - ${pokemon.name}`,
        pokemon,
        editMode: true,
        IsPokemonList: true,
        regions: regions.map(r => r.dataValues),
        types: types.map(t => t.dataValues),
      });
    })
    .catch((err) => {
      console.log(err);
    });
};

exports.PostEditPokemon = async (req, res, next) => {
  const id = req.body.PokemonId;
  const name = req.body.Name?.trim();
  const imageUrl = req.body.imageUrl?.trim();
  const regionId = req.body.regionId;
  const tipoId = req.body.tipoId;

  let errors = [];

  if (!name) errors.push("El nombre es obligatorio.");
  if (!imageUrl) errors.push("La URL de la imagen es obligatoria.");
  if (imageUrl && !imageUrl.startsWith("http"))
    errors.push("La URL debe ser válida (debe iniciar con http o https).");

  if (!regionId) errors.push("Debe seleccionar una región.");
  if (!tipoId) errors.push("Debe seleccionar un tipo.");

  const regions = await Region.findAll();
  const types = await Tipo.findAll();

  if (errors.length > 0) {
    const pokemon = { id, name, imageUrl, regionId, tipoId };

    return res.render("pokemon/save-pokemon", {
      pageTitle: `Editar Pokémon - ${name}`,
      editMode: true,
      errors,
      regions: regions.map(r => r.dataValues),
      types: types.map(t => t.dataValues),
      pokemon
    });
  }

  Pokemon.update(
    { name, imageUrl, regionId, tipoId },
    { where: { id } }
  )
    .then(() => res.redirect("/pokemons"))
    .catch(err => console.log(err));
};

exports.PostDeletePokemon = (req, res, next) => {
  const id = req.body.PokemonId;

  Pokemon.destroy({ where: { id } })
    .then((rows) => {
      if (rows === 0) {
        console.warn("Intento de eliminar un Pokémon inexistente.");
      }
      return res.redirect("/pokemons");
    })
    .catch((err) => console.log(err));
};