// src/App.jsx

import React, { useState, useEffect } from 'react';
import SearchForm from './components/SearchForm.jsx';
import PokemonDisplay from './components/PokemonDisplay.jsx';

function App() {
    // 1. ESTADO: El patrón del triple Hook para Fetching
    const [searchTerm, setSearchTerm] = useState('pikachu'); // Término que dispara el useEffect
    const [pokemonData, setPokemonData] = useState(null); // Datos recibidos de la API
    const [isLoading, setIsLoading] = useState(false); // Estado de carga
    const [error, setError] = useState(null); // Estado de error

    // 2. EFFECT: Aísla la lógica de Fetching y se ejecuta solo cuando searchTerm cambia
    useEffect(() => {
        // Evitar buscar al inicio si el término está vacío
        if (!searchTerm) {
            setPokemonData(null);
            return; 
        }

        const fetchPokemon = async () => {
            // A. INICIO DE LA PETICIÓN: Settear estados de control
            setIsLoading(true);
            setError(null);
            
            try {
                const url = `https://pokeapi.co/api/v2/pokemon/${searchTerm}`;
                const response = await fetch(url);

                if (!response.ok) {
                    throw new Error('No se pudo encontrar el Pokémon. Revisa el nombre.');
                }

                const data = await response.json();
                
                // B. ÉXITO: Actualizar datos y finalizar carga
                setPokemonData(data);
                
            } catch (err) {
                // C. ERROR: Capturar el error y mostrar mensaje
                console.error("Error en la petición:", err.message);
                setError(err.message);
                setPokemonData(null); // Asegurar que no se muestren datos viejos
                
            } finally {
                // D. FINALIZAR: Esto se ejecuta haya éxito o haya error
                setIsLoading(false);
            }
        };

        fetchPokemon();

        // 3. ARRAY DE DEPENDENCIAS: El efecto se re-ejecuta SÓLO cuando searchTerm cambia.
    }, [searchTerm]); 
    // ⬅️ ¡La clave del proyecto! El useEffect "reacciona" al cambio de searchTerm.

    // Callback pasado al Hijo para que actualice el estado del Padre (searchTerm)
    const handleSearch = (term) => {
        setSearchTerm(term);
        // NOTA: setTerm actualiza el estado, lo cual inmediatamente dispara el useEffect.
    };

    return (
        <div style={{ fontFamily: 'Arial, sans-serif', textAlign: 'center' }}>
            <h1>Buscador Reactivo de Pokémon 🐾</h1>
            
            {/* Hijo 1: Input de búsqueda */}
            <SearchForm onSearch={handleSearch} /> 

            {/* Hijo 2: Display de resultados (le pasamos los 3 estados de control) */}
            <PokemonDisplay 
                pokemon={pokemonData} 
                isLoading={isLoading} 
                error={error} 
            />
        </div>
    );
}

export default App;

