import React, { useEffect, useState } from "react";
import css from "./card.module.scss";
import axios from "axios";
import {
  URL_ESPECIES,
  URL_EVOLUCIONES,
  URL_POKEMON,
} from "../../../api/apiRest";
import { getPokemonById } from "../../../api/apiRest";

export default function Card( {id} ) {
  const [itemPokemon, setItemPokemon] = useState({});



  useEffect(() => {
    const dataPokemon = async () => {
      const api = await getPokemonById(id);
      setItemPokemon(api);
    }
  
    (async () => {
      await dataPokemon();
    })();
  }, [id]);

  let pokeId = itemPokemon?.id?.toString();
  if (pokeId?.length === 1) {
    pokeId = "00" + pokeId;
  } else if (pokeId?.length === 2) {
    pokeId = "0" + pokeId;
  }
  return (
    <div className={css.card}>
      <img
        className={css.img_poke}
        src={itemPokemon?.img}
        alt="pokemon"
      />
      <div
        className={`color-${itemPokemon.types ? itemPokemon.types[0] : "xd"} ${css.sub_card}  `}
      >
        <strong className={css.id_card}>#{pokeId} </strong>
        <strong className={css.name_card}> {itemPokemon.name} </strong>
        <h4 className={css.altura_poke}> Altura: {itemPokemon.height}0 cm </h4>
        <h4 className={css.peso_poke}>Peso: {itemPokemon.weight} Kg </h4>

        <div className={css.div_stats}>
              <h6 className={css.item_stats}>
                <span className={css.name}> HP </span>
                <progress value={itemPokemon.hp} max={110}></progress>
                <span className={css.numero}> {itemPokemon.hp} </span>
              </h6>
              <h6 className={css.item_stats}>
                <span className={css.name}> STR </span>
                <progress value={itemPokemon.str} max={110}></progress>
                <span className={css.numero}> {itemPokemon.str} </span>
              </h6>
              <h6 className={css.item_stats}>
                <span className={css.name}> DEF </span>
                <progress value={itemPokemon.def} max={110}></progress>
                <span className={css.numero}> {itemPokemon.def} </span>
              </h6>
              <h6 className={css.item_stats}>
                <span className={css.name}> SPD </span>
                <progress value={itemPokemon.spd} max={110}></progress>
                <span className={css.numero}> {itemPokemon.spd} </span>
              </h6>
        </div>

        <div className={css.div_type_color}>
          {itemPokemon.types?.map((e, index) => {
            return (
              <h6
                key={index}
                className={`color-unknow ${css.color_type} `}
              >
                {" "}
                {e}{" "}
              </h6>
            );
          })}
        </div>
      </div>
    </div>
  );
}
