import React, { useEffect, useState } from "react";
import { URL_POKEMON } from "../../../api/apiRest";
import css from "./cards.module.scss";


export default function Card({ poke }) {

    const [pokeCard, setPokeCard] = useState({});

    useEffect(() => {
        const api = async () => {
            const response = await fetch(`${URL_POKEMON}/${poke.name}`);
            const data = await response.json();
            setPokeCard(data);
        }
        api();
    })

    return (
        <div className={css.card}>
            <img className={css.cardImg} src={pokeCard.sprites?.front_default} alt={poke.name} />
            <div className={css.subCard}>
                <strong className={css.cardName}>{poke.name}</strong>
                <h4 className={css.cardData}>Altura</h4>
                <h4 className={css.cardData}>Peso</h4>
                <h4 className={css.cardData}>Habitat</h4>
            </div>
        </div>
    );
}
