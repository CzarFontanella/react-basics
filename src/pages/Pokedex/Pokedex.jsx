import React, { useEffect, useState } from "react";
import axios from "axios";
import "./Pokedex.css";

// Função de fetch simplificada com axios
async function getPokemons() {
  // Pega a lista dos 151 primeiros pokémons
  const { data } = await axios.get(
    "https://pokeapi.co/api/v2/pokemon?limit=151"
  );

  // Para cada resultado, busca os detalhes com axios.get
  const pokemon_list = await Promise.all(
    data.results.map(async (p) => {
      const { data: details } = await axios.get(p.url);
      return {
        id: details.id,
        name: details.name,
        image: details.sprites.other["official-artwork"].front_default,
        types: details.types.map((t) => t.type.name),
      };
    })
  );

  return pokemon_list;
}

// Componente React simplificado
export default function Pokedex() {
  const [pokemons, setPokemons] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  // O useEffect é usado para efeitos colaterais (busca de dados, timers, etc.)
  useEffect(() => {
    let mounted = true;

    (async () => {
      try {
        setLoading(true);
        const list = await getPokemons();
        if (mounted) setPokemons(list);
      } catch (err) {
        console.error(err);
        if (mounted) setError("Erro ao carregar Pokémon. Tente novamente.");
      } finally {
        if (mounted) setLoading(false);
      }
    })();

    return () => {
      mounted = false;
    };
  }, []);

  if (loading) return <div className="loading">Carregando 151 Pokémons…</div>;
  if (error) return <div className="error">{error}</div>;

  return (
    <div className="container">
      <div className="header">
        <h2 className="title">Pokémon — 151</h2>
      </div>

      <div className="grid">
        {pokemons.map((p) => (
          <article key={p.id} className="card" aria-label={`Pokémon ${p.name}`}>
            <div className="imageWrapper">
              {p.image ? (
                <img
                  src={p.image}
                  alt={`${p.name} official artwork`}
                  width={120}
                  height={120}
                  className="image"
                  loading="lazy"
                />
              ) : (
                <div style={{ fontSize: 12, color: "#999" }}>sem imagem</div>
              )}
            </div>

            <div className="id">#{String(p.id).padStart(3, "0")}</div>
            <div className="name">{p.name}</div>

            <div className="types">
              {p.types.map((t) => (
                <span key={t} className="typeBadge">
                  {t}
                </span>
              ))}
            </div>
          </article>
        ))}
      </div>
    </div>
  );
}
