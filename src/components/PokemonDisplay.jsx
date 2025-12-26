// src/components/PokemonDisplay.jsx

import React from 'react';

function PokemonDisplay({ pokemon, isLoading, error }) {
    
    // RENDERIZADO CONDICIONAL
    if (isLoading) {
        return <h2 style={{ color: '#f39c12' }}>Cargando Pokémon... 🐢</h2>;
    }

    if (error) {
        return <h2 style={{ color: '#e74c3c' }}>Error: Pokémon no encontrado. 🛑</h2>;
    }

    // Si hay datos, mostramos la información
    if (pokemon) {
        return (
            <div style={{ border: '2px solid #2ecc71', padding: '15px', borderRadius: '8px', maxWidth: '300px', margin: '20px auto', textAlign: 'center' }}>
                <h2>#{pokemon.id} - {pokemon.name.toUpperCase()}</h2>
                {/* La URL de la imagen de la API */}
                <img 
                    src={pokemon.sprites.front_default} 
                    alt={pokemon.name} 
                    style={{ width: '150px', height: '150px' }}
                />
                <p>Tipo Principal: <span style={{ fontWeight: 'bold' }}>{pokemon.types[0].type.name}</span></p>
                <p>Altura: {pokemon.height / 10} m</p>
            </div>
        );
    }

    // Estado inicial: Sin búsqueda
    return <p style={{ color: '#7f8c8d' }}>Comienza buscando un Pokémon...</p>;
}

export default PokemonDisplay;
