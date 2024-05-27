import React, { useEffect, useState } from "react";
import css from "./layout.module.scss";
import Header from "./../Header/Header";
import * as FaIcons from "react-icons/fa";
import { getPokemonByName } from "../../../api/apiRest";
import Card from "../card/Card";

export default function LayoutHome() {
  const [search, setSearch] = useState('')
  const [currentPage, setCurrentPage] = useState(1);
  const [globalPokemon, setGlobalPokemon] = useState([]);
  const pokemonCardsPerPage = 15;
  const numberOfLastPokemon = currentPage * pokemonCardsPerPage;
  const numberOfFirstPokemon = numberOfLastPokemon - pokemonCardsPerPage;
  const currentPokemons = globalPokemon.slice(numberOfFirstPokemon, numberOfLastPokemon);


  useEffect(() => {
    const getAllPokemons = async () => {
      const allPokemons = await getPokemonByName(search);
      return allPokemons;
    }

    (async () => {
      const allPokemons = await getAllPokemons();
      setGlobalPokemon(allPokemons);
    })();
  }, [search]);

  const paginadoPrev = () => {
    if (currentPage > 1) setCurrentPage(currentPage - 1);
  }

  const paginadoNext = () => {
    let lastPage = Math.ceil(globalPokemon.length / pokemonCardsPerPage);
    if (currentPage < lastPage) setCurrentPage(currentPage + 1);
  }

  const obtenerSearch = (e) => {

    const texto = e.toLowerCase()
    setSearch(texto)
    setCurrentPage(1)
  }

  return (
    <div className={css.layout}>
      <Header obtenerSearch={obtenerSearch} />

      <section className={css.section_pagination}>
        <div className={css.div_pagination}>
          <span className={css.item_izquierdo}

            onClick={paginadoPrev}

          >
            <FaIcons.FaAngleLeft />
          </span>
          <span className={css.item}> {currentPage} </span>
          <span className={css.item}> DE </span>
          <span className={css.item}>
            {" "}
            { Math.round(globalPokemon?.length / pokemonCardsPerPage) === 0 ? 1 : Math.round(globalPokemon?.length / pokemonCardsPerPage) }{" "}
          </span>
          <span
            className={css.item_derecho}
            onClick={
              paginadoNext
            }
          >
            {" "}
            <FaIcons.FaAngleRight />{" "}
          </span>
        </div>
      </section>

      <div className={css.card_content}>
        {currentPokemons.map((e, index) => {
          return <Card key={index} id={e.id} />;
        })}
      </div>
    </div>
  );
}
